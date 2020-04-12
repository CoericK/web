import got from "got";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const targetURL = new URL(`${req.query.url}`);

  if (!HOST_WHITE_LIST.has(targetURL.host)) {
    res.status(403).end("This URL is not allowed.");
  }

  const tunnelResponse = await got(targetURL.href, {
    method: req.method as any,
    headers: req.headers,
    body: req.body,
  });

  res.status(tunnelResponse.statusCode);

  for (const [key, value] of Object.entries(tunnelResponse.headers)) {
    if (value === undefined) continue;

    res.setHeader(key, value);
  }

  res.send(tunnelResponse.body);

  res.end();
};

const HOST_WHITE_LIST = new Set(["localhost", "api.wefoc.us"]);
