import React, { useState, useEffect } from 'react';
import database from './firebase';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import Header from './Header';

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
        <>
            <Header />
            <ul role="list" className="divide-y divide-gray-100">
                {messages.map((message) => (
                    <li key={message.id} className="flex gap-x-4 py-5">

                        <div className="min-w-0">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{message.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Receiver;
