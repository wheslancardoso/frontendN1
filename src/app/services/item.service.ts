import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../model/item.model'; // Importar nosso modelo Item

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:8080/api/v1/items'; // URL base da nossa API backend

  // Opções para cabeçalhos HTTP, se necessário (ex: para POST, PUT)
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { } // Injetar o HttpClient

  // Método para buscar todos os itens
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // Método para buscar um item por ID
  getItemById(id: number): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  // Método para criar um novo item
  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item, this.httpOptions);
  }

  // Método para atualizar um item existente
  updateItem(id: number, item: Item): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Item>(url, item, this.httpOptions);
  }

  // Método para deletar um item
  deleteItem(id: number): Observable<void> { // Retorna Observable<void> para DELETE sem corpo na resposta
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }
}
