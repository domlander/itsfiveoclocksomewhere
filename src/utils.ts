const HOURS_IN_DAY = 24;
const HOURS_BEFORE_5PM = 17;
export const DEFAULT_LOCATION = "Somewhere";
const DEFAULT_IMAGE = "Tropical-sunset.svg";
const DEFAULT_LOCATION_DATA = {
  name: DEFAULT_LOCATION,
  image: DEFAULT_IMAGE,
};

export const getTimeInLocation = (gmtOffset: number) => {
  const now = new Date();
  now.setHours((now.getUTCHours() + gmtOffset) % 24);
  return now;
};

/**
 * Time in the location where it is 5pm
 */
export const getTimeIn5pmLocation = () => {
  const hours = getGMTHoursUntil5pm();
  return getTimeInLocation(hours);
};

export const getGMTHoursUntil5pm = () => {
  const currentGMTHours = new Date().getUTCHours();
  const hoursUntil5pm =
    (HOURS_IN_DAY + HOURS_BEFORE_5PM - currentGMTHours) % 24;
  return hoursUntil5pm;
};

export const fetchLocationsFromDb = async (hoursUntil5pm: number) =>
  await fetch(`/api/getCurrentLocation?hoursUntil5pm=${hoursUntil5pm}`)
    .then((res) => (res.ok ? res.json() : DEFAULT_LOCATION_DATA))
    .catch(() => DEFAULT_LOCATION_DATA);

// time: HH:MM:SS
export const is5pm = (time: string) => time.split(":")[0] === "17";
