import React, { useState } from 'react';
import { storage, db } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [subject, setSubject] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleUpload = async () => {
        if (!file || !subject) return;

        const storageRef = ref(storage, `materials/${subject}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.error(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await addDoc(collection(db, 'materials'), {
                    subject,
                    name: file.name,
                    url: downloadURL,
                    createdAt: new Date(),
                });
                setFile(null);
                setSubject('');
                alert('File uploaded successfully');
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-3xl font-bold mb-4 text-white">Upload Material</h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button
                    onClick={handleUpload}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default FileUpload;
