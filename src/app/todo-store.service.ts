import { Injectable } from '@angular/core'

export interface TodoItem {
    title: string
    completed: boolean
}

const todoKey = 'todo-list-item'

@Injectable({
    providedIn: 'root'
})
export class TodoStoreService {
    private _todoItems: TodoItem[] = JSON.parse(
        localStorage.getItem(todoKey) ||
            JSON.stringify([
                { completed: false, title: 'ハウトゥー世界征服' },
                { completed: true, title: 'start scp-2000 ' }
            ])
    )
    public get todoItems(): readonly Readonly<TodoItem>[] {
        return this._todoItems
    }
    switchTodo(index: number) {
        const x = this._todoItems[index]
        if (x) x.completed = !x.completed
        this.store()
    }
    addNewTodo(item: TodoItem) {
        this._todoItems.push(item)
        this.store()
    }
    clearCompletedItem() {
        this._todoItems = this._todoItems.filter(x => x.completed === false)
        this.store()
    }
    private store() {
        localStorage.setItem(todoKey, JSON.stringify(this._todoItems))
    }
}
