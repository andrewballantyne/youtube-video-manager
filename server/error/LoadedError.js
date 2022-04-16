module.exports = class LoadedError extends Error {
  constructor(name) {
    super(`Service ${name} is not loaded`);
  }
};
