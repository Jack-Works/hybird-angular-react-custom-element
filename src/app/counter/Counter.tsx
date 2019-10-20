import * as React from 'react'
import { ReactToCustomElement } from 'src/react/ReactToCE'

export let Counter: React.ComponentType<{ count: number }> = props => {
  return <span>Current count: {props.count}</span>
}
Counter.displayName = 'app-counter-ui'
ReactToCustomElement(Counter)
