import { parse } from "https://deno.land/std@0.138.0/flags/mod.ts";
import { Options, wakeDyno } from "./mod.ts";

if (import.meta.main) {
  if (Deno.args.length > 0) {
    const args = parse(Deno.args);
    const options: Options = {
      interval: args.interval ?? 29,
      ...(args.stopStart || args.stopEnd) && {
        stopTimes: {
          start: args.stopStart,
          end: args.stopEnd
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
    console.log('Usage:\n$ heroku-awakener --url <url> --interval <interval> --stopStart <start> --stopEnd <end>\n$ heroku-awakener --urls <urls> --interval <interval> --stopStart <start> --stopEnd <end>')
  }
}
