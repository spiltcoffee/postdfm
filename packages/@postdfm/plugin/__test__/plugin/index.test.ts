import * as AST from "@postdfm/ast";
import { Plugin, Hooks } from "../../src";
import { jest } from "@jest/globals";

class TapAllPlugin extends Plugin {
  hookCallback: () => void;

  constructor(hookCallback: () => void) {
    super();
    this.hookCallback = hookCallback;
  }

  install(hooks: Hooks): void {
    hooks.all.tap("TapAllPlugin", () => {
      this.hookCallback();
    });
  }
}

describe("plugin", () => {
  test("all hooks are tapable and callable", () => {
    const hooks = new Hooks();
    const hookCallback = jest.fn();
    const plugin = new TapAllPlugin(hookCallback);

    plugin.install(hooks);

    Object.values(AST.ASTType).forEach((astType) => {
      hooks[astType].call(undefined as never);
    });

    expect(hookCallback).toHaveBeenCalledTimes(Object.keys(AST.ASTType).length);
  });
});
