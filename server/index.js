const express = require("express");
const cors = require("cors");
const { EXPRESS_PORT, SAVE_DURATION } = require("./constants");
const storage = require("./storage");
const Logger = require("./Logger");
const { InvalidIdError } = require("./error");

const logger = new Logger("Core Loop");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Request all");
  res.json(storage.VideoStorage.get());
});

/**
 * TODO: Document
 */
app.get("/catalogs", (req, res) => {
  const data = storage.VideoStorage.get();

  const collectedCatalogItems = Object.values(data).reduce(
    (acc, { author }) => ({
      ...acc,
      [author]: {
        name: author,
        count: acc[author] ? acc[author].count + 1 : 1,
      },
    }),
    {}
  );
  const catalogItems = Object.values(collectedCatalogItems).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  res.json(catalogItems);
});

/**
 * TODO: Document
 */
app.get("/catalog/:list", (req, res) => {
  const { list } = req.params;
  const authorIds = list.split(",").map((value) => value);
  console.debug("authorIds", authorIds);

  const data = storage.VideoStorage.get();
  const videoIds = Object.keys(data);
  const videos = videoIds
    .filter((videoId) =>
      authorIds.find((author) => data[videoId].author === author)
    )
    .map((videoId) => data[videoId]);

  res.json(videos);
});

/**
 * TODO: Document
 */
app.get("/ordered", (req, res) => {
  const data = storage.VideoStorage.get();

  const sortedItems = {};
  Object.values(data).forEach((dataItem) => {
    const { title, url, author } = dataItem;
    if (!sortedItems[author]) sortedItems[author] = [];
    sortedItems[author].push({ title, url });
  });

  res.json(sortedItems);
});

/**
 * Read from YouTube and store the data.
 */
app.post("/submit-data", (req, res) => {
  try {
    const data = req.body;
    const { img, ...videoData } = data;
    console.log("Adding Data", {
      ...videoData,
      imgId: `[ID] (${img.substring(0, 20)}...)`,
    });
    const videoId = storage.VideoStorage.add(videoData);
    const imgId = storage.ImageStorage.add({ src: img });
    storage.VideoStorage.update({ id: videoId, imgId });

    res.send(`Data saved; New VideoId: ${videoId}`);
  } catch (e) {
    console.error("POST error", e.message);
    if (e instanceof InvalidIdError) {
      res.status(400).send("Record already exists");
    }

    res.status(500).send(`Server Error. ${e.message}`);
  }
});

/**
 * Server started -- starts storages.
 */
app.listen(EXPRESS_PORT, () => {
  console.log(`Example app listening on port ${EXPRESS_PORT}`);
  storage.ImageStorage.startup();
  storage.VideoStorage.startup();

  logger.log(
    `Persist loop started, triggering at ${SAVE_DURATION}ms intervals...`
  );
  setInterval(() => {
    storage.ImageStorage.persistStorage();
    storage.VideoStorage.persistStorage();
  }, SAVE_DURATION);
});
