# It's five o'clock somewhere

Isn't it a bit early for a beer? It's five o'clock somewhere...

Want to find out where in the world it's 5pm so you can get the person bothering you off your back about cracking open a cold one? Find out here: http://www.itsfiveoclocksomewhere.beer/

Gorgeous images taken from here: https://www.pixeltrue.com/scenic-illustrations.
Inspired by this [Reddit post](https://www.reddit.com/r/InternetIsBeautiful/comments/osgaly/we_turned_beautiful_landmarks_scenes_from_around/):

> _We turned beautiful landmarks & scenes from around the globe into Animated Illustrations. You can download the high-res PNG and source files for free. Use them commercially without attribution._

Thank you `u/crowesdfsdf`!

## Technical details

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

A Mongo database is used to store all locations that can be used. This is hosted on [MongoDB Cloud Services](https://www.mongodb.com/cloud).

A Github action is used to daily trigger an update to the `gmtOffset` field of each location in the locations document, to make sure that we have accurate data, in case a country has a change in timezone (e.g. daylight savings).
