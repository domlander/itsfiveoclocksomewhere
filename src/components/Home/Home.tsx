import React, { useEffect, useState } from "react";
import FivePm from "../FivePm";
import Background from "../Background";
import Loading from "../Loading";
import useClock from "../../hooks/useClock";
import usePageVisibility from "../../hooks/usePageVisible";
import {
  fetchLocationsFromDb,
  getGMTHoursUntil5pm,
  getTimeIn5pmLocation,
  is5pm,
} from "../../utils";

/**
 * Don't display the loading screen for less than MIN_LOADING_TIME,
 * as this may cause a flash of content with the loading screen being
 * displayed for a moment and then removed.
 */
const MIN_LOADING_TIME = 1_000;

const Home = () => {
  const [startTime, setStartTime] = useState(getTimeIn5pmLocation());
  const [location, setLocation] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const time: string = useClock(startTime);
  const isPageVisible: boolean = usePageVisibility();

  const updateBackground = (location: string, image: string) => {
    setLocation(location);
    setImage(image);
  };

  useEffect(() => {
    Promise.all([
      fetchLocationsFromDb(getGMTHoursUntil5pm()),
      new Promise((r) => setTimeout(r, MIN_LOADING_TIME)),
    ]).then(([{ name, image }]) => {
      updateBackground(name, image);
    });
  }, []);

  /**
   * When the user navigates away from the page and back again, we
   * need to update the clock as it may have become out of sync.
   */
  useEffect(() => {
    if (!isPageVisible) {
      return;
    }

    // If it's no longer 5pm when the user comes back to the page, update the location
    if (!is5pm(time)) {
      fetchLocationsFromDb(getGMTHoursUntil5pm()).then(({ name, image }) => {
        updateBackground(name, image);
      });
    }

    setStartTime(getTimeIn5pmLocation());
  }, [isPageVisible, time]);

  /**
   * If it is no longer 5pm here, update the location. Don't update
   * the location before the location is set (i.e on initial page load)
   * as this is handled in another useEffect
   */
  useEffect(() => {
    if (is5pm(time) || location === null) {
      return;
    }

    setStartTime(getTimeIn5pmLocation());
    fetchLocationsFromDb(getGMTHoursUntil5pm()).then(({ name, image }) => {
      updateBackground(name, image);
    });
  }, [location, time]);

  if (!location || !image) return <Loading />;

  return (
    <Background image={image}>
      <FivePm location={location} time={time} />
    </Background>
  );
};

export default Home;
