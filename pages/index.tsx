import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Clock from "../src/Clock";
import ImageDictionary from "../src/ImageLookUp";

export default function Home() {
  const hours = new Date().getUTCHours() + 1;
  const hoursUntil5pm = (24 + 17 - hours) % 24;
  const location = ImageDictionary[hoursUntil5pm];

  return (
    <div className={styles.container}>
      <Image
        src={`/landscapes/${location[1]}`}
        alt=""
        layout="fill"
        objectFit="cover"
      />
      <div className={styles.opacityLayer} />
      <div className={styles.content}>
        <p className={styles.p}>It&rsquo;s five o&rsquo;clock in...</p>
        <h1 className={styles.h1}>{location[0]}</h1>
        <Clock hoursUntil5pm={hoursUntil5pm} />
      </div>
    </div>
  );
}
