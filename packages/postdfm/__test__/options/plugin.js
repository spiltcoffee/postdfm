const { Plugin } = require("@postdfm/tapable");

module.exports = class NoopPlugin extends Plugin {
  install() {
    // do nothing
  }
};
