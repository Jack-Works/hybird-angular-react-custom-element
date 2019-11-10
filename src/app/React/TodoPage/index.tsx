import * as React from 'react'
import { Container, Typography, AppBar, Toolbar, Paper, makeStyles, Theme, Fab } from '@material-ui/core'
import { TodoList, TodoListProps } from './Components/TodoList'
import { NewTodo, NewTodoProps } from './Components/NewTodo'
import ClearAllIcon from '@material-ui/icons/ClearAll'
export interface TodoPageProps extends TodoListProps, NewTodoProps {
    onClear(): void
}
const useStyle = makeStyles((theme: Theme) => ({
    root: {
        minHeight: `calc(100vh - ${64}px)`,
        display: 'flex',
        flexDirection: 'column'
    },
    fab: {
        position: 'relative',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        alignSelf: 'flex-end'
    }
}))
export function TodoPage(props: Partial<TodoPageProps>) {
    const classes = useStyle({})
    return (
        <Container maxWidth="xs">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Todo by Angular & React</Typography>
                </Toolbar>
            </AppBar>
            <Paper square classes={{ root: classes.root }}>
                <NewTodo onNewItem={props.onNewItem || (() => {})}></NewTodo>
                <TodoList todoList={props.todoList || []} onToggle={props.onToggle || (() => {})} />
                <div style={{ flex: 1 }}></div>
                <Fab onClick={props.onClear} aria-label="clear" className={classes.fab} color="secondary">
                    <ClearAllIcon></ClearAllIcon>
                </Fab>
            </Paper>
        </Container>
    )
}
TodoPage.displayName = 'todo-page'
