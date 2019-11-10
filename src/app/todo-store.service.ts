import { Injectable } from '@angular/core'

export interface TodoItem {
    title: string
    completed: boolean
}

@Injectable({
    providedIn: 'root'
})
export class TodoStoreService {
    public todoItems: TodoItem[] = [{ completed: false, title: 'Hello' }]
}
