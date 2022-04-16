const Storage = require("../Storage");

const isMatchingImageRecord = (thisRecord) => (dataItem) =>
  dataItem.src === thisRecord.src;

module.exports = new Storage("ImageStorage", __dirname, isMatchingImageRecord);

/**
 * @property {number} id
 * @property {string} src
 */
