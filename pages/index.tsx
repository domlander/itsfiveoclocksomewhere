import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Clock from "../src/Clock";
import ImageDictionary from "../src/ImageLookUp";

const HOURS_IN_DAY = 24;
const HOURS_BEFORE_5PM = 17;

export default function Home() {
  const currentTimeInHours = new Date().getHours();
  const hoursUntil5pm =
    (HOURS_IN_DAY + HOURS_BEFORE_5PM - currentTimeInHours) % 24;
  const location = ImageDictionary[hoursUntil5pm];

  return (
    <>
      <Head>
        <title>Have a beer, it&rsquo;s five o&rsquo;clock somewhere</title>
        <meta
          property="og:title"
          content="Have a beer, it's five o'clock in..."
        />
        <meta name="description" content={location[0]} />
        <meta
          property="og:url"
          content="https://www.itsfiveoclocksomewhere.beer/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta
          property="og:image"
          itemProp="image"
          content="https://www.itsfiveoclocksomewhere.beer/landscapes/City-sunset.png"
        />
        <meta property="og:image:width" content="407" />
        <meta property="og:image:height" content="407" />
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
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
    </>
  );
}
