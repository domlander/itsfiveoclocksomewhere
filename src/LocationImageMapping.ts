interface Dictionary {
  [Key: number]: [string, string];
}

const LocationImageMapping: Dictionary = {
  0: ["London", "London-sunset.svg"], // 4pm GMT
  1: ["Paris", "France-sunset.svg"],
  2: ["Nairobi", "Desert-sunset.svg"],
  3: ["Dubai", "Desert-sunset.svg"],
  4: ["Mumbai", "India-sunset.svg"], // 8pm GMT
  5: ["Omsk", "Snow-sunset.svg"],
  6: ["Jakarta", "Indonesia-sunset.svg"],
  7: ["Beijing", "China-sunset.svg"],
  8: ["Tokyo", "ItsukishimaGateJapan-sunset.svg"], // 12am GMT
  9: ["Sydney", "City-sunset.svg"],
  10: ["Magadan", "Snow-sunset.svg"],
  11: ["Auckland", "Valley-day.svg"],
  12: ["Tonga", "tropical-sunset.svg"], // 4am GMT
  13: ["Honolulu", "tropical-sunset.svg"],
  14: ["Adak", "Snow-sunset.svg"],
  15: ["Alaska", "Snow-sunset.svg"],
  16: ["Los Angeles", "City-sunset.svg"], // 8am GMT
  17: ["Denver", "HillsandMountains-sunset.svg"],
  18: ["Chicago", "Lake-sunset.svg"],
  19: ["New York", "USA-sunset.svg"],
  20: ["Brasilia", "Forest-sunset.svg"], // 12pm GMT
  21: ["Greenland", "Snow-sunset.svg"],
  22: ["Cape Verde", "SeaLighthouse-sunset.svg"],
  23: ["Timbuktu", "Desert-sunset.svg"],
};

export default LocationImageMapping;
