import { Tapable } from "./tapable";

export abstract class Plugin {
  abstract install(tapable: Tapable): void;
}
