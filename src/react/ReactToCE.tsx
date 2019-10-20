import * as ReactDOM from 'react-dom'
import * as React from 'react'

interface CustomElementOptions {
  displayName?: string
  customElementOptions?: ElementDefinitionOptions
}
export type ReactComponent<T> = React.ComponentType<T> & CustomElementOptions

export function ReactToCustomElement<T>(ReactComponent: React.ComponentType<T> & CustomElementOptions) {
  if (ReactComponent.displayName === undefined || ReactComponent.displayName.indexOf('-') === -1)
    throw new TypeError('The "displayName" property must have a "-" in the middle.')
  class CustomElement extends HTMLElement {
    private props: any = {}
    private host = document.createElement('host')
    constructor() {
      super()
      Object.setPrototypeOf(
        this,
        new Proxy(HTMLElement.prototype, {
          set: (target, key, value, receiver) => {
            this.props[key] = value
            ReactDOM.render(<ReactComponent {...this.props} />, this.host)
            return Reflect.set(target, key, value, receiver)
          }
          // TODO: implements defineProperty
          // TODO: implements deleteProperty
        })
      )
    }
    connectedCallback() {
      this.appendChild(this.host)
      ReactDOM.render(<ReactComponent {...this.props} />, this.host)
    }
  }
  customElements.define(ReactComponent.displayName, CustomElement, ReactComponent.customElementOptions)
  return CustomElement
}
