import { parse } from "https://deno.land/std@0.138.0/flags/mod.ts";
import { wakeDyno } from "./mod.ts";

// https://deno.land/manual/tools/script_installer
if (import.meta.main) {
  console.log('Args', parse(Deno.args));
  const args = parse(Deno.args);
  const url = args.url;
  if(url) {
    wakeDyno(url, {
      interval: args.interval ?? 1,
    });
  }
}
