# Bokhyllan

A responsive web app for keeping track of your books and your favourite quotes.
It is built with Angular 20 and a .NET 9 Web API, and uses JWT authentication.

**Live:** https://friendly-centaur-f6b57a.netlify.app

> The API runs on Render's free tier, which sleeps when idle. The **first
> request can take about a minute** while it wakes up. After that it responds normally.

**Demo account:** username `demo`, password `demo123`. You can also register
your own account.

## Features

- **Books:** list, add, edit and delete books (title, author, publication date).
  The book list is the start page.
- **My Quotes:** a separate view with five seeded quotes that you can add to,
  edit and delete.
- **Authentication:** registration and login. The API issues a JWT, the
  frontend stores it in `localStorage` and sends it as a `Bearer` header on
  every request. All book and quote endpoints require a valid token, and each
  user only sees their own data.
- **Responsive design:** Bootstrap layout that adapts to desktop, tablet and
  mobile. The navigation collapses into a hamburger menu below 768px.
- **Light and dark theme:** a toggle in the navbar. The choice is remembered
  between visits.
- Bootstrap components and Font Awesome icons throughout.

## Tech stack

| Part     | Technology                                             |
| -------- | ------------------------------------------------------ |
| Frontend | Angular 20, Bootstrap 5.3, Font Awesome 7              |
| Backend  | .NET 9 Web API with controllers, Entity Framework Core |
| Database | SQLite                                                 |
| Hosting  | Netlify (frontend), Render via Docker (backend)        |

## Project structure

```
frontend/   Angular app (pages, components, services, auth guard and interceptor)
backend/    .NET Web API (controllers, models, DTOs, EF Core migrations, Dockerfile)
netlify.toml  Netlify build settings
```

## Running locally

Requirements: Node.js, the Angular CLI and the .NET 9 SDK.

**Backend** (runs on http://localhost:5220):

```bash
cd backend
dotnet user-secrets set "Jwt:Key" "<a random string of at least 32 characters>"
dotnet run
```

The JWT signing key is kept out of the repository: locally in .NET User Secrets,
and on Render as an environment variable. The database is created, migrated and
seeded automatically on startup.

**Frontend** (runs on http://localhost:4200):

```bash
cd frontend
npm install
ng serve
```

## Note on data

Render's free tier has no persistent disk, so the SQLite database is reset on
every deploy and restart. On startup the API runs its migrations and seeds the
demo account with books and quotes, so the app is never empty. Books, quotes
and accounts you create on the live site may therefore disappear after a while.

## Responsive testing

The layout was tested at desktop, tablet and mobile sizes. The checks were that
the navbar collapses into a mobile menu and that cards, forms and buttons keep
correct spacing and alignment at every size.

- **Browsers:** Vivaldi (Chromium-based), Safari and Firefox, resizing the
  screen with each browser's dev tools
- **Devices:** iPhone, Samsung phones and iPad
