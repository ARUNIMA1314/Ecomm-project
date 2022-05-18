import React, {useState} from 'react';
import "./Login.css";
import {Link, useNavigate} from 'react-router-dom';
import { auth } from "./firebase";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        //firebase login
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/');
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                //it successfully created a new user with email and password
                console.log(auth);
                if(auth) {
                    navigate('/');
                }
            })
            .catch(error => alert(error.message))

        //firebase register
    }

  return (
    <div className='login'>
        <Link to="/">
            <img className='login__logo' src='https://assets-global.website-files.com/5e3177cecf36f6591e4e38cb/5ea2a86505e63bdd814cf868_Logo.png' />
        </Link>

        <div className='login__container'>
            
            <h1>Sign-in</h1>
            <form>
                <h6>E-mail</h6>
                <input type='text' value={email} onChange=
                {e => setEmail(e.target.value)} /> 

                <h6>Password</h6>
                <input type='password' value={password} onChange=
                {e => setPassword(e.target.value)} /> 



                <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
            </form>

            <p>
                By signing-in, you agree to Click-n-Pick's Conditions of Use and Privacy Notice.
            </p>
            
            <p>Don't have an account?</p>
            <button onClick={register} className='login__registerButton'>Create your Click-n-Pick account</button>
        </div>
    </div>
  )
}

export default Login;