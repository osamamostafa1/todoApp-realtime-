import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';
import { io } from 'socket.io-client'
import { baseUrl } from '../../environments/environment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  toDoList: Todo[] = []
  constructor(private todoService: TodoService) {

  }

  ngOnInit() {
    const socket = io(baseUrl)
    socket.on('changeData', (data) => {
      this.getTodos()
    })
    this.getTodos()
  }

  getTodos() {
    this.todoService.getTodos().subscribe((res: any) => {
      this.toDoList = res.data
    })
  }

  addTodo(todo) {
    const model = {
      description: todo
    }
    this.todoService.createTodo(model).subscribe((res: any) => { })

  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id).subscribe((res: any) => { })
  }

}
