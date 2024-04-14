import React, { ReactNode } from "react";
import Image from "next/image";
import styles from "./Background.module.css";

type Props = {
  image: string;
  children: ReactNode;
};

const Background = ({ image, children }: Props) => {
  return (
    <div className={styles.container}>
      <Image
        src={`/landscapes/${image}`}
        alt="A soft landscape"
        layout="fill"
        objectFit="cover"
      />
      <div className={styles.opacityLayer} />
      {children}
    </div>
  );
};

export default Background;
