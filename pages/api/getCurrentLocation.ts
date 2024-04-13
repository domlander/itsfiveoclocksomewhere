import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongodb";

type Data = {
  name: string;
  image: string;
};

type Error = {
  error: string;
};

/*
    1. Retrieves all the locations we have in the database
    2. filters to find matching locations
    3. Returns found matching locations
*/
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const client = await clientPromise;
  let locations;

  try {
    locations = await client
      .db("itsfiveoclocksomewhere")
      .collection("locations")
      .find()
      .toArray();
  } catch (e) {
    return res.status(500).json({
      error: `Fetching locations from the database failed. ${e}`,
    });
  }

  const hoursUntil5pm = parseInt(req.query.hoursUntil5pm as string);
  const matchingLocations = locations.filter(
    ({ gmtOffset }) => (gmtOffset + 24) % 24 === hoursUntil5pm
  );

  const location = matchingLocations[0] || null;
  if (!location) {
    return res.status(500).json({
      error: "failed to find a location where it is between 5pm and 6pm",
    });
  }

  return res.status(200).json({
    name: location.name,
    image: location.image,
  });
}
