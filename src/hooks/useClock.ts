import { useEffect, useState } from "react";

const useClock = (startTime: Date) => {
  const [time, setTime] = useState<Date>(startTime);

  useEffect(() => {
    setTime(startTime);
  }, [startTime]);

  useEffect(() => {
    let id = setInterval(() => {
      const newTime = new Date(time.getTime() + 1000);
      setTime(newTime);
    }, 1000);

    return () => clearInterval(id);
  });

  return time.toLocaleTimeString();
};

export default useClock;
