import { Injectable } from '@angular/core'

export interface TodoItem {
    title: string
    completed: boolean
}

@Injectable({
    providedIn: 'root'
})
export class TodoStoreService {
    public todoItems: readonly TodoItem[] = [{ completed: false, title: 'Hello' }]
    toggleTodoItem(index: number) {
        const x = this.todoItems[index]
        if (x) x.completed = !x.completed
    }
}
