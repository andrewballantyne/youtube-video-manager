const Storage = require("../Storage");

const isMatchingVideoRecord = (thisRecord) => (dataItem) =>
  dataItem.title === thisRecord.title &&
  dataItem.authorId === thisRecord.authorId;

module.exports = new Storage("VideoStorage", __dirname, isMatchingVideoRecord);

/**
 * @property {number} id
 * @property {string} title
 * @property {string} url
 * @property {string} authorId
 * @property {string} duration
 * @property {number} imgId
 */
