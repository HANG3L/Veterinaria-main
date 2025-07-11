import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiResponse, ApiResponseData } from "../models/api-response";
import { Observable } from "rxjs";
import { Paciente } from "../models/paciente";

const {api} = environment;

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private baseUrl = `${api}/pacientes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponseData<Paciente[]>> {
    return this.http.get<ApiResponseData<Paciente[]>>(this.baseUrl);
  }

  add(paciente: Paciente): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, paciente);
  }

  update(paciente: Paciente): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, paciente);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`);
  }
}
