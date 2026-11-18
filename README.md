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

Send delivers mail unless `DRY_RUN` is `true`. A dry run is stored in the sent list and marked as not delivered.

## Add homes

Put one JSON file per home in `properties/`. The API reads every file in that folder. No code change is required.

## Mail

`api/mail.settings.json` holds the mail server, port, sender name, and dry-run flag. Those are committed.

The mailbox address and app password are GitHub secrets, not files in the repo:

- `SMTP_USER`
- `SMTP_PASSWORD`
- `MAIL_FROM`

The deploy workflow writes them into the API at deploy time. For a local run, put the same three names in `api/local.settings.json`, copied from `api/local.settings.json.example`.

`PUBLIC_BASE_URL` is the Static Web App origin, so the logo and portrait load in the email. Set it in `api/local.settings.json` locally, or as an application setting on the Static Web App.

The visible From name is George Nayda. The address beside it is `MAIL_FROM`. Bromley Estates appears in the message itself.

## Azure

Azure created `.github/workflows/azure-static-web-apps-white-moss-0cdfec610.yml`. It builds `frontend`, deploys the `api` functions, and publishes `dist`.

The GitHub secret is `AZURE_STATIC_WEB_APPS_API_TOKEN_WHITE_MOSS_0CDFEC610`. Pushes to `main` deploy the app. Pull requests get a preview environment.

The intro, footer, and sent list stay in the browser for George’s login. The server does not store them.
