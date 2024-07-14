import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AskDoubt = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) return;

        await addDoc(collection(db, 'doubts'), {
            title,
            description,
            answer: '',
            createdAt: new Date(),
        });

        setTitle('');
        setDescription('');
        alert('Doubt submitted successfully');
    };

    return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4 text-white">Ask a Doubt</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <textarea
                placeholder="Describe your doubt"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            ></textarea>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
                Submit
            </button>
        </form>
    </div>
</div>
    );
};

export default AskDoubt;
