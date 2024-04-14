import React from "react";
import Link from "next/link";
import styles from "./NotFivePm.module.css";

type Props = {
  time: string;
  location: string;
};

const Home = ({ time, location }: Props) => {
  return (
    <div className={styles.content}>
      <p className={styles.itWas}>
        It was 5pm in <span style={{ fontSize: "160%" }}>{location}</span>
      </p>
      <p className={styles.isNow}>
        It is now <span style={{ fontSize: "120%" }}>{time}</span>
      </p>
      <Link href="/">
        <a className={styles.question}>Where is it 5pm now?</a>
      </Link>
    </div>
  );
};

export default Home;
