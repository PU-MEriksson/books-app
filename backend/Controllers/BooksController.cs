using Books.Api.Data;
using Books.Api.Dtos;
using Books.Api.Models;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Books.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/books
    [HttpGet]
    public async Task<ActionResult<List<BookResponse>>> GetBooks()
    {
        return await _context.Books
            .Select(b => ToResponse(b))
            .ToListAsync();
    }

    // GET: api/books/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<BookResponse>> GetBook(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        return ToResponse(book);
    }

    // POST: api/books
    [HttpPost]
    public async Task<ActionResult<BookResponse>> CreateBook(BookRequest request)
    {
        var book = new Book
        {
            Title = request.Title,
            Author = request.Author,
            PublicationDate = request.PublicationDate,
        };

        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, ToResponse(book));
    }

    // PUT: api/books/{id}
    public async Task<IActionResult> UpdateBook(int id, BookRequest request)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        book.Title = request.Title;
        book.Author = request.Author;
        book.PublicationDate = request.PublicationDate;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/books/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static BookResponse ToResponse(Book book) => new()
    {
        Id = book.Id,
        Title = book.Title,
        Author = book.Author,
        PublicationDate = book.PublicationDate,
    };
}