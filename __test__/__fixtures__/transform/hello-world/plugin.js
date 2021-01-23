// eslint-disable-next-line node/no-extraneous-require
const { Plugin } = require("@postdfm/tapable");

module.exports = class HelloWorldPlugin extends Plugin {
  install(tapable) {
    tapable.hooks.property.tap("HelloWorldPlugin", (node) => {
      node.name = node.name
        .split("")
        .reverse()
        .join("");
      return node;
    });
  }
};
