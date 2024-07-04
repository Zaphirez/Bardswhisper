import React, { useState } from 'react'
import httpClient from '../httpClient';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const logInUser = async () => {
        try {
            await httpClient.post("//localhost:5000/login", {
                email,
                password,
            });

            window.location.href = "/chat"
        } catch (e : any){
            if (e.response.status === 401) {
                alert("Invalid Credentials")
            }
        }
    }
  
    return (
    <div>
        <h1>Log into your Account</h1>
        <form>
            <div>
                <label>Email:</label>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <br />
            <div>
                <label>Password:</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='button' onClick={() => logInUser()}>Login</button>
        </form>
    </div>
  )
}

export default LoginPage;