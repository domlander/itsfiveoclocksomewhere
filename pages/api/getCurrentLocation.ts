import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongodb";

type Data = {
  name: string;
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await clientPromise;
  const locations = await client
    .db("itsfiveoclocksomewhere")
    .collection("locations")
    .find()
    .toArray();

  const hoursUntil5pm = parseInt(req.query.hoursUntil5pm as string);
  const matchingLocations = locations.filter(
    (location) => (location.gmtOffset + 24) % 24 === hoursUntil5pm
  );

  const location = matchingLocations[0] || null;

  res.status(200).json({ name: location?.name, image: location?.image });
}
