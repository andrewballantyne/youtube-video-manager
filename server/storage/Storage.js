const fs = require("fs");
const omitBy = require("lodash.omitby");
const { InvalidIdError, LoadedError } = require("../error");
const Logger = require("../Logger");

class Storage {
  static DATA_FILE_OPTIONS = { encoding: "utf-8" };

  constructor(
    type,
    path,
    isMatchingRecord = (newData) => (recordData) => false
  ) {
    this.isMatchingRecord = isMatchingRecord;
    this.url = `${path}/storage.json`;
    this.type = type;
    this.logger = new Logger(type);

    this.configureDefaults();
  }

  configureDefaults = () => {
    this.data = {};
    this.nextId = 0;
    this.dirty = false;
    this.loaded = false;
  };

  resetStorage = () => {
    this.configureDefaults();
    this.startStorage();
  };

  persistStorage = () => {
    if (!this.dirty) return;

    try {
      this.logger.log("Saving...");
      this.data = omitBy(this.data, (v) => v == null);
      fs.writeFileSync(
        this.url,
        JSON.stringify(this.data),
        Storage.DATA_FILE_OPTIONS
      );
      this.dirty = false;
      this.logger.log("Data persisted");
    } catch (e) {
      this.logger.error("Failed to persist data.", e);
      this.logger.log("\n\n\n----------\n", this.data, "\n----------\n\n\n");
    }
  };

  startStorage = () => {
    if (this.loaded) {
      this.logger.error("Cannot startup, already started");
      return;
    }

    let readDataJson;
    try {
      if (!fs.existsSync(this.url)) {
        readDataJson = {};
      } else {
        const readData = fs.readFileSync(this.url, Storage.DATA_FILE_OPTIONS);
        readDataJson = JSON.parse(readData);
      }
    } catch (e) {
      this.logger.error("Unable to read & parse data", e.message);
      return;
    }
    this.data = readDataJson;
    const keys = Object.keys(readDataJson)
      .map((stringId) => parseInt(stringId, 10))
      .sort((a, b) => a - b);
    const lastKey = keys[keys.length - 1] ?? 0;
    this.nextId = lastKey + 1;

    this.loaded = true;
    this.logger.log(`Storage loaded.`);
  };

  add = (data) => {
    if (!this.loaded) {
      this.logger.error("Not loaded, cannot create data.");
      throw new LoadedError(this.type);
    }
    if (data.id !== undefined) {
      throw new InvalidIdError(
        "Cannot add an existing id -- did you mean update?"
      );
    }
    const records = Object.values(this.data);
    if (records.length > 0 && records.some(this.isMatchingRecord(data))) {
      throw new Error("Record conflict");
    }

    const insertedId = this.nextId;
    this.data[insertedId] = { id: insertedId, ...data };
    this.nextId = insertedId + 1;
    this.dirty = true;

    return insertedId;
  };

  update = (data) => {
    if (!this.loaded) {
      this.logger.error("Not loaded, cannot update data.");
      throw new LoadedError(this.type);
    }
    if (!data.id) {
      throw new InvalidIdError(
        "Cannot update, data does not have id -- did you mean add?"
      );
    }
    if (!this.data[data.id]) {
      throw new InvalidIdError("Cannot update data with a non-matching id");
    }

    this.data[data.id] = { ...this.data[data.id], ...data };
    this.dirty = true;

    return data.id;
  };

  get = (id = undefined) => {
    if (!this.loaded) {
      this.logger.error("Not loaded, cannot get data.");
      throw new LoadedError(this.type);
    }

    if (!id) {
      return this.data;
    }
    return this.data[id];
  };
}

module.exports = Storage;
