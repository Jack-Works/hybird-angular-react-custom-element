/// <reference path="../../node_modules/zone.js/lib/zone.d.ts" />
/// <reference path="./ReactHelper.d.ts" />
import * as ReactDOM from 'react-dom'
import * as React from 'react'

interface CustomElementOptions {
    customElementOptions?: ElementDefinitionOptions
}
export type ReactComponent<T> = React.ComponentType<T> & CustomElementOptions

const onAngularZoneCallbackMap = new Set<(...args: any[]) => void>()
{
    let angularZone: Zone = undefined!
    // @ts-ignore
    Zone.current._zoneDelegate.__proto__.invokeTask = new Proxy(Zone.current._zoneDelegate.__proto__.invokeTask, {
        apply(target, thisArg, args) {
            if (args[0].name === 'angular') {
                angularZone = args[0]
                // @ts-ignore
                const original = angularZone._zoneDelegate._hasTaskZS.onHasTask
                // @ts-ignore Patch Angular Zone here.
                angularZone._zoneDelegate._hasTaskZS.onHasTask = function(...args) {
                    onAngularZoneCallbackMap.forEach(x => x())
                    return Reflect.apply(original, this, args)
                } as ZoneSpec['onHasTask']
                // @ts-ignore restore the object
                Zone.current._zoneDelegate.__proto__.invokeTask = target
            }
            return Reflect.apply(target, thisArg, args)
        }
    })
}

// TODO: use private fields.
const props = Symbol('Props')
const host = Symbol('Host')
export function ReactToCustomElement<T>(
    elementName: string,
    ReactComponent: React.ComponentType<T> & CustomElementOptions
) {
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
            onAngularZoneCallbackMap.add(() => {
                // @ts-ignore Don't use requestAnimationFrame, it's patched by Zone.
                globalThis[Zone.__symbol__('requestAnimationFrame')](() =>
                    render(ReactComponent, this[props], this[host])
                )
            })
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
                // @ts-ignore
                globalThis[Zone.__symbol__('requestAnimationFrame')](() =>
                    render(ReactComponent, this[props], this[host])
                )
            }
        }
    }
    customElements.define(elementName, CustomElement, ReactComponent.customElementOptions)
    return CustomElement
}

export function GenerateAngularTemplate<T>(
    elementName: string,
    ReactComponent: ReactComponent<T>,
    ngClass: { new (...args: any[]): ReactComponentProps<typeof ReactComponent> }
) {
    let template = `<` + elementName
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

    template += '></' + elementName + '>'
    return template
}

export function useReact<T>(
    ReactComponent: ReactComponent<T>,
    ngClass: { new (...args: any[]): ReactComponentProps<typeof ReactComponent> }
) {
    const elementName =
        ReactComponent.displayName ||
        'react-' +
            ReactComponent.name.toLowerCase() +
            '-' +
            Math.random()
                .toString(26)
                .slice(2)
    ReactToCustomElement(elementName, ReactComponent)
    return GenerateAngularTemplate(elementName, ReactComponent, ngClass)
}

let RootComponent: React.ComponentType = x => <>{x.children}</>
export function setRootComponent(comp: React.ComponentType) {
    RootComponent = comp
}

class ErrorBoundary extends React.Component {
    state: { error: Error | undefined } = { error: undefined }
    componentDidCatch(error: unknown) {
        if (error instanceof Error) this.setState({ error })
        else {
            console.error(error)
            this.setState({ error: new Error('Unknown error') })
        }
    }
    render() {
        if (this.state.error)
            return (
                <>
                    <pre>{this.state.error.name}:</pre>
                    <pre>Message: {this.state.error.message}</pre>
                    <pre>Stack:{'\n' + this.state.error.stack}</pre>
                </>
            )
        return this.props.children
    }
}

function render(Component: React.ComponentType<any>, props: any, host: Element) {
    ReactDOM.render(
        <ErrorBoundary>
            <RootComponent>
                <Component {...props}></Component>
            </RootComponent>
        </ErrorBoundary>,
        host
    )
}
