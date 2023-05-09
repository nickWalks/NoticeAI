import React, { useState } from 'react';
import { getDatabase, ref, push, remove, onValue, set } from 'firebase/database';

const Publisher = () => {
    const [message, setMessage] = useState('');

    const database = getDatabase();

    const handleSubmit = (e) => {
        e.preventDefault();

        const messagesRef = ref(database, 'messages');
        const newMessageKey = push(messagesRef).key;
        const newMessageRef = ref(database, `messages/${newMessageKey}`);
        set(newMessageRef, { content: message });
        setMessage('');
    };

    const deleteAllMessages = async () => {
        const messagesRef = ref(database, 'messages');
        remove(messagesRef);
    };

    return (
        <div className="Publisher">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                />
                <button type="submit">Publish</button>
            </form>
            <button onClick={deleteAllMessages}>Delete All Messages</button>
        </div>
    );
};

export default Publisher;
