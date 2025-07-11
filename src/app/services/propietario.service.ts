import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiResponse, ApiResponseData } from "../models/api-response";
import { Propietario } from "../models/propietario";
import { Observable } from "rxjs";

const {api} = environment;

@Injectable({ providedIn: 'root' })
export class PropietarioService {
  private baseUrl = `${api}/propietarios`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponseData<Propietario[]>> {
    return this.http.get<ApiResponseData<Propietario[]>>(this.baseUrl);
  }

  add(propietario: Propietario): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl, propietario);
  }

  update(propietario: Propietario): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}`, propietario);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}/${id}`);
  }
}
