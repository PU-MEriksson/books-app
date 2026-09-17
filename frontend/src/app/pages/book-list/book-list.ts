import { Component, OnInit, inject, signal } from '@angular/core';
import { BookService } from '../../services/book-service';
import { Book } from '../../models/book';
import { BookCard } from '../../components/book-card/book-card';

@Component({
  selector: 'app-book-list',
  imports: [BookCard],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit {
  private bookService = inject(BookService);
  protected books = signal<Book[]>([]);

  ngOnInit() {
    this.bookService.getAll().subscribe((books) => this.books.set(books));
  }
}
