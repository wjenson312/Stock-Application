# StockifyPro

A Node.js/Express web app that scrapes daily top-gaining stock tickers from Yahoo Finance, enriches them with company financials from the Alpha Vantage API, and stores the results in MongoDB. Visitors can download the latest data as a CSV.

## Features

- Scrapes the current day's top gainers from Yahoo Finance
- Pulls company overview data (market cap, P/E ratios, dividends, revenue, etc.) from the [Alpha Vantage](https://www.alphavantage.co/) API
- Stores results in MongoDB via Mongoose
- Serves a simple EJS-based site with Home, About, and Download pages
- Exposes a small REST API for stock records (`/api/stocks`)

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Templating:** EJS
- **Scraping:** Axios, Cheerio
- **Security/Perf middleware:** Helmet, Compression, Morgan

## Project Structure

```
.
├── server.js              # App entrypoint
├── server/
│   ├── auth.js               # Admin-key middleware for write/delete routes
│   ├── connection.js       # MongoDB connection
│   ├── controller.js       # API route handlers (create/find/delete stock records)
│   ├── model.js             # Mongoose schema for stock records
│   ├── prod.js               # Helmet/compression middleware
│   ├── render.js            # Page route handlers
│   └── router.js             # Express routes
├── scraping/
│   ├── initScrape.js        # Scrapes tickers from Yahoo Finance gainers page
│   ├── getData.js            # Fetches financials per ticker from Alpha Vantage, populates DB
│   ├── clearDB.js             # Clears existing stock records before a new scrape
│   └── writeToFile.js          # Writes results to CSV
├── views/                  # EJS templates (index, about, download)
└── assets/                 # Static CSS/images
```

## Setup

### Prerequisites

- Node.js (see `engines` in `package.json` for the version used during development)
- A MongoDB database (e.g. a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- A free [Alpha Vantage API key](https://www.alphavantage.co/support/#api-key)

### Installation

```bash
git clone https://github.com/wjenson312/Stock-Application.git
cd Stock-Application
npm install
```

### Configuration

Copy the example env file and fill in your own values:

```bash
cp config.env.example config.env
```

`config.env` (git-ignored — never commit this file):

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on |
| `MONGO_URI` | MongoDB connection string |
| `API_KEY` | Alpha Vantage API key |
| `TEMP_API_KEY` | Secondary Alpha Vantage API key |
| `ADMIN_API_KEY` | Shared secret required to create/delete stock records (any random string, e.g. `openssl rand -hex 24`) |

### Running the app

```bash
npm start
```

The site will be available at `http://localhost:3000` (or whatever `PORT` you set).

### Running the scraper

The scraper populates the database with the day's top gainers and their financials:

```bash
node scraping/getData.js
```

This clears existing records, scrapes current gainers from Yahoo Finance, and fetches financial data for each ticker from Alpha Vantage (rate-limited to stay within the free API tier). It needs the server running (`npm start`) since it talks to the local API.

## API

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/stocks` | none | Get all stored stock records |
| `POST` | `/api/stocks` | `x-api-key: <ADMIN_API_KEY>` header | Create a stock record |
| `DELETE` | `/api/stocks` | `x-api-key: <ADMIN_API_KEY>` header | Delete all stock records |

The `POST` and `DELETE` routes are destructive/write operations, so they require the `x-api-key` header to match `ADMIN_API_KEY` from your `config.env`. Requests without it get a `401`.

## Known Limitations

- Dependencies are patched against non-breaking known vulnerabilities (`npm audit fix`). A handful of remaining advisories require major-version bumps (Mongoose 5→9, a nested `nodemon` dependency) that would need code changes to the DB connection layer — see `npm audit` for details.
- Scraping Yahoo Finance's HTML (`scraping/initScrape.js`) is fragile by nature and will break if their page structure changes.

## License

ISC
