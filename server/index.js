const express = require("express");
const cors = require("cors");
const { EXPRESS_PORT, ROOT_URL } = require("./constants");
const storage = require("./storage");
const Logger = require("./Logger");
const { InvalidIdError } = require("./error");

const logger = new Logger("Core Loop");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  logger.log("Request all");
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
  const videos = Object.values(videoData).filter(
    (video) => video.authorId === authorId
  );

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
    const { img, authorName, authorURL, url, ...videoData } = data;
    logger.log("Adding Data", {
      ...videoData,
      url,
      authorId: `[ID] (${authorName} | ${authorURL})`,
      imgId: `[ID] (${img.substring(0, 20)}...)`, // base64 image
    });
    const authorId = storage.AuthorStorage.add({
      name: authorName,
      url: `${ROOT_URL}${authorURL}`,
    });
    const imgId = storage.ImageStorage.add({ src: img });
    const videoId = storage.VideoStorage.add({
      ...videoData,
      url: `${ROOT_URL}${url}`,
      authorId,
      imgId,
    });

    res.send(`Data saved; New VideoId: ${videoId}`);
    storage.saveAll();
  } catch (e) {
    logger.error("POST error", e.message);
    storage.resetAll();

    if (e instanceof InvalidIdError) {
      res.status(400).send(`Invalid client data. ${e.message}`);
      return;
    }

    res.status(500).send(`Server error. ${e.message}`);
  }
});

/**
 * Server started -- starts storages.
 */
app.listen(EXPRESS_PORT, () => {
  logger.log(`Listening on port ${EXPRESS_PORT}`);
  storage.startAll();
});
