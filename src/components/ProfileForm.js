import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {  checkUserAvailable, updateProfile,checkToken} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { Button, Grid} from '@material-ui/core';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator';
import useProfileForm from '../hooks/ProfileHooks';

const ProfileForm = ({history}) =>{
    const [user,setUser] = useContext(MediaContext);
    const [toggle,setToggle] = useState(false);
    const showHide = () =>{
        setToggle(!toggle);
    };

    const doProfile= async () =>{
        try {
            const token = localStorage.getItem('token');
            await updateProfile(inputs, token);
            const userData = await checkToken(token);
            console.log(userData);
            setUser(userData);
        }catch (e){
            console.log(e.message);
            //näytä virhe
        }
       
    };
  
    const {inputs,setInputs,handleInputChange,handleSubmit} = useProfileForm(doProfile);

    useEffect(() =>{
        setInputs(user);
        ValidatorForm.addValidationRule('isAvailable', async (value)=>{
            try{
                if(value !== user.username){
                const response = await checkUserAvailable(value);
                console.log(response);
                return response.available;
                }else {
                    return true;
                }
            }catch(e){
                console.log(e.message);
                return true;
            }
        });
    }, [user,setInputs]);


    return (
        <Grid container spacing={3}>
            <Grid item>
                <Button
                    fullWidth
                    color="primary"
                    onClick={showHide}
                    >
                        Update profile
                    </Button>
            </Grid>
            {toggle  &&
            <>
            <Grid item xs={12}>
                <h1>Modify profile</h1>
            </Grid>
            <Grid item xs={12} >
                <ValidatorForm instantValidate={false} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid container item>
                            <TextValidator
                                fullWidth
                                variant="filled"
                                type="text"
                                name="username"
                                label="Username"
                                onChange={handleInputChange}
                                value={inputs.username}
                                validators={['required','minStringLenght:3','isAvailable']}
                                errorMessages={['this field is required', 'have to be atleast 3 characters long', inputs.username + ' is not available']}
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
                                validators={['matchRegexp:^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$']}
                                errorMessages={['text only']}
                            />
                        </Grid>

                        <Grid container item>
                            <Button fullWidth variant="contained" color="primary" type="submit">Save profile</Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>

           </Grid>
           </>
        }
        </Grid>
    );
};

ProfileForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(ProfileForm);