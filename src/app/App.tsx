import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Route, Routes} from 'react-router-dom'
import {selectIsInitialized, selectStatus} from "../features/Application/selectors";
import {authActions, authSelectors, Login} from "../features/Auth";
import {useActions} from "../utils/redux-utils";
import {appActions} from "../features/Application";
import {useSelector} from "react-redux";
import {TodolistsList} from "../features/TodolistsList";

type PropsType = {}

function App(props: PropsType) {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        if (!isInitialized) {
            initializeApp()
        }
    }, []);

    const logoutHandler = useCallback(() => {
        logout()
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                   <Routes>
                       <Route path={'/'} element={<TodolistsList demo={false}/>}/>
                       <Route path={'/login'} element={<Login/>}/>
                   </Routes>
                </Container>
            </div>
    )
}

export default App
