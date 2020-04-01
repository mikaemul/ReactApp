import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import { register, login, checkUserAvailable } from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { Button, Grid} from '@material-ui/core';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator';


const RegisterForm = ({history}) =>{
    const [user,setUser] = useContext(MediaContext);
    const intitialValues ={
        username: undefined,
    };
    const [errorMessage,setErrorMessage] = useState(intitialValues);

    const handleBlur = async (evt) =>{
        evt.persist();
        try{
        const response = await checkUserAvailable(evt.target.value);
        console.log(response);
        if(response.available){
            setErrorMessage((errorMessage) =>{
                return {
                ...errorMessage,
                username: response.username + 'is not available.',
                }
            });
        }
        }catch(e){
            console.log(e.message);
        }
    };
   
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
    useEffect(() =>{
        ValidatorForm.addValidationRule('isPasswordMatch',(value) =>{
            if(value !== inputs.password){
                return false;
            } else{
                return true;
            }
        });

        ValidatorForm.addValidationRule('isAvailable', async (value)=>{
            try{
                const response = await checkUserAvailable(value);
                console.log(response);
                return response.available;
            }catch(e){
                console.log(e.message);
                return true;
            }
        });
    }, [inputs]);

    


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1>Register</h1>
            </Grid>
            <Grid item xs={12} >
                <ValidatorForm instantValidate={false} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid container item>
                            <TextValidator
                                fullWidth
                                helperText={errorMessage.username}
                                variant="filled"
                                type="text"
                                name="username"
                                label="Username"
                                onChange={handleInputChange}
                                value={inputs.username}
                                error={errorMessage.username ? true : false}
                                onBlur={handleBlur}
                                validators={['required','minStringLenght:3','isAvailable']}
                                errorMessages={['this field is required', 'have to be atleast 3 characters long','username is not available']}
                            />
                        </Grid>

                        <Grid container item>
                            <TextValidator
                                fullWidth
                                variant="filled"
                                type="password"
                                name="password"
                                label="Password"
                                onChange={handleInputChange}
                                value={inputs.password}
                                validators={['required','minStringLenght:5']}
                                errorMessages={['this field is required', 'minimum lenght 5 characters']}
                            />
                        </Grid>

                        <Grid container item>
                            <TextValidator
                                fullWidth
                                variant="filled"
                                type="password"
                                name="confirm"
                                label="Confirm password"
                                onChange={handleInputChange}
                                value={inputs.confirm}
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['Password mismatch', 'this field is required']}
                            />
                        </Grid>

                        <Grid container item>
                            <TextValidator
                                fullWidth
                                variant="filled"
                                type="email"
                                name="email"
                                label="Email"
                                onChange={handleInputChange}
                                value={inputs.email}
                                validator={['required','isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />
                        </Grid>

                        <Grid container item>
                            <TextValidator
                                fullWidth
                                variant="filled"
                                type="text"
                                name="full_name"
                                label="Full name"
                                onChange={handleInputChange}
                                value={inputs.full_name}
                                validators={['matchRegexp: ^[a-zA-Z]+(([\',.-][a-zA-Z ])?[a-zA-Z]*)*$']}
                                errorMessages={['text only']}
                            />
                        </Grid>

                        <Grid container item>
                            <Button fullWidth variant="contained" color="primary" type="submit">Register</Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
           </Grid>
        </Grid>
    );
};

RegisterForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(RegisterForm);