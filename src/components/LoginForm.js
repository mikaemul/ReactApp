import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import { login } from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { Button, TextField, Grid} from '@material-ui/core';

const LoginForm = ({history}) =>{
    const [user,setUser] = useContext(MediaContext);
    const doLogin = async () =>{
        try{
            const userData = await login(inputs);
            setUser(userData.user);
            // tallenna token
            localStorage.setItem('token', userData.token);
            // siirry etusivulle
            history.push('/home');
        }catch (e){
            console.log(e.message);
            //näytä virhe
        }
    };
    const {inputs, handleInputChange,handleSubmit} = useLoginForm(doLogin);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <h1>Login</h1>
            </Grid>
            <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid container item >
                        <TextField
                            variant="filled"
                            type="text"
                            name="username"
                            label="Username"
                            onChange={handleInputChange}
                            value={inputs.username}
                        />
                    </Grid>
                    <Grid container item >
                        <TextField
                            variant="filled"
                            type="password"
                            name="password"
                            label="Password"
                            onChange={handleInputChange}
                            value={inputs.password}
                        />
                    </Grid>
                    <Grid container item >
                        <Button  variant="contained" color="primary" type="submit">Login</Button>
                    </Grid>
                </Grid>
           </form>
           </Grid>

        </Grid>
    );
};
LoginForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(LoginForm);