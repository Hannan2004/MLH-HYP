import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [meetLink, setMeetLink] = useState('');

    const handleCreateEvent = async () => {
        if (!title || !description || !date || !meetLink) return;

        try {
            await addDoc(collection(db, 'events'), {
                title,
                description,
                date,
                meetLink,
                createdAt: new Date(),
            });
            setTitle('');
            setDescription('');
            setDate('');
            setMeetLink('');
            alert('Event created successfully');
        } catch (error) {
            alert(error.message);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  from-green-400 via-blue-500 to-purple-500">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-3xl font-bold mb-4 text-gray-700">Create Event</h2>
            <input
                type="text"
                placeholder="Title"
                value = {title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                placeholder="Description"
                value = {description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                type="date"
                placeholder="Date"
                value = {date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                type="text"
                placeholder="Google Meet Link"
                value = {meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />   
            <button
                onClick={handleCreateEvent}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
                Create Event
                </button>     
            </div>  
        </div>
    );
};

export default CreateEvent;