using Books.Api.Data;
using Books.Api.Dtos;
using Books.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Books.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public QuotesController(AppDbContext context)
    {
        _context = context;
    }

    // GET : api/quotes
    [HttpGet]
    public async Task<ActionResult<List<QuoteResponse>>> GetQuotes()
    {
        return await _context.Quotes.Select(q => ToResponse(q)).ToListAsync();
    }

    // GET: api/quotes/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<QuoteResponse>> GetQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);

        if (quote == null)
        {
            return NotFound();
        }

        return ToResponse(quote);
    }

    // POST: api/quotes
    [HttpPost]
    public async Task<ActionResult<QuoteResponse>> CreateQuote(QuoteRequest request)
    {
        var quote = new Quote
        {
            Text = request.Text,
            Author = request.Author,
        };

        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetQuote), new { id = quote.Id }, ToResponse(quote));
    }

    // PUT: api/quotes/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuote(int id, QuoteRequest request)
    {
        var quote = await _context.Quotes.FindAsync(id);

        if (quote == null)
        {
            return NotFound();
        }

        quote.Text = request.Text;
        quote.Author = request.Author;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/quotes/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);

        if (quote == null)
        {
            return NotFound();
        }

        _context.Quotes.Remove(quote);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static QuoteResponse ToResponse(Quote quote) => new()
    {
        Id = quote.Id,
        Text = quote.Text,
        Author = quote.Author
    };
}