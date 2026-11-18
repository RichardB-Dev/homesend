# Home Send

A shortlist tool for Bromley Estates Marbella. George Nayda signs in, chooses homes, and sends one branded email to a client.

The app is a React frontend and an Azure Functions API, deployed together to Azure Static Web Apps.

## Run it locally

Node 20 or newer.

```bash
npm install --prefix api
npm install --prefix frontend
npm run dev:api
npm run dev:web
```

Open http://localhost:5173. The sign-in is George Nayda. Any password works.

In Cursor, Run and Debug, then Launch Home Send. That starts the API and the site, and opens the app.

`DRY_RUN` defaults to on, so Send prepares the email and does not contact a mail server. The sent list still records it, marked as not delivered.

## Add homes

Put one JSON file per home in `properties/`. The API reads every file in that folder. No code change is required.

## Mail

Copy `api/local.settings.json.example` to `api/local.settings.json` for local SMTP settings. On Azure, set the same names as Function application settings:

- `SMTP_HOST`
- `SMTP_PORT` (`587`, or `465` for implicit TLS)
- `SMTP_USER`
- `SMTP_PASSWORD`
- `MAIL_FROM` (the real mailbox)
- `MAIL_FROM_NAME` (`George Nayda`)
- `DRY_RUN` (`false` when mail should actually leave)
- `PUBLIC_BASE_URL` (the Static Web App origin, so the logo and portrait load in the email)

The visible From name is George Nayda. The address beside it is `MAIL_FROM`. Bromley Estates appears in the message itself.

## Azure

Create the Static Web App with a custom deployment token, so this repo keeps the workflow in `.github/workflows/azure-static-web-apps.yml`.

Add the GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN`. Pushes to `main` deploy the app. Pull requests get a preview environment.

The intro, footer, and sent list stay in the browser for George’s login. The server does not store them.
