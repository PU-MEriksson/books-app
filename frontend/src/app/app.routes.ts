import { Routes } from '@angular/router';
import { BookList } from './pages/book-list/book-list';
import { BookForm } from './pages/book-form/book-form';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { QuotesList } from './pages/quotes-list/quotes-list';
import { authGuard } from './guards/auth-guard';
import { QuoteForm } from './pages/quote-form/quote-form';

export const routes: Routes = [
  { path: '', component: BookList, canActivate: [authGuard] },
  { path: 'quotes', component: QuotesList, canActivate: [authGuard] },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'books/new', component: BookForm, canActivate: [authGuard] },
  { path: 'books/edit/:id', component: BookForm, canActivate: [authGuard] },
  { path: 'quotes/new', component: QuoteForm, canActivate: [authGuard] },
];
