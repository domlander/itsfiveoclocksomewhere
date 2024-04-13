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

const Home = () => {
  const currentGMTHours = new Date().getUTCHours();
  const hoursUntil5pm =
    (HOURS_IN_DAY + HOURS_BEFORE_5PM - currentGMTHours) % 24;

  const [location, setLocation] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const time = useClock(getTimeIn5pmLocation(hoursUntil5pm));
  const isPageVisible = usePageVisibility();

  useEffect(() => {
    const fetchLocationsFromDb = async () =>
      await fetch(`/api/getCurrentLocation?hoursUntil5pm=${hoursUntil5pm}`)
        .then((res) => (res.ok ? res.json() : DEFAULT_LOCATION_DATA))
        .catch(() => DEFAULT_LOCATION_DATA);

    fetchLocationsFromDb().then(({ name, image }) => {
      // Code smell. Waits to set Location so loading page doesn't flash in and out.
      // Ideally this would only occur if the page is loaded instantly.
      setTimeout(() => {
        setLocation(name);
        setImage(image);
      }, 600);
    });
  }, [hoursUntil5pm]);

  useEffect(() => {
    if (isPageVisible) {
      window.location.reload();
    }
  }, [isPageVisible]);

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
