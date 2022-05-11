import dayjs from "https://cdn.skypack.dev/dayjs@1.11.2";

/** JSDoc for this line */
export function mode() {
  return 0;
}

export interface Options {
  interval: number;
  logging: boolean;
  stopTimes: {
    start: number;
    end: number;
  }
}

function isStopTime(stopTimes: Options["stopTimes"]): boolean {
  const { start, end } = stopTimes;
  const format = 'HH:mm';

  // Check if a start and end time are supplied.
  if (!start || !end) {
    console.log('WARNING: Both a start/end stop time must be defined.');
    return true;
  }

  const current = dayjs();
  const startTime = dayjs(start).format(format);
  const endTime = dayjs(end).format(format);

  return current.isBetween(startTime, endTime);
};

export function wakeDyno(url: string, options: Options) {
  const { interval = 29, logging = true, stopTimes } = options;
  const milliseconds = interval * 60000;

  setTimeout(() => {
    if (isStopTime(stopTimes)) {
      wakeDyno(url, options);
    } else {
      fetch(url)
        .then(() => logging && console.log('Successfully woke the dyno'))
        .catch(() => logging && console.log('Error attempting to wake the dyno'))
        .finally(() => wakeDyno(url, options));
    }
  }, milliseconds);
}

export function wakeDynos(urls: string[], options: Options) {
  const { interval = 29, logging = true, stopTimes } = options;
  const milliseconds = interval * 60000;

  setTimeout(() => {
    if (isStopTime(stopTimes)) {
      wakeDynos(urls, options); // Recursively call function until not a stop time.
    } else {
      const promises = urls.map((url) => fetch(url));
      Promise.all(promises)
        .then(() => logging && console.log('Successfully woke all dynos'))
        .catch(() => logging && console.log('Error attempting to wake the dynos'))
        .finally(() => wakeDynos(urls, options));
    }
  }, milliseconds);
};
