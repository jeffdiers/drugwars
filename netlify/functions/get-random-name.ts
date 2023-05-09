import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { FetcherError } from "@xata.io/client";
import { getXataClient } from "../../_lib/getXataClient";

const xata = getXataClient();

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      message: "Only `GET` requests",
    };
  }

  try {
    const records = await xata.db.randomNames.sort("*", "random").getMany({
      pagination: { size: 1 },
    });

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
