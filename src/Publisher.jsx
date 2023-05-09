import React, { useState } from 'react';
import { getDatabase, ref, push, remove, onValue, set } from 'firebase/database';
import { CheckCircleIcon } from '@heroicons/react/20/solid'

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








                <div>
                    <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
                        Add your comment
                    </label>
                    <div className="mt-2">
                        <textarea
                            rows={4}
                            name="comment"
                            id="comment"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>


                <button
                    type="submit"
                    className="m-2 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Publish
                    <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                </button>
            </form>

            <button
                onClick={deleteAllMessages}
                className="m-10 inline-flex items-center gap-x-2 rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
            >
                Delete All Messages
                <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
            </button>

        </div>

    );
};

export default Publisher;
