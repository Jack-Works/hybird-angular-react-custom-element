import { Injectable } from '@angular/core'

export interface TodoItem {
    title: string
    completed: boolean
}

@Injectable({
    providedIn: 'root'
})
export class TodoStoreService {
    private _todoItems: TodoItem[] = [{ completed: false, title: 'Hello' }]
    public get todoItems(): readonly Readonly<TodoItem>[] {
        return this._todoItems
    }
    switchTodo(index: number) {
        const x = this._todoItems[index]
        if (x) x.completed = !x.completed
    }
    addNewTodo(item: TodoItem) {
        this._todoItems.push(item)
    }
}
