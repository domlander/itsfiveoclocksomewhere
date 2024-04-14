import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import clientPromise from "../utils/mongodb";
import styles from "../src/components/Home/Home.module.css";
import useClock from "../src/hooks/useClock";
import Background from "../src/components/Background";
import { getGMTHoursUntil5pm } from "../src/utils";

type Props = {
  location: string;
  gmtOffset: number;
  image: string;
};

export const getTimeIn5pmLocation = (gmtOffset: number) => {
  const now = new Date();
  now.setHours((now.getUTCHours() + gmtOffset) % 24);
  return now;
};

export default function Page({ location, gmtOffset, image }: Props) {
  const time: string = useClock(getTimeIn5pmLocation(gmtOffset));
  const hoursUntil5pmInThisLocation = getGMTHoursUntil5pm();

  if (gmtOffset === hoursUntil5pmInThisLocation) {
    return (
      <Background image={image}>
        <div className={styles.content}>
          <p className={styles.text}>It&rsquo;s five o&rsquo;clock in...</p>
          <p className={styles.location}>{location}</p>
          <p className={styles.clock}>{time}</p>
        </div>
      </Background>
    );
  }

  return (
    <Background image={image}>
      <div className={styles.content}>
        <p className={styles.itWas}>
          It was 5pm in <span style={{ fontSize: "140%" }}>{location}</span>
        </p>
        <p className={styles.isNow}>
          It is now <span style={{ fontSize: "140%" }}>{time}</span>
        </p>
        <Link href="/">
          <a className={styles.question}>Where is it 5pm now?</a>
        </Link>
      </div>
    </Background>
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
