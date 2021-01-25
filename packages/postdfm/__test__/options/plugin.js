const { Plugin } = require("@postdfm/plugin");

module.exports = class NoopPlugin extends Plugin {
  install() {
    // do nothing
  }
};
