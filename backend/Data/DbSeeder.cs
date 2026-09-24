using Books.Api.Models;

namespace Books.Api.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (!db.Books.Any())
        {
            db.Books.AddRange(
                new Book { Title = "Pippi Longstocking", Author = "Astrid Lindgren", PublicationDate = new DateOnly(1945, 11, 26) },
                new Book { Title = "The Hobbit", Author = "J.R.R. Tolkien", PublicationDate = new DateOnly(1937, 9, 21) },
                new Book { Title = "Pride and Prejudice", Author = "Jane Austen", PublicationDate = new DateOnly(1813, 1, 28) },
                new Book { Title = "Nineteen Eighty-Four", Author = "George Orwell", PublicationDate = new DateOnly(1949, 6, 8) },
                new Book { Title = "To Kill a Mockingbird", Author = "Harper Lee", PublicationDate = new DateOnly(1960, 7, 11) }
            );
        }

        if (!db.Quotes.Any())
        {
            db.Quotes.AddRange(
                new Quote { Text = "All we have to decide is what to do with the time that is given us.", Author = "J.R.R. Tolkien" },
                new Quote { Text = "There is nothing like looking, if you want to find something.", Author = "J.R.R. Tolkien" },
                new Quote { Text = "There is no charm equal to tenderness of heart.", Author = "Jane Austen" },
                new Quote { Text = "Who controls the past controls the future: who controls the present controls the past.", Author = "George Orwell" },
                new Quote { Text = "You never really understand a person until you consider things from his point of view.", Author = "Harper Lee" }
            );
        }

        db.SaveChanges();
    }
}
