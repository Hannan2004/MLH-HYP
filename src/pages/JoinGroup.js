import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const JoinGroup = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'studygroups'));
                const groupList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setGroups(groupList);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    const handleJoinGroup = async (groupId) => {
        try {
            const groupDocRef = doc(db, 'studygroups', groupId);
            // Update logic based on how you want to handle the join operation
            // For example, you could add the user to a 'members' array in Firestore
            await updateDoc(groupDocRef, {
                // members: arrayUnion(currentUser.uid) // Assuming you have a user ID
            });
            alert('Joined group successfully');
        } catch (error) {
            console.error('Error joining group:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"> {/* Added bg-gray-100 for background color */}
            <h1 className="text-3xl font-bold mb-4">Join Groups</h1>
            <ul className="space-y-4">
            {groups.map((group, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold">{group.name}</h3>
                        <p className="text-gray-600 mb-2">{group.description}</p>
                        <p className="text-gray-500">{group.tags && group.tags.join(', ')}</p>
                    </div>
                    <button
                        onClick={() => handleJoinGroup(group.id)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                    >
                        Join Group
                    </button>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default JoinGroup;
