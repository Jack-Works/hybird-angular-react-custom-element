import * as React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center'
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1
        },
        iconButton: {
            padding: 10
        }
    })
)

export interface NewTodoProps {
    onNewItem(title: string): void
}
export function NewTodo(props: NewTodoProps) {
    const classes = useStyles({})
    const [input, setInput] = React.useState('')

    return (
        <Paper square className={classes.root}>
            <IconButton disabled className={classes.iconButton}>
                <PlaylistAddCheckIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Add new Todo Item"
                inputProps={{ 'aria-label': 'add new todo item' }}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        props.onNewItem(input)
                        setInput('')
                    }
                }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <KeyboardReturnIcon />
            </IconButton>
        </Paper>
    )
}
