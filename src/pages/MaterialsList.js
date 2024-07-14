import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const MaterialsList = () => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'materials'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const materialsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMaterials(materialsData);
        });
        return () => unsubscribe();
    }, []);

    const groupBySubject = (materials) => {
        return materials.reduce((groups, material) => {
            const subject = material.subject;
            if (!groups[subject]) {
                groups[subject] = [];
            }
            groups[subject].push(material);
            return groups;
        }, {});
    };

    const groupedMaterials = groupBySubject(materials);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {Object.keys(groupedMaterials).map((subject) => (
                <div key={subject} className="mb-8 bg-blue-900 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4 text-white">{subject}</h3>
                    <ul>
                        {groupedMaterials[subject].map((material) => (
                            <li key={material.id} className="mb-2">
                                <a href={material.url} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                                    {material.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MaterialsList;
