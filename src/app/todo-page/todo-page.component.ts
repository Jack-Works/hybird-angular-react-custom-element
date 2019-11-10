import { Component, OnInit } from '@angular/core'
import { TodoStoreService } from '../todo-store.service'
import { useReact } from 'src/react/ReactToCE'
import { TodoPage, TodoPageProps } from '../React/TodoPage'

@Component({
    selector: 'app-todo',
    template: useReact(TodoPage, TodoPageComponent)
})
export class TodoPageComponent implements TodoPageProps {
    constructor(public todoService: TodoStoreService) {}
    get todoList() {
        return this.todoService.todoItems
    }
    onToggle(index: number) {
        this.todoService.toggleTodoItem(index)
    }
}
