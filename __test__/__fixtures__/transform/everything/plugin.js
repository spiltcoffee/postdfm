// eslint-disable-next-line node/no-extraneous-require
const { Plugin } = require("@postdfm/tapable");

module.exports = class EverythingPlugin extends Plugin {
  install(tapable) {
    // need to modify EVERY node in some way

    tapable.hooks.property.tap("EverythingPlugin", (node) => {
      node.name = node.name
        .split("")
        .reverse()
        .join("");
      return node;
    });
  }
};
