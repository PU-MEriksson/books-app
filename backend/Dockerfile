# ---- Stage 1: build ----
# The SDK image (~800 MB) can compile C#. It is only used to produce the
# published output and is thrown away afterwards.
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy only the project file first, then restore. Docker caches each step as a
# layer, so NuGet packages are re-downloaded only when Books.Api.csproj changes
# — not on every C# edit. This is why the copy is split in two.
COPY Books.Api.csproj .
RUN dotnet restore

# Now the rest of the source, and a release build.
COPY . .
RUN dotnet publish -c Release -o /app --no-restore

# ---- Stage 2: runtime ----
# Only the ASP.NET runtime, without the SDK. The deployed image stays small
# because it contains the compiled app and nothing needed to compile it.
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .

# Render injects its own PORT at runtime. This default is what makes the image
# runnable locally with `docker run -p 8080:8080`.
ENV PORT=8080
EXPOSE 8080

# The base image ships ASPNETCORE_HTTP_PORTS=8080, which our --urls overrides at
# startup — producing a noisy warning on every boot. Clearing it keeps the
# Render logs clean so real problems stand out.
ENV ASPNETCORE_HTTP_PORTS=

# A shell is needed so ${PORT} expands at container start rather than being
# passed through as the literal string "$PORT". `exec` then replaces the shell
# with dotnet, so the app runs as PID 1 and receives Render's SIGTERM directly
# and shuts down gracefully. JSON form keeps Docker's linter happy.
ENTRYPOINT ["/bin/sh", "-c", "exec dotnet Books.Api.dll --urls http://0.0.0.0:${PORT}"]
