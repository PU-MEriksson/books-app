import { Component, input, output } from '@angular/core';
import { Quote } from '../../models/quote';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quote-card',
  imports: [RouterLink],
  templateUrl: './quote-card.html',
  styleUrl: './quote-card.css',
})
export class QuoteCard {
  quote = input.required<Quote>();
  delete = output<Quote>();
}
