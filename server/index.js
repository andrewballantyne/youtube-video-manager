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
  const videoData = storage.VideoStorage.get();
  const authorData = storage.AuthorStorage.get();

  const collectedCatalogItems = Object.values(videoData).reduce(
    (acc, { authorId }) => ({
      ...acc,
      [authorId]: {
        id: authorId,
        name: authorData[authorId].name,
        count: acc[authorId] ? acc[authorId].count + 1 : 1,
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
app.post("/archive-video", (req, res) => {
  const { id } = req.body;
  console.log("Archive Video", id, "-- Not Implemented");

  res.json({ status: "not implemented" });
});

/**
 * TODO: Document
 */
app.get("/author/:authorId", (req, res) => {
  const { authorId } = req.params;

  const authorData = storage.AuthorStorage.get(authorId);

  res.json(authorData);
});

/**
 * TODO: Document
 */
app.get("/image/:imgId", (req, res) => {
  const { imgId } = req.params;

  const imageData = storage.ImageStorage.get(imgId);

  res.json(imageData);
});

/**
 * TODO: Document
 */
app.get("/catalog/:authorId", (req, res) => {
  const authorId = parseInt(req.params.authorId);

  const videoData = storage.VideoStorage.get();
  const videos = Object.values(videoData)
    .filter((video) => video.authorId === authorId)
    .map((video) => ({
      ...video,
      // TODO: Update all records to have the base value
      url: `https://youtube.com${video.url}`,
    }));

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
  const storages = Object.keys(storage);
  storages.forEach((storageName) => {
    storage[storageName].startup();
  });

  logger.log(
    `Persist loop started, triggering at ${SAVE_DURATION}ms intervals...`
  );
  setInterval(() => {
    storages.forEach((storageName) => {
      storage[storageName].persistStorage();
    });
  }, SAVE_DURATION);
});
