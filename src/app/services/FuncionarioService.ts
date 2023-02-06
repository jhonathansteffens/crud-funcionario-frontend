import { Funcionario } from 'src/app/models/Funcionario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FuncionarioService {
  elementApiUrl = 'http://localhost:8080/funcionario'
  constructor(private http: HttpClient) { }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.elementApiUrl);
  }

  createFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.elementApiUrl, funcionario);
  }

  editFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(this.elementApiUrl, funcionario);
  }

  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}/${id}`)
  }
}
