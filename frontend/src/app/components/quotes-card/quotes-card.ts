import { Component, input } from '@angular/core';
import { Quote } from '../../models/quote';

@Component({
  selector: 'app-quotes-card',
  imports: [],
  templateUrl: './quotes-card.html',
  styleUrl: './quotes-card.css',
})
export class QuotesCard {
  quote = input.required<Quote>();
}
