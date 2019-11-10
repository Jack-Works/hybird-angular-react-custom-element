import * as React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import RefreshIcon from '@material-ui/icons/Refresh'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: { maxWidth: 380 },
        close: {
            padding: theme.spacing(0.5)
        }
    })
)

export interface HitokotoProps {
    display: boolean
    title: string
    from: string
    href?: string
    onRefresh(): void
}
export function Hitokoto(props: HitokotoProps) {
    const classes = useStyles({})
    console.log(props)
    if (!props.display) return <></>
    return (
        <Snackbar
            classes={{ root: classes.root }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            open
            ContentProps={{
                'aria-describedby': 'hitokoto'
            }}
            message={
                <span id="hitokoto">
                    <pre style={{ whiteSpace: 'pre-line' }}>{props.title}</pre>
                    <br />
                    <span style={{ float: 'right' }}>-- {props.from}</span>
                </span>
            }
            action={[
                props.href ? (
                    <IconButton
                        key="open"
                        aria-label="open"
                        color="inherit"
                        className={classes.close}
                        onClick={() => window.open(props.href, '_blank')}
                    >
                        <OpenInNewIcon />
                    </IconButton>
                ) : null,
                <IconButton
                    key="refresh"
                    aria-label="refresh"
                    color="inherit"
                    className={classes.close}
                    onClick={props.onRefresh}
                >
                    <RefreshIcon />
                </IconButton>
            ]}
        />
    )
}
