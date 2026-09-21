using Microsoft.EntityFrameworkCore;

namespace Books.Api.Models;

[Index(nameof(Username), IsUnique = true)]
public class User
{
    public int Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;
}