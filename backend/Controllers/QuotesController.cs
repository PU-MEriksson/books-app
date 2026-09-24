using System.Diagnostics.Contracts;
using Books.Api.Data;
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
    public async Task<ActionResult<List<Quote>>> GetQuotes()
    {
        return await _context.Quotes.ToListAsync();
    }

    // GET: api/quotes/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Quote>> GetQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);

        if (quote == null)
        {
            return NotFound();
        }

        return quote;
    }

    // POST: api/quotes
    [HttpPost]
    public async Task<ActionResult<Quote>> CreateQuote(Quote quote)
    {
        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetQuote), new { id = quote.Id }, quote);
    }

    // PUT: api/quotes/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuote(int id, Quote updatedQuote)
    {
        var quote = await _context.Quotes.FindAsync(id);

        if (quote == null)
        {
            return NotFound();
        }

        quote.Text = updatedQuote.Text;
        quote.Author = updatedQuote.Author;

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
}