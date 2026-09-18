# CLAUDE.md

## Project

Technical take-home assignment with a two-week deadline.
A responsive CRUD web application with a Books view and a "My Quotes" view, JWT
authentication, built with Angular 20 (frontend) and .NET 9 C# Web API (backend).

The assignment brief is written in Swedish. The requirements below are a faithful
translation — where this file and the brief disagree, **the brief wins**.

## My background (important for how you help me)

I'm a recently graduated web developer with hands-on experience mainly in
Vue.js/Nuxt, React, and TypeScript. I have **no prior experience with Angular**,
and only limited C#/.NET experience (some basic C# about 1.5 years ago).

This means:

- Explain **why**, not just **what** — especially for Angular- and .NET-specific
  patterns that differ from Vue/React (e.g. dependency injection,
  modules/standalone components, RxJS/Observables, EF Core migrations).
- Suggest established, conventional solutions rather than advanced shortcuts or
  unusual patterns.
- If something is standard Angular/.NET practice I probably don't already know,
  say so explicitly rather than assuming I do.
- **Explain as to a beginner, and go one small step at a time.** My knowledge is
  broad but shallow (many frameworks during my education), so define terms the
  first time they come up and don't assume earlier frameworks (e.g. Laravel)
  are remembered. Give the next step, let me do it and test it, then move on —
  no long multi-step roadmaps. This worked very well for the backend CRUD.

## Tech stack

- **Frontend:** Angular 20, Bootstrap, Font Awesome (all three required by the brief)
- **Backend:** .NET 9 C# Web API with controllers, Entity Framework Core
- **Database:** SQLite — **my own choice**. The brief specifies no database at
  all, so this needs no justification in the README.
- **Auth:** JWT (registration, login, token storage in frontend, token
  validation in backend)
- **Deployment:** Angular on Netlify, .NET API on Render (Docker), CORS on the
  API restricted to the frontend's domain. See [Deployment notes](#deployment-notes).

## Requirements (from the brief)

### 1. Books CRUD

- The **home page is the book list** — it shows all books and has an "Add new
  book" button. It is not a separate landing page.
- "Add new book" redirects to a form for a new book (suggested fields: **title,
  author, publication date**).
- After submitting, redirect back to the home page with the new book visible in
  the list.
- Every book in the list has an **Edit** button leading to a form with that
  book's details; after submitting, redirect back to the home page with the
  updated details visible.
- Every book in the list has a **Delete** button; after deleting, the book is
  gone from the list.

### 2. Token handling (JWT)

- A simple **login page** taking username and password.
- **Registration** of a new user, which can then be used to log in.
- On successful login the **backend generates a token** and returns it to the
  frontend.
- The frontend **stores the token** and sends it with subsequent API requests.
  The brief explicitly sanctions **localStorage or a cookie** — no need to
  agonise over this choice.
- The backend **validates the token** so that only authenticated users can reach
  the CRUD operations (`[Authorize]`).

### 3. My Quotes

- A **separate view** called "My Quotes" / "Mina citat".
- Displays a list of **5 quotes I like**.
- Add, delete and edit quotes.
- A **menu to navigate between the books view and the quotes view**.

### 4. Responsive design — testing is itself a requirement

The brief spells out a test procedure, not just an outcome. Worth a README
section documenting that it was actually carried out:

- Layout and components adapt to desktop, tablet and mobile.
- Test by **resizing the browser window** and verifying elements adjust.
- Navigation menu **collapses into a mobile menu** on smaller screens.
- Form fields, buttons and other UI elements keep correct **spacing and
  alignment** across viewports.
- Test on **different devices and browsers** for consistent behaviour.

### 5. Bootstrap and Font Awesome

- Bootstrap for a responsive, visually appealing layout.
- Bootstrap classes for buttons, forms and other UI components.
- Font Awesome icons used throughout, verified to render correctly.

### 6. Extra challenge

- A button toggling between **light and dark** UI themes.

### 7. Submission

- Publish the application on a **free hosting service**. The brief's examples
  are "t.ex. Netlify, Vercel eller Azure Static Web Apps" — **"t.ex." means
  these are illustrative, not a closed list**.
- Submit the **published link** plus **GitHub link(s)** to the repository.
- Note in the submission that the API may take ~1 minute to respond on the first
  request (Render free-tier cold start). _This is our own caveat, not something
  the brief asks for._

## Live URLs

- **Frontend:** https://friendly-centaur-f6b57a.netlify.app
- **Backend:** https://books-api-a36f.onrender.com
- **Repo:** https://github.com/PU-MEriksson/books-app

⚠️ **Always verify the published link in a private/incognito window.** Netlify's
new projects default to **Private** visitor access, which served an
`app.netlify.com/edge-access` login page with HTTP 401 to everyone except the
logged-in owner — invisible from a normal browser, and nothing in the deploy
logs flags it. Fixed via _Project configuration → General → Visitor access →
Project visibility → Public_. Re-check this after any Netlify settings change.

