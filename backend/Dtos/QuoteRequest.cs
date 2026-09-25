using System.ComponentModel.DataAnnotations;

namespace Books.Api.Dtos;

public class QuoteRequest
{
    [Required, StringLength(400)]
    public string Text { get; set; } = string.Empty;

    [StringLength(200)]
    public string? Author { get; set; }
}