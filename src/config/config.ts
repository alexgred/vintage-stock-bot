import { config, DotenvParseOutput } from "dotenv";
import { Config as C } from "@/types";

/**
 * This class encapsulates .env file and provides an interface to access its
 * variables.
 *
 * @class Config
 * @implements {Config}
 */
export class Config implements C {
  private config: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();

    if (error) {
      throw new Error('Failed to load .env file');
    }

    if (!parsed) {
      throw new Error('Failed to parse .env file');
    }

    this.config = parsed;
  }

  /**
   * Returns a value from the .env file by its key.
   * @param key The key of the value to be returned.
   * @returns The value associated with the given key.
   */
  get(key: string): string {
    return this.config[key];
  }
}
