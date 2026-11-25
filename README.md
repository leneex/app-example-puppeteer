# Puppeteer

Example [Puppeteer](https://pptr.dev/) app. Puppeteer is a Node.js library for controlling headless Chrome; this example opens a web page and returns its first paragraph.

## Deploy settings

| Field | Value |
| --- | --- |
| Build | Railpack |
| Project directory | `/` |
| Install command | leave empty |
| Build command | leave empty |
| Start command | leave empty |
| Application port | `3000` |
| Health check path | `/health` |

## <a name="dev"></a>Run locally

```bash
# install dependencies and Chrome for Puppeteer
npm install

# start the app
npm run start
```

Requires Node.js 22.12 or later.
