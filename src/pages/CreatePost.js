import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore'; 

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleCreatePost = async () => {
        if(title.trim()=== '' || content.trim() === '') {
            alert('Title and content are required');
            return;
        }

        try {
            await addDoc(collection(db, 'posts'), {
                title,
                content,
                createdAt: Timestamp.fromDate(new Date())
            });
            setTitle('');
            setContent('');
            alert('Post created successfully');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          ></textarea>
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
    );   
}

export default CreatePost;