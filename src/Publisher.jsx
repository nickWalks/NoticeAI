import React, { useState } from 'react';
import database from './firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

const Publisher = () => {
    const [message, setMessage] = useState('');

    const handlePublish = () => {
        if (message.trim() !== '') {
            const messagesRef = ref(database, 'messages');
            push(messagesRef, {
                content: message,
                timestamp: serverTimestamp(),
            });

            setMessage('');
        }
    };

    return (
        <div className="Publisher">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={handlePublish}>Publish</button>
        </div>
    );
};

export default Publisher;
