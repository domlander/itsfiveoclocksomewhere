import { useEffect, useState } from "react";

const useClock = (startTime: Date) => {
  const [time, setTime] = useState<Date>(startTime);

  useEffect(() => {
    let id = setInterval(() => {
      startTime.setSeconds(time.getSeconds() + 1);
      setTime(startTime);
    }, 1000);

    return () => clearInterval(id);
  });

  return time.toLocaleTimeString();
};

export default useClock;
