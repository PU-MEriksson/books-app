import { Component, input, output } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  book = input.required<Book>();
  delete = output<Book>();
}
