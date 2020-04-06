import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { checkToken } from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { makeStyles, AppBar, Toolbar, Typography, Button} from '@material-ui/core';


const useStyles = makeStyles((theme) =>({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Nav = ({history}) =>{
    const classes = useStyles();
    const [user,setUser] = useContext(MediaContext);

    useEffect(() =>{
        const checkUser = async () =>{
            try{
                const userData = await checkToken(localStorage.getItem('token'));
                console.log(userData);
                setUser(userData);
            }catch (e) {
                //send to login
                history.push('/home');
            }
    };
        checkUser();
    },[history,setUser]);
    


    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                   <Link to="/home">Home</Link>
                </Typography>
                { user === null ? 
                    <Button color="inherit">
                    <Link to="/">Login</Link>
                    </Button> :
                <>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/profile">Profile</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/upload">Upload</Link>
                    </Typography>
                    <Button color="inherit">
                        <Link to="/logout">Logout</Link>
                    </Button>
                </>
                }
            </Toolbar>
        </AppBar>
        </div>
    );
;}
Nav.propTypes = {
    history: PropTypes.object,
};

export default withRouter(Nav);
