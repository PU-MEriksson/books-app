using Books.Api.Models;
using Microsoft.AspNetCore.Identity;

namespace Books.Api.Data;

public static class DbSeeder
{
    public const string DemoUsername = "demo";
    public const string DemoPassword = "demo123";

    public static void Seed(AppDbContext db)
    {
        if (db.Users.Any(u => u.Username == DemoUsername))
        {
            return;
        }

        var demoUser = new User { Username = DemoUsername };
        demoUser.PasswordHash = new PasswordHasher<User>().HashPassword(demoUser, DemoPassword);

        db.Users.Add(demoUser);

        db.Books.AddRange(
            new Book { Title = "Pippi Långstrump", Author = "Astrid Lindgren", PublicationDate = new DateOnly(1945, 11, 26), User = demoUser },
            new Book { Title = "Bilbo – En hobbits äventyr", Author = "J.R.R. Tolkien", PublicationDate = new DateOnly(1937, 9, 21), User = demoUser },
            new Book { Title = "Stolthet och fördom", Author = "Jane Austen", PublicationDate = new DateOnly(1813, 1, 28), User = demoUser },
            new Book { Title = "1984", Author = "George Orwell", PublicationDate = new DateOnly(1949, 6, 8), User = demoUser },
            new Book { Title = "Dödssynden", Author = "Harper Lee", PublicationDate = new DateOnly(1960, 7, 11), User = demoUser },
            new Book { Title = "Harry Potter och de vises sten", Author = "J.K. Rowling", PublicationDate = new DateOnly(1997, 6, 26), User = demoUser }
        );

        db.Quotes.AddRange(
            new Quote { Text = "Det har jag aldrig provat tidigare, så det klarar jag helt säkert!", Author = "Astrid Lindgren", User = demoUser },
            new Quote { Text = "Det finns saker som man måste göra, även om det är farligt. Annars är man ingen människa utan bara en liten lort.", Author = "Astrid Lindgren", User = demoUser },
            new Quote { Text = "Ja visst gör det ont när knoppar brister.", Author = "Karin Boye", User = demoUser },
            new Quote { Text = "All we have to decide is what to do with the time that is given us.", Author = "J.R.R. Tolkien", User = demoUser },
            new Quote { Text = "You never really understand a person until you consider things from his point of view.", Author = "Harper Lee", User = demoUser }
        );

        db.SaveChanges();
    }
}
