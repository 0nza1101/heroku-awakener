import { assertEquals } from "https://deno.land/std@0.138.0/testing/asserts.ts";
import { spy, Spy, FakeTime } from "https://deno.land/x/mock@v0.10.0/mod.ts";
import { wakeDyno, wakeDynos } from "./mod.ts";

/*
// Waiting for https://github.com/denoland/deno/issues/11133
Deno.test("wake an Heroku application", () => {
  const url = "https://kaffeine.herokuapp.com/";
  const time: FakeTime = new FakeTime();
  const wakeDynoSpy: Spy<void> = spy(wakeDyno);
  const logSpy = spy(console, 'log');
  const fetchSpy = spy(fetch);
  try {
    wakeDynoSpy(url, { 
      interval: .1, // 6sec
    });
    assertEquals(wakeDynoSpy.calls.length, 1);
    assertEquals(fetchSpy.calls.length, 0);
    assertEquals(logSpy.calls.length, 0);
    time.tick(6000);
    assertEquals(logSpy.calls.length, 1);
    assertEquals(fetchSpy.calls.length, 1);
  } finally {
    logSpy.restore();
    wakeDynoSpy.restore();
    time.restore();
  }
});*/
