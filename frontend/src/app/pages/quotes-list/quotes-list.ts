import { Component, inject, OnInit, signal } from '@angular/core';
import { QuoteService } from '../../services/quote-service';
import { Quote } from '../../models/quote';
import { QuoteCard } from '../../components/quote-card/quote-card';
import { EmptyState } from '../../components/empty-state/empty-state';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-quotes-list',
  imports: [QuoteCard, RouterLink, EmptyState],
  templateUrl: './quotes-list.html',
  styleUrl: './quotes-list.css',
})
export class QuotesList implements OnInit {
  private quoteService = inject(QuoteService);
  protected quotes = signal<Quote[]>([]);
  protected loading = signal(true);
  protected loadError = signal(false);

  ngOnInit() {
    this.quoteService
      .getAll()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (quotes) => this.quotes.set(quotes),
        error: () => this.loadError.set(true),
      });
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
