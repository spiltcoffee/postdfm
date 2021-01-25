// eslint-disable-next-line node/no-extraneous-require
const { Plugin } = require("@postdfm/plugin");

function reverseString(str) {
  return str.split("").reverse().join("");
}

module.exports = class ReverseEverythingPlugin extends Plugin {
  PLUGIN_NAME = "ReverseEverythingPlugin";

  hookCallback;

  constructor(hookCallback) {
    super();
    this.hookCallback = hookCallback || (() => {});
  }

  install(hooks) {
    hooks.string.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value = ast.value.reverse();
      return ast;
    });

    hooks.controlString.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value = reverseString(ast.value);
      return ast;
    });

    hooks.literalString.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value = reverseString(ast.value);
      return ast;
    });

    hooks.binaryString.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value = reverseString(ast.value);
      return ast;
    });

    hooks.integer.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value = ((Number(ast.value) + 1) * -1).toString();
      return ast;
    });

    hooks.hexCode.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value = reverseString(ast.value);
      return ast;
    });

    hooks.double.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value.integer = ((Number(ast.value.integer) + 1) * -1).toString();
      return ast;
    });

    hooks.single.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value.integer = ((Number(ast.value.integer) + 1) * -1).toString();
      return ast;
    });

    hooks.currency.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value.integer = ((Number(ast.value.integer) + 1) * -1).toString();
      return ast;
    });

    hooks.dateTime.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value.integer = ((Number(ast.value.integer) + 1) * -1).toString();
      return ast;
    });

    hooks.boolean.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value = !ast.value;
      return ast;
    });

    hooks.identifier.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.value = reverseString(ast.value);
      return ast;
    });

    hooks.item.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.properties = ast.properties.reverse();
      return ast;
    });

    hooks.variantList.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.values = ast.values.reverse();
      return ast;
    });

    hooks.binaryStringList.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.values = ast.values.reverse();
      return ast;
    });

    hooks.identifierList.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.values = ast.values.reverse();
      return ast;
    });

    hooks.itemList.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.values = ast.values.reverse();
      return ast;
    });

    hooks.property.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.name = reverseString(ast.name);
      return ast;
    });

    hooks.object.tap(this.PLUGIN_NAME, (ast) => {
      this.hookCallback();
      ast.name = reverseString(ast.name);
    });

    hooks.root.tap(this.PLUGIN_NAME, () => {
      this.hookCallback();
      // nothing to reverse here
    });
  }
};
