import React from "react";
import Image from "next/image";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Searching...</h1>
      <Image
        src="/earth.svg"
        alt="picture of the earth"
        height={120}
        width={120}
        className={styles.image}
        priority
      />
    </div>
  );
};

export default Loading;
