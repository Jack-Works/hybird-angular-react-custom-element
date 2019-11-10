import * as React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { TodoItem } from 'src/app/todo-store.service'
import { ListSubheader } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column-reverse'
    } as const,
    subheader: (props: { count: number }) => ({ order: props.count + 1, userSelect: 'none' } as const),
    item: {
        textDecorationLine: 'line-through',
        transition: '0.4s'
    },
    completed: {
        opacity: 0.5,
        textDecorationColor: 'unset'
    },
    notCompleted: {
        opacity: 1,
        textDecorationColor: 'transparent'
    }
}))
export interface TodoListProps {
    todoList: readonly TodoItem[]
    onToggle(index: number): void
}
export function TodoList(props: TodoListProps) {
    const classes = useStyles({ count: props.todoList.length })

    return (
        <List
            subheader={
                <ListSubheader className={classes.subheader}>
                    {props.todoList.length ? 'Todo List' : 'There is no item in the todo list'}
                </ListSubheader>
            }
            classes={{ root: classes.root }}
        >
            {props.todoList.map((value, index) => {
                const labelId = `todo-list-secondary-label-${index}`
                return (
                    <ListItem key={index} button onClick={() => props.onToggle(index)}>
                        <ListItemText
                            className={
                                classes.item + ' ' + (value.completed ? classes.completed : classes.notCompleted)
                            }
                            id={labelId}
                            primary={value.title}
                        />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={() => props.onToggle(index)}
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
