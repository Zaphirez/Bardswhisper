import React, { useEffect, useState } from "react";
import { User } from "../types";
import httpClient from "../httpClient";

const LandingPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)

    const logoutUser = async () => {
        await httpClient.post("//localhost:5000/logout");
        window.location.href = "/";
    }

    useEffect(() => {
        (async() => {
            try {
                const resp = await httpClient.get("//localhost:5000/@me")
                
                setUser(resp.data)
            } catch (e) {
                console.log("Not Auth")
            }
        })();
    }, [])

    return (
        <div>
            <h1>Welcome to BardsWhispers</h1>
            {user != null ? (
                <div>
                    <h2>Logged in!</h2>
                    <h3>ID: {user.id}</h3>
                    <h3>Username: {user.username}</h3>
                    <h3>Email: {user.email}</h3>
                    <button onClick={logoutUser}>Logout</button>
                </div>
            ) : (<div>
            <br />
            <p className="not_logged">You are not logged in!</p>
            <div className="button-span">
                <a href="/login"><button>Login</button></a>
                <a href="/register"><button>Register</button></a>
            </div>
            </div>)}
        </div>
    )
}

export default LandingPage