import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, ApiResponseData } from '../models/api-response';
import { Raza } from '../models/raza';

const {api} = environment;

@Injectable({ providedIn: 'root' })
export class RazaService {
  private baseUrl = `${api}/razas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponseData<Raza[]>> {
    return this.http.get<ApiResponseData<Raza[]>>(this.baseUrl);
  }

  add(raza: Raza): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, raza);
  }

  update(raza: Raza): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, raza);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`);
  }
}