import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../utils/mongodb";
import { getApiLocationData } from "../../utils/timeZoneApi";
import LocationImageMapping from "../../src/LocationImageMapping";
import { Location } from "../../src/types/Location";
import { ApiLocation } from "../../src/types/ApiLocation";

type Data = {
  locations: Location[];
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const secret = req.query.secret as string;
  if (!secret || secret !== process.env.ACTIONS_SECRET) {
    return res.status(401).send({ error: "Unauthorised" });
  }

  // Fetch up-to-date timezone data for all locations that the API supports
  const apiLocationData: ApiLocation[] = await getApiLocationData();
  if (!apiLocationData) return res.status(200);

  // All our locations which we have previously selected images for, with up-to-date GMT offset
  const updatedLocations: (Location | null)[] = LocationImageMapping.map(
    (location) => {
      const matchingLocationFromApi: ApiLocation | null =
        apiLocationData.find(
          (apiLocation) => location.zoneName === apiLocation.zoneName
        ) || null;
      if (!matchingLocationFromApi) return null;

      return {
        name: location.name,
        image: location.image,
        gmtOffset: matchingLocationFromApi.gmtOffset,
        zoneName: matchingLocationFromApi.zoneName,
      };
    }
  ).filter((x) => x !== null);

  // Create an object that Mongo can use to bulk update all locations with up-to-date GMT offset.
  const dbUpdates = updatedLocations.map((item) => ({
    updateOne: {
      filter: { name: item?.name },
      update: {
        $set: {
          gmtOffset: item?.gmtOffset,
          image: item?.image,
          last_updated: new Date().toISOString(),
        },
      },
      upsert: true,
    },
  }));

  const client = await clientPromise;
  await client
    .db("itsfiveoclocksomewhere")
    .collection("locations")
    .bulkWrite(dbUpdates);

  res.status(200).json({ locations: updatedLocations as Location[] });
}
