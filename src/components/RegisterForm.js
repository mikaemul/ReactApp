import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import { register, login, checkUserAvailable } from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { Button, TextField, Grid} from '@material-ui/core';


const RegisterForm = ({history}) =>{
    const [user,setUser] = useContext(MediaContext);
    const doRegister = async () =>{
        try {
            await checkUserAvailable(inputs.username);
            await register(inputs);
            //kirjaudu automaattisesti
            const userData = await login(inputs);
            setUser(userData.user);
            //console.log(userData);
            localStorage.setItem('token', userData.token);
            // siirry etusivulle
            history.push('/home');
        }catch (e){
            console.log(e.message);
            //näytä virhe
        }
       
    };
    const {inputs, handleInputChange,handleSubmit} = useSignUpForm(doRegister);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1>Register</h1>
            </Grid>
            <Grid item xs={12} >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid container item>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                name="username"
                                label="Username"
                                onChange={handleInputChange}
                                value={inputs.username}
                            />
                        </Grid>

                        <Grid container item>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                name="password"
                                label="Password"
                                onChange={handleInputChange}
                                value={inputs.password}
                            />
                        </Grid>

                        <Grid container item>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="email"
                                name="email"
                                label="Email"
                                onChange={handleInputChange}
                                value={inputs.email}
                            />
                        </Grid>

                        <Grid container item>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                name="full_name"
                                label="Full name"
                                onChange={handleInputChange}
                                value={inputs.full_name}
                            />
                        </Grid>

                        <Grid container item>
                            <Button fullWidth variant="contained" color="primary" type="submit">Register</Button>
                        </Grid>
                    </Grid>
                </form>
           </Grid>
        </Grid>
    );
};

RegisterForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(RegisterForm);