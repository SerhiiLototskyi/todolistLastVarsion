import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "./store";
import {RequestStatusType, setErrorAC} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {initializeAppTC, logoutTC} from "../features/Login/auth-reducer";
import {CircularProgress} from "@mui/material";


function App() {

    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const errorMessage = useAppSelector<string | null>(state => state.app.errorMessage)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    const closeError = () => {
        dispatch(setErrorAC(null))
    }
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    useEffect(() => {
        dispatch(initializeAppTC())
    },[])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar closeError={closeError} errorMessage={errorMessage}/>
            <AppBar position="static">
                <Toolbar className={'HeaderContainer'}>
                    {isLoggedIn? <Button color="inherit" onClick={logoutHandler}>Logout</Button> :
                        <Button color="inherit" onClick={() => {navigate('/login')}}>Login</Button> }
                </Toolbar>
            </AppBar>
            {status === "loading" && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistsList/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to={'/404'}/> }/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
