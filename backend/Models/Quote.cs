using System.ComponentModel.DataAnnotations;

namespace Books.Api.Models;

public class Quote
{
    public int Id { get; set; }

    [Required]
    public string Text { get; set; } = string.Empty;

    public string? Author { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }
}