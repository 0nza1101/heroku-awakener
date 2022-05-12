import { parse } from "https://deno.land/std@0.138.0/flags/mod.ts";
import { Options, wakeDyno } from "./mod.ts";

if (import.meta.main) {
  console.log('Args', parse(Deno.args));
  const args = parse(Deno.args);

  if (args._.length > 0) {
    const options: Options = {
      interval: args.interval ?? 29,
      ...(args.stopStart && args.stopEnd) && {
        stopTimes: {
          start: args.start,
          end: args.end
        }
      }
    }
    const url = args.url;
    if (url) {
      wakeDyno(url, options);
    }

    let urls = args.urls;
    if (urls) {
      urls = args.urls.split(',');
      wakeDyno(urls, options);
    }
  } else {
    console.log('Usage:\n$ heroku-awakener --url <url> --interval <interval> --stopStart <start> --stopEnd <end>')
  }
}
