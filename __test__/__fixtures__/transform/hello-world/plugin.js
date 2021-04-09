// eslint-disable-next-line node/no-extraneous-import
import { Plugin } from "@postdfm/plugin";

export default class HelloWorldPlugin extends Plugin {
  install(hooks) {
    hooks.property.tap("HelloWorldPlugin", (node) => {
      node.name = node.name.split("").reverse().join("");
      return node;
    });
  }
}
