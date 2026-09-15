# CLAUDE.md

## Project

Technical take-home assignment for an internship application, two-week deadline.
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
  request (Render free-tier cold start). *This is our own caveat, not something
  the brief asks for.*

## Deployment notes

All three hosts named in the brief (Netlify, Vercel, Azure Static Web Apps) are
**frontend-only** — none of them runs an ASP.NET Core Web API. So the two halves
are hosted separately:

- **Frontend → Netlify.** Base directory `frontend`, build `npm run build`,
  publish `frontend/dist/frontend/browser` (Angular 17+ splits output into
  `browser/`; older tutorials saying `dist/frontend` are wrong for v20).
  Needs an SPA rewrite `/*` → `/index.html` (200), committed as
  `frontend/netlify.toml` rather than clicked into the dashboard.
- **Backend → Render as a Docker service.** Render has **no native .NET
  runtime** (verified against their docs — the six native runtimes are Node/Bun,
  Python, Ruby, Go, Rust, Elixir). A two-stage `backend/Dockerfile` handles it.
  Root directory `backend`.
- `UseHttpsRedirection()` is guarded to non-development only — Render terminates
  TLS at its edge and forwards plain HTTP to the container.
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

# EF Core migration
cd backend
dotnet ef migrations add <Name>
dotnet ef database update
```

The API serves no route at `/` — it's a JSON API, so "is it alive?" means
hitting an endpoint. .NET 9's template ships **no Swagger UI**; `AddOpenApi()`
serves the raw spec at `/openapi/v1.json` in development only.

## Status

_Updated as I go._

- ✅ Angular CLI 20 and `dotnet-ef` installed
- ✅ Git repo initialised at project root (`main`), .NET `.gitignore` added
- ✅ Backend scaffolded: `backend/Books.Api.csproj`, controllers template
- ✅ `UseHttpsRedirection()` moved behind the non-development branch
- ✅ Frontend scaffolded into `frontend/`
- ⬜ Bootstrap + Font Awesome installed and wired into `angular.json`
- ⬜ First commit and push to GitHub
- ⬜ `backend/Dockerfile` + `.dockerignore`
- ⬜ Early deploy: Netlify (frontend) + Render (backend)
- ⬜ CORS configured once the frontend URL exists
- ⬜ Books CRUD → auth → My Quotes → dark mode
