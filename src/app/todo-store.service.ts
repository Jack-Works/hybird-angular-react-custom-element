import { Injectable } from '@angular/core'

export interface TodoItem {
    title: string
    completed: boolean
}

@Injectable({
    providedIn: 'root'
})
export class TodoStoreService {
    private _todoItems: TodoItem[] = [
        { completed: false, title: 'ハウトゥー世界征服' },
        { completed: true, title: 'start scp-2000 ' }
    ]
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
    clearCompletedItem() {
        this._todoItems = this._todoItems.filter(x => x.completed === false)
    }
}
