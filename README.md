# Boobs Pictures App

The open-source community field map behind [app.boobs.pictures](https://app.boobs.pictures).

## Stack

- React with JSX
- esbuild
- MapLibre GL JS
- CARTO raster basemap with OpenStreetMap data

There is no Vite, Expo, or frontend framework runtime.

## Development

```sh
npm install
npm run dev
```

The local app runs at `http://127.0.0.1:4180`.

## Checks

```sh
npm test
npm run check
npm run build
```

## Deployment

The protected `main` branch contains source code. GitHub Actions builds the static app and publishes the output to the generated `hostinger` branch. Hostinger automatically deploys that branch to production.

Do not commit secrets. Browser-safe service identifiers belong in documented public configuration. Database credentials, service-role keys, storage credentials, and signing secrets belong in the deployment provider.

## License

Code is licensed under the MIT License. Brand assets, user photographs, and sighting content are excluded unless separately licensed.

See [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request and [SECURITY.md](SECURITY.md) for private vulnerability reporting.
