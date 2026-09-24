import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/quotes`;

  getAll(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.url);
  }

  getById(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${this.url}/${id}`);
  }

  create(quote: Omit<Quote, 'id'>): Observable<Quote> {
    return this.http.post<Quote>(this.url, quote);
  }

  update(id: number, quote: Omit<Quote, 'id'>): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, quote);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
