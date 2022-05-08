/**
 * An error for when data ID was invalid.
 */
module.exports = class InvalidIdError extends Error {
  constructor(context) {
    super(`Id was not valid${context ? `, ${context}` : ""}`);
  }
};
