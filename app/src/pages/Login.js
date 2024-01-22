import React from 'react';
import ReusableButton from '../components/Button'; 
import TextField from '../components/TextField';
import Checkbox from '../components/Checkbox';
import Link from '../components/Link';

const Login = () => {
    return (
        <div>
            <div>
                <h1>Log In</h1>

                Email <TextField width="30ch" id="outlined-required" label=""></TextField>
                Password <TextField width="30ch" id="outlined-password-input" type="password" label=""></TextField>

                <Checkbox labelPlacement="end" label="Keep me signed in" value="isLoggedIn"></Checkbox>
                <ReusableButton text="LOG IN" /> 
            </div>
            <div>
                Don't have an account? <Link value="Sign up"/>
            </div>
        </div>
    );
};

export default Login;