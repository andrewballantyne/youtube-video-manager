module.exports = class InvalidIdError extends Error {
  constructor() {
    super('Id was not valid');
  }
};
