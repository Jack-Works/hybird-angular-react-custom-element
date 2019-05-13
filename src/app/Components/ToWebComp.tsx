import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Test } from './test'

export function factory<T>(
    Comp: React.ComponentType<T> & { displayName: string }
) {
    class C extends HTMLElement {
        private __zone_cbs = new Map<string, [(...args: any[]) => any][]>()
        addEventListener(event: string, fn: (...args: any[]) => any) {
            const cbs = this.__zone_cbs.get(event) || []
            cbs.push([fn])
            this.__zone_cbs.set(event, cbs)
        }
        removeEventListener(event: string, fn: (...args: any[]) => any) {
            let cbs = this.__zone_cbs.get(event) || []
            cbs = cbs.filter(([otFn]) => {
                if (otFn !== fn) return true
                return false
            })
            if (cbs.length) this.__zone_cbs.set(event, cbs)
            else this.__zone_cbs.delete(event)
        }
        render(props: any) {
            console.log('Props has changed', props)
            ReactDOM.render(<Comp {...props as T} />, this)
        }
        private __zone_cb = new Map<string, (...args: any) => any>()
        getListener(event: string) {
            const f = (...args) => {
                for (const [fn] of this.__zone_cbs.get(event)) {
                    try {
                        fn(...args)
                    } catch (e) {
                        console.error(e)
                    }
                }
            }
            this.__zone_cb.set(event, this.__zone_cb.get(event) || f)
            if (this.__zone_cbs.get(event).length > 0)
                return this.__zone_cb.get(event)
            else return undefined
        }
        connectedCallback() {
            this.render({})
            requestAnimationFrame(this.checkProps())
        }
        checkProps() {
            const self = this
            let lastProps = {}
            return function checker() {
                requestAnimationFrame(checker)
                const events = [...self.__zone_cbs.keys()]
                    .map(k => ({
                        [k]: self.getListener(k)
                    }))
                    .reduce((x, y) => ({ ...x, ...y }), {})
                const currentProps: any = { ...self, ...events }
                for (const k in currentProps) {
                    if (k.startsWith('x-')) {
                        currentProps[k.replace(/^x-/, '')] = currentProps[k]
                        delete currentProps[k]
                    }
                    if (k.startsWith('__zone')) {
                        delete currentProps[k]
                    }
                    delete currentProps._reactRootContainer
                }
                if (
                    Object.keys(lastProps).length ===
                    Object.keys(currentProps).length
                ) {
                    for (const key in lastProps) {
                        if (lastProps[key] !== currentProps[key]) {
                            lastProps = currentProps
                            self.render(currentProps)
                        }
                    }
                } else {
                    lastProps = currentProps
                    self.render(currentProps)
                }
            }
        }
    }
    customElements.define(Comp.displayName, C)
    return C
}
export function factory2<T>(
    Comp: React.ComponentType<T> & { displayName: string }
) {
    class C extends HTMLElement {
        private __props = {}
        constructor() {
            super()
            const tokens = Array.from(
                new Set(
                    Comp.toString()
                        .replace(
                            /(\(|\)|\{|\}|\,|\+|\-|\*|\/|\=|;|>|<|"|'|\[|\]|\:|\n)/g,
                            ' '
                        )
                        .split(' ')
                        .filter(x => x)
                ).values()
            )
            console.log('Tokens for ', Comp, tokens)
            for (const token of tokens) {
                Object.defineProperty(this, token, {
                    configurable: false,
                    enumerable: true,
                    get: () => this.__props[token],
                    set: (value: any) => {
                        this.__props[token] = value
                        this.render()
                    }
                })
            }
        }
        private __zone_cbs = new Map<string, [(...args: any[]) => any][]>()
        addEventListener(event: string, fn: (...args: any[]) => any) {
            const cbs = this.__zone_cbs.get(event) || []
            cbs.push([fn])
            this.__zone_cbs.set(event, cbs)
            this.render()
        }
        removeEventListener(event: string, fn: (...args: any[]) => any) {
            let cbs = this.__zone_cbs.get(event) || []
            cbs = cbs.filter(([otFn]) => {
                if (otFn !== fn) return true
                return false
            })
            if (cbs.length) this.__zone_cbs.set(event, cbs)
            else this.__zone_cbs.delete(event)
            this.render()
        }
        render() {
            const events = [...this.__zone_cbs.keys()]
                .map(k => ({
                    [k]: this.getListener(k)
                }))
                .reduce((x, y) => ({ ...x, ...y }), {})
            const props = { ...this.__props, ...events }
            console.log('Props has changed', props)
            ReactDOM.render(<Comp {...props as T} />, this)
        }
        private __zone_cb = new Map<string, (...args: any) => any>()
        getListener(event: string) {
            const f = (...args) => {
                for (const [fn] of this.__zone_cbs.get(event)) {
                    try {
                        fn(...args)
                    } catch (e) {
                        console.error(e)
                    }
                }
            }
            this.__zone_cb.set(event, this.__zone_cb.get(event) || f)
            if (this.__zone_cbs.get(event).length > 0)
                return this.__zone_cb.get(event)
            else return undefined
        }
        connectedCallback() {
            this.render()
        }
    }
    customElements.define(Comp.displayName, C)
    return C
}
factory2(Test)
