import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book } from '../models/book';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/books`;

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }

  create(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.url, book);
  }

  // update

  // delete
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
