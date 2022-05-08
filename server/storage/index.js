const Logger = require("../Logger");
const AuthorStorage = require("./AuthorStorage");
const ImageStorage = require("./ImageStorage");
const VideoStorage = require("./VideoStorage");

const logger = new Logger("Storages");

const storages = {
  AuthorStorage,
  ImageStorage,
  VideoStorage,
};

module.exports = {
  ...storages,
  startAll: () => {
    Object.keys(storages).forEach((storageName) => {
      logger.log(`Starting storage ${storageName}`);
      storages[storageName].startStorage();
    });
  },
  saveAll: () => {
    Object.keys(storages).forEach((storageName) => {
      logger.log(`Saving storage ${storageName}`);
      storages[storageName].persistStorage();
    });
  },
  resetAll: () => {
    Object.keys(storages).forEach((storageName) => {
      logger.log(`Resetting storage ${storageName}`);
      storages[storageName].resetStorage();
    });
  },
};
