import React, { useState } from 'react'
import httpClient from '../httpClient';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const registerUser = async () => {

        try {
            await httpClient.post("//localhost:5000/register", {
                username,
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
        <h1>Create an Account!</h1>
        <form>
            <div>
                <label>Username:</label>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div>
                <label>Email:</label>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='button' onClick={() => registerUser()}>Register</button>
        </form>
    </div>
  )
}

export default RegisterPage;