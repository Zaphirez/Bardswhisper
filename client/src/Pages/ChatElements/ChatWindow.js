import React, { useEffect, useRef } from "react";

const ChatWindow = ({ messages }) => {
    const messagesEndRef = useRef(null);
    const messagesRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    };

    useEffect(()=> {
        const messagesDiv = messagesRef.current;

        const isAtBottom = messagesDiv.scrollHeight - messagesDiv.scrollTop === messagesDiv.clientHeight;

        if(isAtBottom) {
            scrollToBottom();
        }
    }, [messages])

    return (
        <div className="Messages" ref={messagesRef}>
            {messages.map((msg, i) => (
                <div key={i} className="Message-Container">
                    <p className="username">{msg.username}:</p>
                    <p className="message">{msg.message}</p>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default ChatWindow;