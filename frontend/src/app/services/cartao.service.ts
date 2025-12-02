import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartaoVirtual {
  id: number;
  nome_cartao: string;
  limite: number;
  ativo: boolean;
  criado_em?: string;
  atualizado_em?: string;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CartaoVirtual[];
}

@Injectable({
  providedIn: 'root'
})
export class CartaoService {
  private apiUrl = 'http://localhost:8000/api/cartoes/';

  constructor(private http: HttpClient) {}

  listar(): Observable<CartaoVirtual[]> {
    return this.http.get<PaginatedResponse>(this.apiUrl).pipe(
      map(response => response.results)
    );
  }

  buscarPorId(id: number): Observable<CartaoVirtual> {
    return this.http.get<CartaoVirtual>(`${this.apiUrl}${id}/`);
  }

  criar(cartao: Omit<CartaoVirtual, 'id'>): Observable<CartaoVirtual> {
    return this.http.post<CartaoVirtual>(this.apiUrl, cartao);
  }

  atualizar(id: number, cartao: Partial<CartaoVirtual>): Observable<CartaoVirtual> {
    return this.http.put<CartaoVirtual>(`${this.apiUrl}${id}/`, cartao);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
