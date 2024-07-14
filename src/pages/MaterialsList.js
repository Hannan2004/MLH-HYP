import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import Modal from './Modal'; // Add a Modal component for preview

const MaterialsList = () => {
    const [materials, setMaterials] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState(null);

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

    const handleRatingSubmit = async () => {
        if (selectedMaterial && rating > 0 && comment) {
            const materialRef = doc(db, 'materials', selectedMaterial.id);
            await updateDoc(materialRef, {
                ratings: arrayUnion({ rating, comment, createdAt: new Date() })
            });
            setRating(0);
            setComment('');
            setSelectedMaterial(null);
        }
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
                                <button
                                    onClick={() => setPreviewUrl(material.url)}
                                    className="ml-4 text-sm text-white bg-green-500 hover:bg-green-600 rounded px-2 py-1"
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => setSelectedMaterial(material)}
                                    className="ml-4 text-sm text-white bg-yellow-500 hover:bg-yellow-600 rounded px-2 py-1"
                                >
                                    Rate & Comment
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            {previewUrl && (
                <Modal url={previewUrl} onClose={() => setPreviewUrl(null)} />
            )}
            {selectedMaterial && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl mb-4">Rate & Comment</h2>
                        <div className="mb-4">
                            <label className="block mb-2">Rating</label>
                            <input
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded"
                                min="1"
                                max="5"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Comment</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                        <button
                            onClick={handleRatingSubmit}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setSelectedMaterial(null)}
                            className="ml-4 text-red-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterialsList;
