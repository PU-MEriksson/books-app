import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {
  private bookService = inject(BookService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    publicationDate: ['', Validators.required],
  });

  protected onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.bookService.create(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => alert('Kunde inte spara boken. Försök igen.'),
    });
  }
}
