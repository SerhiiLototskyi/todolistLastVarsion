import React, {useCallback, useEffect} from 'react'
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistAC
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {todolistAPI} from "./api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistAC(res.data))
            })
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        todolistAPI.deleteTask(todolistId, id)
            .then((res) => {
                dispatch(removeTaskAC(id, todolistId))
            })
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {

        todolistAPI.addTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(title, todolistId))
            })

    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        let task = {
            title: newTitle,
            description: '',
            completed: false,
            status: '',
            priority: null,
            startDate: null,
            deadline: null
        }
        todolistAPI.updateTaskTitle(todolistId, id, task)
            .then((res) => {
                dispatch(changeTaskTitleAC(id, newTitle, todolistId))
            })
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        todolistAPI.deleteTodolist(id)
            .then((res) => {
                dispatch(removeTodolistAC(id))
            })
    }, [dispatch]);

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        todolistAPI.changeTodolistTitle(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(title));
            })
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
