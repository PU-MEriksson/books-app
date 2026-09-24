import { Component, input } from '@angular/core';
import { Quote } from '../../models/quote';

@Component({
  selector: 'app-quote-card',
  imports: [],
  templateUrl: './quote-card.html',
  styleUrl: './quote-card.css',
})
export class QuoteCard {
  quote = input.required<Quote>();
}
