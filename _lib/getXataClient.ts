import { XataClient } from "./xata.codegen";
import fetch from "node-fetch";

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient({ fetch });
  return instance;
};
