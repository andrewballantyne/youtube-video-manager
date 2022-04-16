module.exports = class Logger {
  constructor(pretext) {
    this.pretext = `[${pretext}]`;
  };
  log = (...args) => console.log(this.pretext, ...args);
  warn = (...args) => console.warn(this.pretext, ...args);
  error = (...args) => console.error(this.pretext, ...args);
};
