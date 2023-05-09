import React, { useState, useEffect } from 'react';
import database from './firebase';
import { ref, onValue, query, orderByChild } from 'firebase/database';

const Receiver = () => {
    const messagesRef = ref(database, 'messages');
    const messagesQuery = query(messagesRef, orderByChild('timestamp'));
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onValue(
            messagesQuery,
            (snapshot) => {
                const newMessages = [];
                snapshot.forEach((childSnapshot) => {
                    const messageData = childSnapshot.val();
                    newMessages.push({
                        id: childSnapshot.key,
                        content: messageData.content,
                    });
                });
                setMessages(newMessages);
                setLoading(false);
            },
            (error) => {
                setError(error);
                setLoading(false);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [messagesQuery]);

    return (
        <div className="Receiver p-4">
            {loading && <p>Loading messages...</p>}
            {error && <p>Error: {error.message}</p>}
            <ul className="list-disc list-inside">
                {messages.map((message) => (
                    <li key={message.id} className="my-1">
                        {message.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Receiver;
