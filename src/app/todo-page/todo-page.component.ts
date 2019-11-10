import { Component, OnInit } from '@angular/core'
import { TodoStoreService } from '../todo-store.service'
import { useReact } from 'src/react/ReactToCE'
import { TodoPage, TodoPageProps } from '../React/TodoPage'

@Component({
    selector: 'app-todo',
    template: useReact(TodoPage, TodoPageComponent)
})
export class TodoPageComponent implements OnInit, TodoPageProps {
    constructor(public todoStore: TodoStoreService) {}
    get todoList() {
        return this.todoStore.todoItems
    }

    ngOnInit() {}
}
