import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import {auth, provider } from '../../firebase';
import { useStateValue } from '../../contextAPI/StateProvider';
import { actionTypes } from '../../Reducer/Reducer';
import logo from '../../assets/whatsapplogo.png';

function Login() {

    const [{} , dispatch] = useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then( (result) => {
            dispatch({
                type : actionTypes.SET_USER,
                user : result.user,
            });
        } )
        .catch(err => alert(err.message));
    }
    return (
        <div className="login "> 
            <div className="login__container">
                <img src={logo}
                 alt="" width="500px" height="500px"/>
                <div className="login__text">
                    <h1>SignIn to Whatsapp</h1>
                </div>
                <Button onClick={signIn}>
                    SignIn with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
