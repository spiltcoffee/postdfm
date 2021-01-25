// eslint-disable-next-line node/no-extraneous-require
const { Plugin } = require("@postdfm/plugin");

module.exports = class HelloWorldPlugin extends Plugin {
  install(hooks) {
    hooks.property.tap("HelloWorldPlugin", (node) => {
      node.name = node.name.split("").reverse().join("");
      return node;
    });
  }
};
