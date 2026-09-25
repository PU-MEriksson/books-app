import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { finalize, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected errorMessage = signal<string | null>(null);
  protected loading = signal<boolean>(false);

  protected form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
  });

  protected onSubmit() {
    if (this.form.invalid || this.loading()) {
      return;
    }

    this.errorMessage.set(null);
    this.loading.set(true);
    const credentials = this.form.getRawValue();

    this.authService
      .register(credentials)
      .pipe(
        switchMap(() => this.authService.login(credentials)),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (error: HttpErrorResponse) =>
          this.errorMessage.set(
            error.status === 409
              ? 'Användarnamnet är upptaget. Välj ett annat.'
              : 'Kunde inte skapa kontot. Försök igen om en stund.',
          ),
      });
  }
}
