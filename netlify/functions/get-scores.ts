import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { XataClient } from "../../lib/xata.codegen";
import { FetcherError } from "@xata.io/client";
import fetch from "node-fetch";

let instance: XataClient | undefined = undefined;

const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient({ fetch });
  return instance;
};

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const xata = getXataClient();

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      message: "Only `GET` requests",
    };
  }

  try {
    const records = await xata.db.scores.sort("score", "desc").getMany();

    return {
      statusCode: 200,
      body: JSON.stringify(records),
    };
  } catch (error) {
    if (error instanceof FetcherError) {
      return {
        statusCode: error.errors?.[0]?.status || 500,
        message: error.errors?.[0]?.message || "xata error",
      };
    }

    return {
      statusCode: 500,
      message: JSON.stringify(error),
    };
  }
};

export { handler };
