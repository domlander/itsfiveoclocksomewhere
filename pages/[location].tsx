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

type BeerOclockDeciderProps = {
  is5pm: boolean | null;
  location: string;
  time: string;
};

const BeerOclockDecider = ({
  is5pm,
  location,
  time,
}: BeerOclockDeciderProps) => {
  if (typeof is5pm === null) {
    return null;
  }

  return is5pm ? (
    <FivePm location={location} time={time} />
  ) : (
    <NotFivePm location={location} time={time} />
  );
};

type Props = {
  location: string;
  gmtOffset: number;
  image: string;
};

export default function Page({ location, gmtOffset, image }: Props) {
  const [startTime, setStartTime] = useState(getTimeInLocation(gmtOffset));
  const [is5pm, setIs5pm] = useState<boolean | null>(null);
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

  useEffect(() => {
    setIs5pm(gmtOffset === getGMTHoursUntil5pm());
  }, [gmtOffset]);

  const pngImageUrl = `${image.split(".").slice(0, -1).join("")}.png`;

  return (
    <>
      <Head>
        <title>{`Have a beer in ${location}`}</title>
        <meta property="og:title" content={`It's 5pm in...${location}!`} />
        <meta
          name="description"
          content={`Have a beer, it's five o'clock somewhere`}
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
          content={`https://www.itsfiveoclocksomewhere.beer/landscapes/${pngImageUrl}`}
        />
        <meta property="og:image:width" content="407" />
        <meta property="og:image:height" content="407" />
      </Head>
      <Background image={image}>
        <BeerOclockDecider is5pm={is5pm} location={location} time={time} />
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
