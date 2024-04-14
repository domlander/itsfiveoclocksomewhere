import React from "react";
import { DEFAULT_LOCATION } from "../../utils";
import styles from "./FivePm.module.css";

type Props = {
  time: string;
  location: string;
};

const Home = ({ time, location }: Props) => {
  return (
    <div className={styles.content}>
      <p className={styles.text}>
        It&rsquo;s five o&rsquo;clock
        {location === DEFAULT_LOCATION ? "..." : " in..."}
      </p>
      <p className={styles.location}>{location}</p>
      <p className={styles.clock}>{time}</p>
    </div>
  );
};

export default Home;
