import axios from "axios";
import { ApiLocation } from "../src/types/ApiLocation";

/*
  Timezone API provider: https://timezonedb.com/api
  Max requests: 1 per second
*/

const API_URL = `http://api.timezonedb.com/v2.1/list-time-zone?key=${process.env.TIMEZONEDB_API_KEY}&format=json`;

export const getApiLocationData = async () => {
  if (!process.env.TIMEZONEDB_API_KEY) {
    throw new Error("Please add your TIMEZONEDB_API_KEY to .env.local");
  }

  const locations = await axios.get(API_URL).then(({ data }) =>
    data.zones.map(({ countryName, zoneName, gmtOffset }: ApiLocation) => ({
      name: countryName,
      zoneName: zoneName,
      gmtOffset: gmtOffset / 3600,
    }))
  );

  return locations;
};
