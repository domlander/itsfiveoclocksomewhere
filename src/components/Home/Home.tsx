import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import Clock from "../Clock";

const HOURS_IN_DAY = 24;
const HOURS_BEFORE_5PM = 17;

const Home = () => {
  const currentTimeInHours = new Date().getHours();
  const hoursUntil5pm =
    (HOURS_IN_DAY + HOURS_BEFORE_5PM - currentTimeInHours) % 24;

  const [location, setLocation] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationsFromDb = async () => {
      const data = await fetch(
        `/api/getCurrentLocation?hoursUntil5pm=${hoursUntil5pm}`
      );
      return data;
    };

    fetchLocationsFromDb()
      .then((data) => data.json())
      .then(({ name, image }) => {
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
        <p className={styles.p}>It&rsquo;s five o&rsquo;clock in...</p>
        <h1 className={styles.h1}>{location}</h1>
        <Clock hoursUntil5pm={hoursUntil5pm} />
      </div>
    </div>
  );
};

export default Home;
