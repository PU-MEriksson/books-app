import { Routes } from '@angular/router';
import { BookList } from './pages/book-list/book-list';
import { BookForm } from './pages/book-form/book-form';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'books/new', component: BookForm },
];
