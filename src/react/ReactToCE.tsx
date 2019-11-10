/// <reference path="./ReactHelper.d.ts" />
import * as ReactDOM from 'react-dom'
import * as React from 'react'

interface CustomElementOptions {
    displayName?: string
    customElementOptions?: ElementDefinitionOptions
}
export type ReactComponent<T> = React.ComponentType<T> & CustomElementOptions

// TODO: use private fields.
const props = Symbol('Props')
const host = Symbol('Host')
export function ReactToCustomElement<T>(ReactComponent: React.ComponentType<T> & CustomElementOptions) {
    if (ReactComponent.displayName === undefined || ReactComponent.displayName.indexOf('-') === -1)
        throw new TypeError('The "displayName" property must have a "-" in the middle.')
    class CustomElement extends HTMLElement {
        private [props]: any = new Proxy(
            {},
            {
                set: (target, key, value, receiver) => {
                    Reflect.set(target, key, value, receiver)
                    render(ReactComponent, this[props], this[host])
                    return true
                }
                // TODO: implement deleteProperty
            }
        )
        private [host] = document.createElement('host')
        constructor() {
            super()
            Object.setPrototypeOf(
                this,
                new Proxy(HTMLElement.prototype, {
                    set: (target, key, value, receiver) => {
                        this[props][key] = value
                        Object.defineProperty(target, key, {
                            configurable: true,
                            enumerable: true,
                            get: () => Reflect.get(this[props], key),
                            set: v => {
                                this[props][key] = value
                                return true
                            }
                        })
                        return true
                        // return Reflect.set(target, key, value, receiver)
                    }
                    // TODO: implements defineProperty
                    // TODO: implements deleteProperty
                })
            )
        }
        connectedCallback() {
            this.appendChild(this[host])
            render(ReactComponent, this[props], this[host])
        }
        addEventListener(event: string, handler: (...args: any) => void, options: any) {
            // TODO: Support removeEventListener
            // TODO: Support multiple listener for one event
            // TODO: Support options
            this[props][event] = (...args: any[]) => {
                handler(
                    new Proxy(new CustomEvent(event, { detail: args.length > 1 ? args : args[0] }), {
                        get: (target, key, receiver) => {
                            if (key === 'target') return this
                            return (target as any)[key]
                        }
                    })
                )
            }
        }
    }
    customElements.define(ReactComponent.displayName, CustomElement, ReactComponent.customElementOptions)
    return CustomElement
}

export function GenerateAngularTemplate<T>(
    ReactComponent: ReactComponent<T>,
    ngClass: { new (...args: any[]): ReactComponentProps<typeof ReactComponent> }
) {
    let template = `<` + ReactComponent.displayName
    const desc = Object.getOwnPropertyDescriptors(ngClass.prototype)
    for (const i in desc) {
        if (i === 'constructor') continue
        if (i.startsWith('ng')) continue
        if (typeof desc[i].value === 'function') {
            template += ` (${i})="${i}($event.detail)" `
        } else {
            template += ` [${i}]="${i}" `
        }
    }

    // TODO: Support class fields
    // @ts-ignore method matchAll is not typed yet.
    const properties = new Set([...ngClass.toString().matchAll(/this\s?\.\s?(.+?)\s?=/g)].map(x => x[1]))
    for (const property of properties) {
        if (property in desc) continue
        template += ` [${property}]="${property}" `
    }

    template += '></' + ReactComponent.displayName + '>'
    return template
}

export function useReact<T>(
    ReactComponent: ReactComponent<T>,
    ngClass: { new (...args: any[]): ReactComponentProps<typeof ReactComponent> }
) {
    if (!customElements.get(ReactComponent.displayName)) ReactToCustomElement(ReactComponent)
    return GenerateAngularTemplate(ReactComponent, ngClass)
}

function render(component: React.ComponentType<any>, props: any, host: Element) {
    ReactDOM.render(React.createElement(component, props), host)
}
