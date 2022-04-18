const Storage = require("../Storage");

const isMatchingAuthorRecord = (thisRecord) => (dataItem) =>
  dataItem.name === thisRecord.name;

module.exports = new Storage(
  "AuthorStorage",
  __dirname,
  isMatchingAuthorRecord
);

/**
 * @property {number} id
 * @property {string} name
 * @property {string} url
 * @--TODO: property {string} url
 * @--TODO: property {number} imgId
 */
