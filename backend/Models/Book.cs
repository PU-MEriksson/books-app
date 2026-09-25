using System.ComponentModel.DataAnnotations;

namespace Books.Api.Models;

public class Book
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Author { get; set; } = string.Empty;

    [Required]
    public DateOnly? PublicationDate { get; set; }

    public int UserId { get; set; }
    public User? User { get; set; }
}
