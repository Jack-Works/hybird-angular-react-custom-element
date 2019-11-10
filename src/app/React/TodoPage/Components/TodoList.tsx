import * as React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { TodoItem } from 'src/app/todo-store.service'
import { ListSubheader } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper
        }
    })
)

export function TodoList(props: { items: TodoItem[] }) {
    const classes = useStyles({})
    const [checked, setChecked] = React.useState([1])

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    return (
        <List subheader={<ListSubheader>Todo List</ListSubheader>} className={classes.root}>
            {props.items.map((value, index) => {
                const labelId = `todo-list-secondary-label-${value}`
                return (
                    <ListItem key={index} button>
                        <ListItemText id={labelId} primary={value.title} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(index)}
                                checked={value.completed}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            })}
        </List>
    )
}
