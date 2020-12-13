import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {

  }


  getTodos(): Observable<any> {
    return this.http.get(baseUrl + '/api/v1/todos')
  }

  getTodo(id): Observable<any> {
    return this.http.get(baseUrl + '/api/v1/todos' + id)
  }

  updateTodo(id, model): Observable<any> {
    return this.http.put(baseUrl + '/api/v1/todos/' + id, model)
  }

  createTodo(model): Observable<any> {
    return this.http.post(baseUrl + '/api/v1/todos', model)
  }

  deleteTodo(id): Observable<any> {
    return this.http.delete(baseUrl + '/api/v1/todos/' + id)
  }

}
