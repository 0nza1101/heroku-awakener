# ☁️💤 Heroku awakener

Deno port of [heroku-keep-awake](https://github.com/colbymillerdev/heroku-keep-awake)
## Getting started
```ts
import { wakeDyno, wakeDynos } from "https://raw.githubusercontent.com/0nza1101/heroku-awakener/main/mod.ts";

const url = 'https://seoul-tracker.herokuapp.com/'
wakeDyno(url, {
  interval: 10 // 10 minutes
});

const urls = ['https://kaffeine.herokuapp.com/', 'https://swapi-trybe.herokuapp.com/'] 
wakeDynos(urls, {
  interval: 29,
  stopTimes: {
    start: '6:00', // 6AM
    end: '13:00' // 13PM
  }
});
```

### CLI

Alternatively, you can use it directly from the CLI by using `deno run`:

```bash
# Single heroku app
deno run --allow-net https://raw.githubusercontent.com/0nza1101/heroku-awakener/main/cli.ts --url <url> --interval <interval> --stopStart <start> --stopEnd <end>

# Multiple heroku apps (separate urls with comma eg. https://swapi-trybe.herokuapp.com/,https://kaffeine.herokuapp.com/)
deno run --allow-net https://raw.githubusercontent.com/0nza1101/heroku-awakener/main/cli.ts --urls <urls> --interval <interval> --stopStart <start> --stopEnd <end>
```

You can also install it globally using the following:

```bash
deno install --allow-net -n heroku-awakener https://raw.githubusercontent.com/0nza1101/heroku-awakener/main/cli.ts
```

Then, the package is available to run:

```bash
heroku-awakener --url|--urls <urls|urls> --interval <interval> --stopStart <start> --stopEnd <end>
```

### Configuration

Required permissions:

1. `--allow-net`

## Development

Run tests:

```bash
deno test --allow-net
```
