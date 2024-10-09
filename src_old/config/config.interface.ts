/**
 * Represents a class that encapsulates .env variables and provides an interface
 * to access them.
 *
 * @interface ConfigClass
 */
export interface ConfigClass {
  get(key: string): string;
}
