import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const PostList = () => {
    const[posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const postsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsList);
        };

        fetchPosts();
    }, []);

    return (
        <div className='max-w-xl mx-auto p-4'>
            <h2 className='text-2xl font-bold mb-4'>Posts</h2>
            {posts.map(post => (
                <div key={post.id} className='p-4 border roundend-lg shadow-md mb-4'>
                    <h3 className='text-xl font-bold'>{post.title}</h3>
                    <p>{post.content}</p>
                </div>    
            ))}
        </div> 
    );
};

export default PostList;