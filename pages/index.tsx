import React from "react";
import Head from "next/head";
import Homepage from "../src/components/Home/Home";

export default function Home() {
  return (
    <>
      <Head>
        <title>Have a beer, it&rsquo;s five o&rsquo;clock somewhere</title>
        <meta
          property="og:title"
          content="Have a beer, it's five o'clock somewhere"
        />
        <meta
          name="description"
          content="Find a town or city somewhere the world where it is currently 5pm."
        />
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
        {/* A failed attempt to get the Whatsapp unfurl to show up-to-date information */}
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <Homepage />
    </>
  );
}
