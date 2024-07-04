import {useEffect, useState} from "react";
import httpClient from "../../httpClient";

const MessageInput = ({ sendMessage }) => {
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    useEffect(()=> {
        (async ()=> {
            try {
                const resp = await httpClient.get("//localhost:5000/@me")

                setUser(resp.data)
            } catch (e) {
                console.log("Not Auth")
            }
        })();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage({"message": message, "user": user});
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                className="MessageInput"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            / >
            <button type="submit" className="Send_Message_Button">Send</button>
        </form>
    )
}
export default MessageInput;