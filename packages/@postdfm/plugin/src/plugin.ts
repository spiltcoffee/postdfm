import type { Hooks } from "@postdfm/plugin/hooks";

export abstract class Plugin {
  abstract install(hooks: Hooks): void;
}
