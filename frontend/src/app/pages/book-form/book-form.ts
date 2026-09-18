import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm implements OnInit {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected bookId = this.route.snapshot.paramMap.get('id');
  protected isEditMode = this.bookId !== null;

  protected form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    publicationDate: ['', Validators.required],
  });

  ngOnInit() {
    if (!this.bookId) {
      return;
    }

    this.bookService.getById(Number(this.bookId)).subscribe({
      next: (book) => this.form.patchValue(book),
      error: () => alert('Kunde inte hämta boken'),
    });
  }

  protected onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const book = this.form.getRawValue();

    const request: Observable<unknown> = this.bookId
      ? this.bookService.update(Number(this.bookId), book)
      : this.bookService.create(book);

    request.subscribe({
      next: () => this.router.navigate(['/']),
      error: () => alert('Kunde inte spara boken. Försök igen.'),
    });
  }
}
