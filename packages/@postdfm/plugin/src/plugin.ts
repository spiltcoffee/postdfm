import type { Hooks } from "./hooks";

export abstract class Plugin {
  abstract install(hooks: Hooks): void;
}
