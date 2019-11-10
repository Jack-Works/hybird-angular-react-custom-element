import * as React from 'react'
import { CssBaseline, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { green } from '@material-ui/core/colors'

export function RootComponent(props: React.PropsWithChildren<{}>) {
    return (
        <ThemeProvider theme={createMuiTheme({ palette: { type: 'dark', secondary: green } })}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    )
}
