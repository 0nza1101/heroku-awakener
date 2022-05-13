import * as logger from "https://deno.land/std@0.139.0/log/mod.ts";
import dayjs from "https://cdn.skypack.dev/dayjs@1.11.2";
import isBetween from "https://cdn.skypack.dev/dayjs@1.11.2/plugin/isBetween.js";
import customParseFormat from "https://cdn.skypack.dev/dayjs@1.11.2/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

interface StopTimes {
  start: string;
  end: string;
}
export interface Options {
  interval?: number;
  logging?: boolean;
  stopTimes?: StopTimes;
}

function isStopTime(stopTimes: StopTimes): boolean {
  const { start, end } = stopTimes;
  const format = 'HH:mm';

  if (!start || !end) {
    logger.warning('Both a start/end stop time must be defined.');
    return true;
  }

  const current = dayjs();
  const startTime = dayjs(start, format);
  const endTime = dayjs(end, format);

  return current.isBetween(startTime, endTime);
};

/**
 * Ping the URL of an Heroku application periodically
 * @param {string} url - Heroku application url
 * @param {Options} options - options object.
 */
export function wakeDyno(url: string, options: Options = {}) {
  const { interval = 29, logging = true, stopTimes } = options;
  const milliseconds = interval * 60000;

  setTimeout(() => {
    if (stopTimes && isStopTime(stopTimes)) {
      wakeDyno(url, options);
    } else {
      fetch(url)
        .then(() => logging && logger.info('Successfully woke the dyno'))
        .catch((error: Error) => logging && logger.error(`Attempting to wake the dyno : ${error.message}`))
        .finally(() => wakeDyno(url, options));
    }
  }, milliseconds);
}

/**
 * Ping multiple Heroku application URLs periodically
 * @param {string[]} urls - Heroku application urls
 * @param {Options} options - options object.
 */
export function wakeDynos(urls: string[], options: Options) {
  const { interval = 29, logging = true, stopTimes } = options;
  const milliseconds = interval * 60000;

  setTimeout(() => {
    if (stopTimes && isStopTime(stopTimes)) {
      wakeDynos(urls, options);
    } else {
      const promises = urls.map((url) => fetch(url));
      Promise.all(promises)
        .then(() => logging && logger.info('Successfully woke all dynos'))
        .catch((error: Error) => logging && logger.error(`Attempting to wake the dyno : ${error.message}`))
        .finally(() => wakeDynos(urls, options));
    }
  }, milliseconds);
};
