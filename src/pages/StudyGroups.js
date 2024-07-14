import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

const StudyGroups = () => {
    const [groups, setGroups] = useState([]);
    const [subject, setSubject] = useState('');
    const [level, setLevel] = useState('');
    const [meetingTime, setMeetingTime] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            const querySnapshot = await getDocs(collection(db, 'studygroups'));
            const groupList = querySnapshot.docs.map(doc => doc.data());
            setGroups(groupList);  
        };


        fetchGroups();
    }, []);

    const handleCreateGroup = async () => {
        try {
            await addDoc(collection(db, 'studygroups'), {subject, level, meetingTime });
            alert('Group created successfully');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Study Groups</h1>
            <div className="flex space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="text"
                    placeholder="Level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="text"
                    placeholder="Meeting Time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={handleCreateGroup}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                    Create Group
                </button>
            </div>
            <h2 className="text-xl font-bold mb-2">Available Groups</h2>
            <ul className="space-y-4">
                {groups.map((group, index) => (
                    <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">{group.subject}</h3>
                        <p className="text-gray-600 mb-2">{group.level}</p>
                        <p className="text-gray-500">{group.meetingTime}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudyGroups;