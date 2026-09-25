import { Component, input, output } from '@angular/core';
import { Book } from '../../models/book';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  book = input.required<Book>();
  delete = output<Book>();
}
