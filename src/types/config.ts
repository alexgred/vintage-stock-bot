/**
 * Represents a class that encapsulates .env variables and provides an interface
 * to access them.
 *
 * @interface Config
 */
export interface Config {
  get(key: string): string;
}
