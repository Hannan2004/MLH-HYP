import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const CreateStudyGroups = () => {
    const [groups, setGroups] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'studygroups'));
                const groupList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setGroups(groupList);
            } catch (error) {
                console.error('Error fetching study groups: ', error);
            }
        };

        fetchGroups();
    }, []);

    const handleCreateGroup = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'studygroups'), {
                name,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
            });
            alert('Group created successfully');
            setName('');
            setDescription('');
            setTags('');
        } catch (error) {
            alert('Error creating group: ' + error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Study Groups</h1>
            <form onSubmit={handleCreateGroup} className="mb-4">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Group Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 mt-4"
                >
                    Create Group
                </button>
            </form>
            <h2 className="text-xl font-bold mb-2">Groups Made by You</h2>
            <ul className="space-y-4">
                {groups.map((group, index) => (
                    <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">{group.name}</h3>
                        <p className="text-gray-600 mb-2">{group.description}</p>
                        <p className="text-gray-500">{group.tags && group.tags.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateStudyGroups;
