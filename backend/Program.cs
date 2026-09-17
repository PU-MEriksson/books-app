using Books.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    policy.WithOrigins(
        "http://localhost:4200",
        "https://friendly-centaur-f6b57a.netlify.app"
    ).AllowAnyHeader()
    .AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    DbSeeder.Seed(db);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Deliberately no UseHttpsRedirection(): Render terminates TLS at its edge and
// already redirects all HTTP traffic to HTTPS. Inside the container every
// request arrives as plain HTTP, so the middleware would redirect to HTTPS,
// come back through the proxy as HTTP again, and loop forever.

app.UseCors("Frontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
