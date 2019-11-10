import { Component, OnInit } from '@angular/core'
import { TodoStoreService } from '../todo-store.service'
import { useReact } from 'src/react/ReactToCE'
import { Hitokoto, HitokotoProps } from '../React/Hitokoto'

@Component({
    selector: 'app-hitokoto',
    template: useReact(Hitokoto, HitokotoComponent)
})
export class HitokotoComponent implements OnInit, HitokotoProps {
    constructor(public todoService: TodoStoreService) {}

    private getHitokoto: () => [string, string, string | undefined]
    get display() {
        return !!this.getHitokoto
    }
    public title: string
    public from: string
    public href?: string
    async ngOnInit() {
        const x = await fetch(
            'https://raw.githubusercontent.com/Jack-Works/Jack-Works.github.io/master/days/hitokoto.js'
        ).then(x => x.text())
        const [hitokoto, getHitokoto] = eval(x + '\n[hitokoto, getHitokoto]')
        this.getHitokoto = getHitokoto
        this.onRefresh()
    }
    onRefresh() {
        const [t, f, h] = this.getHitokoto()
        this.title = t
        this.from = f
        this.href = h
    }
}
