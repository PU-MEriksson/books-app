import { Component, inject, OnInit, signal } from '@angular/core';
import { QuoteService } from '../../services/quote-service';
import { Quote } from '../../models/quote';
import { QuoteCard } from '../../components/quote-card/quote-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quotes-list',
  imports: [QuoteCard, RouterLink],
  templateUrl: './quotes-list.html',
  styleUrl: './quotes-list.css',
})
export class QuotesList implements OnInit {
  private quoteService = inject(QuoteService);
  protected quotes = signal<Quote[]>([]);

  ngOnInit() {
    this.quoteService.getAll().subscribe((quotes) => this.quotes.set(quotes));
  }

  deleteQuote(quote: Quote) {
    // TODO: Add bootstrap component for confirmation
    if (!confirm('Vill du radera citatet?')) {
      return;
    }

    this.quoteService.delete(quote.id).subscribe({
      next: () => this.quotes.update((quotes) => quotes.filter((q) => q.id !== quote.id)),
      error: () => alert('Kunde inte radera citatet. Försök igen'),
    });
  }
}
