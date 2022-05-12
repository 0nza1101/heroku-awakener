# ☁️💤 Heroku awakener

## ⭐ Getting started
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

### CLI with [DPX](https://github.com/denorg/dpx)

After [installing DPX](https://github.com/denorg/dpx), you can directly use the CLI using the `dpx` command:

```bash
dpx --allow-net heroku-awakener --url <url> --interval <interval>
```

### CLI

Alternatively, you can use it directly from the CLI by using `deno run`:

```bash
deno run --allow-net https://raw.githubusercontent.com/0nza1101/heroku-awakener/main/cli.ts --url <url> --interval <interval>
```

You can also install it globally using the following:

```bash
deno install --allow-net -n heroku-awakener https://raw.githubusercontent.com/0nza1101/heroku-awakener/main/cli.ts
```

Then, the package is available to run:

```bash
heroku-awakener <arguments>
```

### Configuration

Required permissions:

1. `--allow-net`

## 👩‍💻 Development

Run tests:

```bash
deno test --allow-net
```
