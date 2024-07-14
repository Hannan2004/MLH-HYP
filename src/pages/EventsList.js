import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const EventsList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'events'), orderBy('date', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const eventsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEvents(eventsData);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="min-h-screen p-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white">
            <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
            {events.map((event) => (
                <div key={event.id} className="mb-4 p-4 bg-white text-gray-800 rounded shadow-lg">
                    <h2 className="text-2xl font-bold">{event.title}</h2>
                    <p className="mb-2">{event.description}</p>
                    <p className="mb-2">{new Date(event.date).toDateString()}</p>
                    <a href={event.meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        Join The Workshop
                    </a>
                </div>
            ))}
        </div>
    );    
};

export default EventsList;