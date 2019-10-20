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
    render(props: any) {
      ReactDOM.render(<ReactComponent {...(props as T)} />, this)
    }
    connectedCallback() {
      this.render({})
    }
  }
  customElements.define(ReactComponent.displayName, CustomElement, ReactComponent.customElementOptions)
  return CustomElement
}
