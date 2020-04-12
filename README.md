# wefocus/web

- Production: [app.wefoc.us](https://app.wefoc.us)
- Development: [wefocus.now.sh](https://wefocus.now.sh)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want to run with local API server, set environment variable `API_ORIGIN`.

```bash
API_ORIGIN=http://localhost:3000 npm run dev -- --port 8080
```
