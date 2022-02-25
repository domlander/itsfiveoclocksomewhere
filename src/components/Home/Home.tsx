import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import Clock from "../Clock";

const HOURS_IN_DAY = 24;
const HOURS_BEFORE_5PM = 17;
const DEFAULT_LOCATION = "Somewhere";
const DEFAULT_IMAGE = "Tropical-sunset.svg";
const DEFAULT_LOCATION_DATA = {
  name: DEFAULT_LOCATION,
  image: DEFAULT_IMAGE,
};

const Home = () => {
  const currentUTCHours = new Date().getUTCHours();
  const hoursUntil5pm =
    (HOURS_IN_DAY + HOURS_BEFORE_5PM - currentUTCHours) % 24;

  const [location, setLocation] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationsFromDb = async () =>
      await fetch(`/api/getCurrentLocation?hoursUntil5pm=${hoursUntil5pm}`)
        .then((res) => (res.ok ? res.json() : DEFAULT_LOCATION_DATA))
        .catch(() => DEFAULT_LOCATION_DATA);

    fetchLocationsFromDb().then(({ name, image }) => {
      setLocation(name);
      setImage(image);
    });
  }, [hoursUntil5pm]);

  if (!location || !image) return null;

  return (
    <div className={styles.container}>
      <Image
        src={`/landscapes/${image}`}
        alt=""
        layout="fill"
        objectFit="cover"
      />
      <div className={styles.opacityLayer} />
      <div className={styles.content}>
        <p className={styles.text}>It&rsquo;s five o&rsquo;clock in...</p>
        <p className={styles.location}>{location}</p>
        <Clock hoursUntil5pm={hoursUntil5pm} />
      </div>
    </div>
  );
};

export default Home;
