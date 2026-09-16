using Books.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Deliberately no UseHttpsRedirection(): Render terminates TLS at its edge and
// already redirects all HTTP traffic to HTTPS. Inside the container every
// request arrives as plain HTTP, so the middleware would redirect to HTTPS,
// come back through the proxy as HTTP again, and loop forever.

app.UseAuthorization();

app.MapControllers();

app.Run();