## Deployment notes

All three hosts named in the brief (Netlify, Vercel, Azure Static Web Apps) are
**frontend-only** — none of them runs an ASP.NET Core Web API. So the two halves
are hosted separately:

- **Frontend → Netlify**, configured by a committed `netlify.toml` at the **repo
  root** (not inside `frontend/`). Base `frontend`, command `npm run build`,
  publish `dist/frontend/browser`.
  ⚠️ **Every path in `netlify.toml` is relative to `base`**, so the publish path
  is `dist/frontend/browser`, _not_ `frontend/dist/frontend/browser`. Angular
  17+ splits output into `browser/`; tutorials saying `dist/frontend` are wrong
  for v20. Needs an SPA rewrite `/*` → `/index.html` status 200.
- **Backend → Render as a Docker service.** Render has **no native .NET
  runtime** (verified against their docs). A two-stage `backend/Dockerfile` handles it.
  Root directory `backend`.
- ⚠️ **`UseHttpsRedirection()` is deliberately removed, not just guarded.**
  Render terminates TLS at its edge and already redirects all HTTP to HTTPS, so
  every request reaches the container as plain HTTP. Kestrel would see a
  non-HTTPS request, redirect to HTTPS, get it back through the proxy as HTTP,
  and **loop forever** — Microsoft documents this exact failure for any
  non-IIS reverse proxy. Don't re-add it. (The alternative, if the app ever
  needs to know the real scheme, is `UseForwardedHeaders` with
  `X-Forwarded-Proto` configured _before_ other middleware.)
- ⚠️ **Render free tier has no persistent disk**, so the SQLite file resets on
  every deploy and cold start. Mitigation: run `db.Database.Migrate()` on startup
  and **seed** books and the 5 quotes when the tables are empty, so a reviewer
  never lands on an empty app. Mention this in the README.
- ⚠️ The **JWT signing key must never be committed**. Locally: .NET User Secrets.
  On Render: an environment variable.

## Working approach

- Explain how things are done. You can show me code but don't build anything
  unless I ask you to.
- We work on the project in the planned order (backend CRUD before frontend, the
  full Books flow before auth is added, auth before the Quotes page) — not
  everything in parallel.
- If a suggestion diverges significantly from how the assignment is worded, flag
  it before proceeding.
- Don't treat this file as the source of truth over the brief itself — if a
  requirement matters, check the brief's wording.

## Commands

```bash
# Frontend (Angular)
cd frontend
ng serve
ng build                  # output: dist/frontend/browser

# Backend (.NET)
cd backend
dotnet run                # http://localhost:5220
dotnet build

# EF Core migration (the env var prefix is required on this Mac — see below)
cd backend
DOTNET_ROLL_FORWARD=LatestMajor dotnet ef migrations add <Name>
DOTNET_ROLL_FORWARD=LatestMajor dotnet ef database update
```

⚠️ **`dotnet ef` needs `DOTNET_ROLL_FORWARD=LatestMajor` on this Mac.** Several
old .NET runtimes (6.0.26, 7.0.15, 8.0.0, 8.0.2) in `/usr/local/share/dotnet`
are **Intel x64 builds** on an Apple Silicon machine. `dotnet-ef` targets
net8.0, so without the prefix it picks the broken 8.0.2 and crashes with
`incompatible architecture`. The app itself runs on 9.0.1 (arm64) and is
unaffected. Permanent fix (not done yet): remove the x64 runtimes/SDKs.
`dotnet-ef` is pinned to **9.0.20** to match the EF Core packages — `dotnet
tool update` can't downgrade, so change versions with uninstall + install.
The "tools directory is not on PATH" warning is a false alarm: PATH has it as
`~/.dotnet/tools` and the check doesn't recognise the tilde form.

**Testing the API:** `backend/Books.Api.http` with the VS Code **REST Client**
extension. The variable is `@baseUrl` — the template's `Books.Api_HostAddress`
was renamed because REST Client treats a dot as a request-variable reference
("Books is not found").

**Local database:** `backend/books.db` (git- and docker-ignored). Safe to
delete — `Migrate()` + the seeder recreate it on the next `dotnet run`.

The API serves no route at `/` — it's a JSON API, so "is it alive?" means
hitting an endpoint. .NET 9's template ships **no Swagger UI**; `AddOpenApi()`
serves the raw spec at `/openapi/v1.json` in development only.

## Status

_Updated as I go._

- ✅ Angular CLI 20 and `dotnet-ef` installed
- ✅ Git repo initialised at project root (`main`), .NET `.gitignore` added
- ✅ Backend scaffolded: `backend/Books.Api.csproj`, controllers template
- ✅ `UseHttpsRedirection()` removed entirely (see Deployment notes — guarding it
  to production would have caused a redirect loop on Render)
