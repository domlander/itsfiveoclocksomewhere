import React, { useEffect, useState } from "react";
import styles from "./Clock.module.css";

interface Props {
  hoursUntil5pm: number;
}

const timeToDisplay = (hours: number) => {
  const now = new Date();
  now.setHours((now.getUTCHours() + hours) % 24);
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

  return <p className={styles.clock}>{clock}</p>;
};

export default Clock;
