import { Routes } from '@angular/router';
import { BookList } from './pages/book-list/book-list';
import { BookForm } from './pages/book-form/book-form';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'login', component: Login },
  { path: 'books/new', component: BookForm },
  { path: 'books/edit/:id', component: BookForm },
];
