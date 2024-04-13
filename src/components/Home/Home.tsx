import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import Loading from "../Loading";
import useClock from "../../hooks/useClock";
import usePageVisibility from "../../hooks/usePageVisible";

const HOURS_IN_DAY = 24;
const HOURS_BEFORE_5PM = 17;
const DEFAULT_LOCATION = "Somewhere";
const DEFAULT_IMAGE = "Tropical-sunset.svg";
const DEFAULT_LOCATION_DATA = {
  name: DEFAULT_LOCATION,
  image: DEFAULT_IMAGE,
};

const getTimeIn5pmLocation = (hours: number) => {
  const now = new Date();
  now.setHours((now.getUTCHours() + hours) % 24);
  return now;
};

const getHoursUntil5pm = () => {
  const currentGMTHours = new Date().getUTCHours();
  const hoursUntil5pm =
    (HOURS_IN_DAY + HOURS_BEFORE_5PM - currentGMTHours) % 24;
  return hoursUntil5pm;
};

const fetchLocationsFromDb = async (hoursUntil5pm: number) =>
  await fetch(`/api/getCurrentLocation?hoursUntil5pm=${hoursUntil5pm}`)
    .then((res) => (res.ok ? res.json() : DEFAULT_LOCATION_DATA))
    .catch(() => DEFAULT_LOCATION_DATA);

const Home = () => {
  const hoursUntil5pm: number = getHoursUntil5pm();

  const [location, setLocation] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const time: string = useClock(getTimeIn5pmLocation(hoursUntil5pm));
  const isPageVisible: boolean = usePageVisibility();

  useEffect(() => {
    fetchLocationsFromDb(hoursUntil5pm).then(({ name, image }) => {
      // Waits to set location so loading page doesn't flash in and out
      setTimeout(() => {
        setLocation(name);
        setImage(image);
      }, 600);
    });
  }, [hoursUntil5pm]);

  /**
   * Refresh the page when both of the following are true:
   * - the page becomes visible
   * - It is now 5pm somewhere else (the location has changed)
   */
  useEffect(() => {
    if (!isPageVisible) {
      return;
    }

    fetchLocationsFromDb(hoursUntil5pm).then(({ name }) => {
      if (name !== location) {
        window.location.reload();
      }
    });
  }, [isPageVisible, hoursUntil5pm, location]);

  if (!location || !image) return <Loading />;

  return (
    <div className={styles.container}>
      <Image
        src={`/landscapes/${image}`}
        alt="A soft landscape"
        layout="fill"
        objectFit="cover"
      />
      <div className={styles.opacityLayer} />
      <div className={styles.content}>
        <p className={styles.text}>
          It&rsquo;s five o&rsquo;clock
          {location === DEFAULT_LOCATION ? "..." : " in..."}
        </p>
        <p className={styles.location}>{location}</p>
        <p className={styles.clock}>{time}</p>
      </div>
    </div>
  );
};

export default Home;
