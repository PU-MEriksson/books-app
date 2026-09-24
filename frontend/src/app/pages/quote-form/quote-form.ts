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
export class QuoteForm {
  private quoteService = inject(QuoteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected form = this.fb.nonNullable.group({
    text: ['', Validators.required],
    author: [''],
  });

  protected onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const quote = this.form.getRawValue();

    const request: Observable<unknown> = this.quoteService.create(quote);

    request.subscribe({
      next: () => this.router.navigate(['/quotes']),
      error: () => alert('Kunde inte spara citatet. Försök igen'),
    });
  }
}
