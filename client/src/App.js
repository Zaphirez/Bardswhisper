import {useState, useEffect} from "react";
import { io } from "socket.io-client";
import ChatWindow from "./Pages/ChatElements/ChatWindow";
import MessageInput from "./Pages/ChatElements/MessageInput";

const socket = io("http://0.0.0.0:5000")

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message])
        });
        
        return () => {
            socket.off("message");
        };
    }, []);

    const sendMessage = (message) => {
        socket.emit("send_message", message);
    };



    return (
        <div className="chat-container">
            <ChatWindow messages={messages} />
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
}
export default App;