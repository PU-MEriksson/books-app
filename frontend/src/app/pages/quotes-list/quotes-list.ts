import { Component, inject, OnInit, signal } from '@angular/core';
import { QuoteService } from '../../services/quote-service';
import { Quote } from '../../models/quote';
import { QuoteCard } from '../../components/quote-card/quote-card';

@Component({
  selector: 'app-quotes-list',
  imports: [QuoteCard],
  templateUrl: './quotes-list.html',
  styleUrl: './quotes-list.css',
})
export class QuotesList implements OnInit {
  private quoteService = inject(QuoteService);
  protected quotes = signal<Quote[]>([]);

  ngOnInit() {
    this.quoteService.getAll().subscribe((quotes) => this.quotes.set(quotes));
  }
}
