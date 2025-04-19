import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
import useStyles from "./styles";

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        navigate('/auth');
        setUser(null);
    };

    const mainPage = () => {
        navigate('/');
    };

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.leftContent}></div>
            <Toolbar className={classes.toolbar}>
            <div className={classes.leftContent}></div>

            <Typography
                variant="h4"
                align="center"
                sx={{ flexGrow: 100, fontWeight: 'bold', color: '#3f51b5', textAlign: 'left' }}
                onClick={mainPage}
                style={{ cursor: 'pointer' }}
            >
                IdeaNest
            </Typography>
                {user && user.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.protrait} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="inherit" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
