import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';

const DoubtsList = () => {
    const [doubts, setDoubts] = useState([]);
    const [selectedDoubt, setSelectedDoubt] = useState(null);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'doubts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const doubtsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDoubts(doubtsData);
        });
        return () => unsubscribe();
    }, []);

    const handleSelectDoubt = (doubt) => {
        setSelectedDoubt(doubt);
        setAnswer(doubt.answer || '');
    };

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDoubt) return;

        const doubtDocRef = doc(db, 'doubts', selectedDoubt.id);
        await updateDoc(doubtDocRef, {
            answer: answer,
        });

        setSelectedDoubt(null);
        setAnswer('');
        alert('Answer submitted successfully');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-bold mb-8">Doubts</h2>
            {doubts.map((doubt) => (
                <div key={doubt.id} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4">{doubt.title}</h3>
                    <p className="mb-4">{doubt.description}</p>
                    <p className="text-gray-700"><strong>Answer:</strong> {doubt.answer || 'No answer yet'}</p>
                    <button
                        onClick={() => handleSelectDoubt(doubt)}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Answer this doubt
                    </button>
                </div>
            ))}

            {selectedDoubt && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-2xl font-bold mb-4">{selectedDoubt.title}</h3>
                        <p className="mb-4">{selectedDoubt.description}</p>
                        <form onSubmit={handleAnswerSubmit}>
                            <textarea
                                placeholder="Your answer"
                                value={answer}
                                onChange={handleAnswerChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded"
                                rows="4"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                            >
                                Submit Answer
                            </button>
                            <button
                                onClick={() => setSelectedDoubt(null)}
                                className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoubtsList;
