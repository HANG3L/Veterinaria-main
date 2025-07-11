import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiResponse, ApiResponseData } from "../models/api-response";
import { Observable } from "rxjs";
import { Consulta } from "../models/consulta";

const {api} = environment;

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private baseUrl = `${api}/consultas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponseData<Consulta[]>> {
    return this.http.get<ApiResponseData<Consulta[]>>(this.baseUrl);
  }

  add(especie: Consulta): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, especie);
  }

  update(especie: Consulta): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, especie);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`);
  }
}
