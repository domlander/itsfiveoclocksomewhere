import React, { useEffect, useState } from "react";
import styles from "../styles/Clock.module.css";

interface Props {
  hoursUntil5pm: number;
}

const timeToDisplay = (hours: number) => {
  const now = new Date();
  now.setHours((now.getHours() + hours) % 24);
  return now.toLocaleTimeString();
};

const Clock = ({ hoursUntil5pm }: Props) => {
  const [clock, setClock] = useState(timeToDisplay(hoursUntil5pm));

  useEffect(() => {
    let id = setInterval(() => {
      setClock(timeToDisplay(hoursUntil5pm));
    }, 1000);

    return () => clearInterval(id);
  }, [hoursUntil5pm]);

  return <h2 className={styles.h2}>{clock}</h2>;
};

export default Clock;
