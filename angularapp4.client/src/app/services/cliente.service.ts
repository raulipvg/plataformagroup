import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ClienteModel {
  id: number;
  nombre: string;
  apellido: string;
  rut: string;
  direccion: string;
  email: string;
  telefono: string;
  pais: string;
} 

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor(private http: HttpClient) { }
  url = 'https://localhost:7273';
  getAll(): Observable<any> {
    return this.http.get(this.url+'/clientes');
  }
  
  getAll2(): Observable<any> {
    return this.http.get(this.url+'/clientes/getclientes2');
  }
}