- ✅ Frontend scaffolded into `frontend/` — **Angular 20.3**, verified
  (`zone.js` present, Karma/Jasmine). The first attempt produced Angular 21
  because the global CLI pin didn't take; re-scaffolded from CLI 20.3.37.
  **Check `ng version` says 20.x before trusting any future scaffold.**
- ✅ Bootstrap 5.3 + Font Awesome 7.3 installed and wired into `angular.json`
  (`styles` + `scripts`); initial bundle budget raised to 1 MB warning / 2 MB
  error to accommodate them — 648 kB raw, 132 kB transferred
- ✅ `rootDir: "./src"` added to `tsconfig.app.json` / `tsconfig.spec.json` for
  forward-compatibility with TypeScript 6 (an editor-level warning; the CLI
  never emitted it)
- ✅ `ng build` verified clean; output confirmed at `dist/frontend/browser`
- ✅ Pushed to GitHub, including the Angular 20 re-scaffold (`f165dac`)
- ✅ `backend/Dockerfile` + `.dockerignore` — two-stage build, verified locally:
  image builds, `PORT` override honoured, `/weatherforecast` returns 200,
  SIGTERM shuts down gracefully, startup logs clean. Local test command:
  `docker build -t books-api ./backend && docker run --rm -e PORT=10000 -p 8081:10000 books-api`
  (host port 8080 is occupied on this Mac — use 8081)
- ✅ `netlify.toml` committed at repo root (base `frontend`, publish
  `dist/frontend/browser`, SPA rewrite)
- ✅ **Early deploy done and verified anonymously:** frontend 200, deep link
  `/books/edit/42` → 200 serving `<app-root>` (SPA rewrite works), backend
  `/weatherforecast` → 200. Deployed asset hashes match the local build.
