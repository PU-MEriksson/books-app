import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { QuoteService } from '../../services/quote-service';

@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm implements OnInit {
  private quoteService = inject(QuoteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected quoteId = this.route.snapshot.paramMap.get('id');
  protected isEditMode = this.quoteId !== null;

  protected form = this.fb.nonNullable.group({
    text: ['', Validators.required],
    author: [''],
  });

  ngOnInit() {
    if (!this.quoteId) {
      return;
    }

    this.quoteService.getById(Number(this.quoteId)).subscribe({
      next: (quote) => this.form.patchValue({ text: quote.text, author: quote.author ?? '' }),
      error: () => alert('Kunde inte hämta citatet'),
    });
  }

  protected onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { text, author } = this.form.getRawValue();
    const quote = { text, author: author.trim() || null };

    const request: Observable<unknown> = this.isEditMode
      ? this.quoteService.update(Number(this.quoteId), quote)
      : this.quoteService.create(quote);

    request.subscribe({
      next: () => this.router.navigate(['/quotes']),
      error: () => alert('Kunde inte spara citatet. Försök igen'),
    });
  }
}
