import * as React from 'react'
import { Container, Typography, AppBar, Toolbar, Paper, makeStyles, Theme } from '@material-ui/core'
import { TodoList, TodoListProps } from './Components/TodoList'
import { TodoItem } from 'src/app/todo-store.service'

export interface TodoPageProps extends TodoListProps {}
const useStyle = makeStyles((theme: Theme) => ({
    root: {
        minHeight: `calc(100vh - ${64}px)`,
        paddingTop: theme.spacing(1)
    }
}))
export function TodoPage(props: Partial<TodoPageProps>) {
    const classes = useStyle({})
    return (
        <Container maxWidth="xs">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Todo, with Angular + React</Typography>
                </Toolbar>
            </AppBar>
            <Paper classes={{ root: classes.root }}>
                <TodoList todoList={props.todoList || []} onToggle={props.onToggle || (() => {})} />
            </Paper>
        </Container>
    )
}
TodoPage.displayName = 'todo-page'
