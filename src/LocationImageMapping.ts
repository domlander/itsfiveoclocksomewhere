import { Location } from "./types/Location";

const LocationImageMapping: Pick<Location, "name" | "zoneName" | "image">[] = [
  {
    name: "London",
    zoneName: "Europe/London",
    image: "London-sunset.svg",
  },
  { name: "Paris", zoneName: "Europe/Paris", image: "France-sunset.svg" },
  { name: "Cairo", zoneName: "Africa/Cairo", image: "Desert-sunset.svg" },
  { name: "Nairobi", zoneName: "Africa/Nairobi", image: "Desert-sunset.svg" },
  { name: "Dubai", zoneName: "Asia/Dubai", image: "Desert-sunset.svg" },
  {
    name: "Maldives",
    zoneName: "Indian/Maldives",
    image: "Tropical-sunset.svg",
  },
  { name: "Mumbai", zoneName: "Asia/Kolkata", image: "India-sunset.svg" },
  { name: "Kathmandu", zoneName: "Asia/Kathmandu", image: "Snow-sunset.svg" },
  { name: "Omsk", zoneName: "Asia/Omsk", image: "Snow-sunset.svg" },
  { name: "Jakarta", zoneName: "Asia/Jakarta", image: "Indonesia-sunset.svg" },
  { name: "Beijing", zoneName: "Asia/Shanghai", image: "China-sunset.svg" },
  {
    name: "Tokyo",
    zoneName: "Asia/Tokyo",
    image: "ItsukishimaGateJapan-sunset.svg",
  },
  {
    name: "Vladivostok",
    zoneName: "Asia/Vladivostok",
    image: "Snow-sunset.svg",
  },
  { name: "Sydney", zoneName: "Australia/Sydney", image: "City-sunset.svg" },
  { name: "Magadan", zoneName: "Asia/Magadan", image: "Snow-sunset.svg" },
  { name: "Fiji", zoneName: "Pacific/Fiji", image: "Tropical-sunset.svg" },
  { name: "Auckland", zoneName: "Pacific/Auckland", image: "Valley-day.svg" },
  {
    name: "Tonga",
    zoneName: "Pacific/Tongatapu",
    image: "tropical-sunset.svg",
  },
  {
    name: "Niue",
    zoneName: "Pacific/Niue",
    image: "tropical-sunset.svg",
  },
  {
    name: "Honolulu",
    zoneName: "Pacific/Honolulu",
    image: "tropical-sunset.svg",
  },
  { name: "Adak", zoneName: "America/Adak", image: "Snow-sunset.svg" },
  { name: "Alaska", zoneName: "America/Metlakatla", image: "Snow-sunset.svg" },
  {
    name: "Los Angeles",
    zoneName: "America/Los_Angeles",
    image: "City-sunset.svg",
  },
  {
    name: "Denver",
    zoneName: "America/Denver",
    image: "HillsandMountains-sunset.svg",
  },
  { name: "Chicago", zoneName: "America/Chicago", image: "Lake-sunset.svg" },
  { name: "New York", zoneName: "America/New_York", image: "USA-sunset.svg" },
  {
    name: "Barbados",
    zoneName: "America/Barbados",
    image: "Tropical-sunset.svg",
  },
  {
    name: "Brasilia",
    zoneName: "America/Araguaina",
    image: "Forest-sunset.svg",
  },
  { name: "Greenland", zoneName: "America/Nuuk", image: "Snow-sunset.svg" },
  { name: "Noronha", zoneName: "America/Noronha", image: "Snow-sunset.svg" },
  {
    name: "Cape Verde",
    zoneName: "Atlantic/Cape_Verde",
    image: "SeaLighthouse-sunset.svg",
  },
  {
    name: "Azores",
    zoneName: "Atlantic/Azores",
    image: "HillsandMountains-sunset.svg",
  },
  { name: "Timbuktu", zoneName: "Africa/Bamako", image: "Desert-sunset.svg" },
];

export default LocationImageMapping;
