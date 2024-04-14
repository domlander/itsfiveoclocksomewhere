import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import FivePm from "../src/components/FivePm/FivePm";
import NotFivePm from "../src/components/NotFivePm";
import Background from "../src/components/Background";
import useClock from "../src/hooks/useClock";
import usePageVisibility from "../src/hooks/usePageVisible";
import clientPromise from "../utils/mongodb";
import { getGMTHoursUntil5pm, getTimeInLocation } from "../src/utils";

type Props = {
  location: string;
  gmtOffset: number;
  image: string;
};

export default function Page({ location, gmtOffset, image }: Props) {
  const [startTime, setStartTime] = useState(getTimeInLocation(gmtOffset));
  const time = useClock(startTime);
  const isPageVisible: boolean = usePageVisibility();

  /**
   * When the user navigates away from the page and back again, we
   * need to update the clock as it may have become out of sync.
   */
  useEffect(() => {
    if (!isPageVisible) {
      return;
    }

    setStartTime(getTimeInLocation(gmtOffset));
  }, [gmtOffset, isPageVisible]);

  return (
    <>
      <Head>
        <title>{`Have a beer in ${location}`}</title>
        <meta property="og:title" content={`Have a beer in ${location}`} />
        <meta
          name="description"
          content={`Find out whether it's time for a beer in ${location}`}
        />
        <meta
          property="og:url"
          content={`https://www.itsfiveoclocksomewhere.beer/${location}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta
          property="og:image"
          itemProp="image"
          content={`https://www.itsfiveoclocksomewhere.beer/landscapes/${image}`}
        />
        <meta property="og:image:width" content="407" />
        <meta property="og:image:height" content="407" />
      </Head>
      <Background image={image}>
        {gmtOffset === getGMTHoursUntil5pm() ? (
          <FivePm location={location} time={time} />
        ) : (
          <NotFivePm location={location} time={time} />
        )}
      </Background>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const locationInUrl = context.params?.location;
  if (!locationInUrl) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const client = await clientPromise;
  const db = client.db("itsfiveoclocksomewhere");
  const locations = db.collection("locations");

  const location = await locations
    .find({ name: locationInUrl })
    .collation({ locale: "en", strength: 2 })
    .toArray();

  if (!location?.length) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      location: location[0].name,
      gmtOffset: location[0].gmtOffset,
      image: location[0].image,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await clientPromise;
  let locations;

  try {
    locations = await client
      .db("itsfiveoclocksomewhere")
      .collection("locations")
      .find()
      .toArray();
  } catch (e) {
    console.log(`Fetching locations failed. ${e}`);
  }

  if (locations === undefined) {
    throw Error;
  }

  const paths = locations
    .filter((l) => l)
    .map((location) => ({
      params: { location: location.name.toLowerCase().toString() },
    }));

  return {
    paths,
    fallback: false,
  };
};