- ✅ **Auto-deploy confirmed on both hosts** — pushing to `main` redeploys
  Netlify and Render (Render's Docker build takes several minutes).

### Backend Books CRUD — ✅ done (2026-09-16), tested locally and live

- ✅ EF Core **9.0.20** packages: `Microsoft.EntityFrameworkCore.Sqlite` +
  `.Design` (pinned to 9.x to match .NET 9)
- ✅ `Models/Book.cs` — `Id`, `Title`, `Author`, `PublicationDate`.
  `[Required]` on all three; `PublicationDate` is **`DateOnly?`** so a missing
  date is rejected instead of silently becoming `0001-01-01`. Nullable
  reference types alone did **not** reject a missing/empty title — the explicit
  `[Required]` is what does. JSON dates are `"yyyy-MM-dd"` (fits
  `<input type="date">`).
- ✅ `Data/AppDbContext.cs` (`DbSet<Book> Books => Set<Book>()`), registered in
  `Program.cs` via `AddDbContext` + `UseSqlite`; connection string
  `DefaultConnection` = `Data Source=books.db` in `appsettings.json`
- ✅ Migration `InitialCreate`
- ✅ `Controllers/BooksController.cs` at **`/api/books`**:
  - `GET /api/books` → 200 list
  - `GET /api/books/{id}` → 200 / 404
  - `POST /api/books` → 201 Created (+ `Location`) / 400 on validation
  - `PUT /api/books/{id}` → 204 / 404 / 400 — body needs no `id`; the URL id
    decides, values are copied onto the tracked entity
  - `DELETE /api/books/{id}` → 204 / 404
- ✅ **Startup migration + seeding** in `Program.cs`: a manual scope runs
  `db.Database.Migrate()` then `DbSeeder.Seed(db)` (`Data/DbSeeder.cs`, 5 books,
  only when the table is empty). Solves Render's non-persistent disk.
  Verified live: https://books-api-a36f.onrender.com/api/books returns the 5
  seeded books.
- `WeatherForecastController` + `WeatherForecast.cs` are still the template
  leftovers — remove when convenient.
- `[Authorize]` intentionally **not** added yet (comes with the auth step).

### Frontend Books CRUD — ✅ done (2026-09-18), `ng build` clean

- ✅ API base URL in Angular environment config (local `http://localhost:5220`
  vs Render URL)
- ✅ **CORS on the API** — needed before Angular can call it, both from
  `http://localhost:4200` locally and from the Netlify origin
- ✅ Set a real `<title>` — was the scaffold default "Frontend"
- ✅ List books on home page (`pages/book-list` + `components/book-card`)
- ✅ Delete, with `confirm()` and an `alert()` on failure
- ✅ Create **and** update — **one** `pages/book-form` component serves both
- ✅ `BookService` complete: `getAll`, `getById`, `create`, `update`, `delete`

**How the shared create/edit form works** (the non-obvious parts):

- Two routes, one component: `books/new` and `books/edit/:id` both map to
  `BookForm`. Mode is decided by
  `route.snapshot.paramMap.get('id')` — `null` means create. `snapshot` is safe
  **only because** navigation always goes via the list, so the component is
  destroyed and rebuilt between books. Going `/books/edit/1` → `/books/edit/2`
  directly would reuse the instance and leave the snapshot stale; that would
  need the `route.paramMap` observable instead.
- **Reactive forms**, not template-driven — required by
  `frontend/.claude/CLAUDE.md`. `fb.nonNullable.group()` so values are typed
  `string` rather than `string | null` and `reset()` returns to `''`.
- `patchValue(book)`, **not** `setValue` — `Book` has an `id`, the form has no
  `id` control, and `setValue` throws on any mismatch.
- `onSubmit` picks `update(...)` or `create(...)` into an
  `Observable<unknown>` variable and subscribes **once**, so success/error
  handling isn't duplicated. The annotation avoids TS reconciling
  `Observable<void>` with `Observable<Book>`.
- `DateOnly` on the API → `"yyyy-MM-dd"` → exactly what `<input type="date">`
  wants. **No date conversion anywhere** — don't introduce one.
- Cancel is an `<a routerLink="/">`, not a button: navigating destroys the
  component, so there is nothing to reset.

⚠️ **Angular gotchas hit today — worth not re-learning:**

- `imports: []` in `@Component` is for **template dependencies only**
  (components/directives/pipes). Putting the `Router` **service** there is
  error `NG2012` and the component stops compiling entirely. Services come via
  `inject()` and belong in no array. Rule: *in the HTML → `imports`; injected in
  the class → not.*
- `(ngSubmit)` goes on the `<form>`; a `<button type="submit">` triggers it
  natively. Adding `(click)="onSubmit()"` as well would POST **twice**.
- `[disabled]="form.invalid"` — without the brackets it sets the literal string
  `"form.invalid"`, and the button is disabled forever.
- Dynamic links need the array form: `[routerLink]="['/books/edit', book().id]"`.
- Field initialisers run **top to bottom**, so `inject()`ed fields must be
  declared above any field that uses them.
- ⚠️ When something silently doesn't work, **read the `ng serve` output first** —
  NG2012 was a hard build error sitting in the terminal the whole time.

**Styling note:** `.form-control` hardcodes
`background-color: var(--bs-body-bg)` — Bootstrap gives it **no** component
variable like `.card`'s `--bs-card-bg`, so the palette override in `styles.css`
has to set the property itself, and must repeat it for `.form-control:focus`
(Bootstrap re-declares it there). Same story for the focus ring: form controls
ignore `--bs-focus-ring-color` and hardcode Bootstrap blue.

### Next up: authentication (starting Monday 2026-09-22)

The unfamiliar part of the assignment — previous auth experience is Supabase
only, so JWT issuing/validation by hand is all new. Take it slowly, one step at
a time, and define the terms (claims, signing key, bearer token, hashing).

Rough order: backend `User` model + registration/login endpoints → JWT issuing
→ `[Authorize]` on `BooksController` → Angular login/register pages → token
storage → an HTTP interceptor attaching the token → route guards.

### Backend hardening — known gaps, deliberately deferred

- ⬜ **`POST /api/books` binds straight to the `Book` entity, `Id` included**, so
  a client can choose the id (EF Core honours an explicit key) and a repeat id
  gives a 500 instead of a 400. Fix with a **DTO** — a request class holding only
  `Title`, `Author`, `PublicationDate`. Becomes non-optional at the auth step:
  returning the `User` entity would leak the password hash.
- ⬜ **No length limits** — `[StringLength(200)]` on `Title` and `Author`.
- ✅ Already safe: EF Core parameterises all SQL; `[ApiController]` auto-returns
  400 from the `[Required]` attributes before the action runs; Angular escapes
  interpolation, so `<script>` in a title is inert.
- Note: `[Required]` **trims**, so `"   "` is rejected server-side — but
  Angular's `Validators.required` does **not**, so a spaces-only title passes the
  client and comes back a 400.

### Remaining after auth

- ⬜ Show only the publication **year** on the book cards
- ⬜ Improve styling — incl. per-field validation messages
  (`is-invalid` + `.invalid-feedback`, shown on `invalid && touched`); a
  disabled submit button alone doesn't say *which* field is missing
- ⬜ Replace `confirm()`/`alert()` with Bootstrap modals and toasts
- ⬜ My Quotes (seed the 5 quotes in `DbSeeder`)
- ⬜ Dark-mode toggle (palette already themed via `[data-bs-theme]`)
- ⬜ Responsive testing pass + README section documenting it
- ⬜ Remove the `WeatherForecast` template leftovers
