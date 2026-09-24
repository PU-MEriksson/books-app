import { Component, OnInit, inject, signal } from '@angular/core';
import { BookService } from '../../services/book-service';
import { Book } from '../../models/book';
import { BookCard } from '../../components/book-card/book-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [BookCard, RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit {
  private bookService = inject(BookService);
  protected books = signal<Book[]>([]);

  ngOnInit() {
    this.bookService.getAll().subscribe((books) => this.books.set(books));
  }

  deleteBook(book: Book) {
    // TODO: Add bootstrap component for confirmation
    if (!confirm(`Vill du radera "${book.title}"?`)) {
      return;
    }

    // TODO: Add toast on success and a good looking error message
    this.bookService.delete(book.id).subscribe({
      next: () => this.books.update((books) => books.filter((b) => b.id !== book.id)),
      error: () => alert('Kunde inte radera boken. Försök igen.'),
    });
  }
}
