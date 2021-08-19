import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Clock from "../src/Clock";
import ImageDictionary from "../src/ImageLookUp";

export default function Home() {
  const hours = new Date().getUTCHours() + 1;
  const hoursUntil5pm = (24 + 17 - hours) % 24;
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
