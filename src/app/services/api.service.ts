import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  readonly loading$: Observable<boolean>;

  constructor(
    private readonly http: HttpClient,
    readonly loading: LoadingService,
  ) {
    this.loading$ = this.loading.loading$;
  }

  get<T>(
    path: string,
    params?: Record<string, string | number>,
  ): Observable<T> {
    return this.http.get<T>(this.url(path), { params });
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(this.url(path), body);
  }

  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(this.url(path), body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.url(path));
  }

  private url(path: string): string {
    return `${this.baseUrl}/${path.replace(/^\/+/, '')}`;
  }
}
