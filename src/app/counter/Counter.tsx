import * as React from 'react'

export let Counter: React.ComponentType<{
    count: number
    onChange(next: number): void
}> = props => {
    const { count, onChange } = props
    return (
        <>
            <button onClick={() => onChange(count - 1)}>-1</button>
            <span>Current count: {count}</span>
            <button onClick={() => onChange(count + 1)}>+1</button>
        </>
    )
}
Counter.displayName = 'app-counter-ui'
