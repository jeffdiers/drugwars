import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getXataClient } from "../../src/xata";
const xata = getXataClient();

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const records = await xata.db.scores.sort("score", "desc").getMany();

  return {
    statusCode: 200,
    body: JSON.stringify(records),
  };
};

export { handler };
