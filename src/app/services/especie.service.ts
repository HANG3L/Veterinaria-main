import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especie } from '../models/especie';
import { environment } from 'src/environments/environment';
import { ApiResponse, ApiResponseData } from '../models/api-response';

const {api} = environment;

@Injectable({ providedIn: 'root' })
export class EspecieService {
  private baseUrl = `${api}/especies`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponseData<Especie[]>> {
    return this.http.get<ApiResponseData<Especie[]>>(this.baseUrl);
  }

  add(especie: Especie): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, especie);
  }

  update(especie: Especie): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, especie);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`);
  }
}

