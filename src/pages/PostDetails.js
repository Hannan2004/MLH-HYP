import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc, addDoc, collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await getDoc(doc(db, 'posts', postId));
      if (postDoc.exists()) {
        setPost(postDoc.data());
      }
    };

    const fetchComments = async () => {
      const q = query(collection(db, 'comments'), where('postId', '==', postId));
      const querySnapshot = await getDocs(q);
      const commentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsList);
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (commentContent.trim() === '') {
      alert('Comment content is required.');
      return;
    }

    try {
      await addDoc(collection(db, 'comments'), {
        postId,
        content: commentContent,
        createdAt: Timestamp.fromDate(new Date())
      });
      setCommentContent('');
      // Re-fetch comments to update the list
      const fetchComments = async () => {
        const q = query(collection(db, 'comments'), where('postId', '==', postId));
        const querySnapshot = await getDocs(q);
        const commentsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setComments(commentsList);
      };
      fetchComments(); // Call fetchComments after adding a new comment
      alert('Comment added successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p>{post.content}</p>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Comments</h3>
        {comments.map(comment => (
          <div key={comment.id} className="p-2 border rounded mb-2">
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea
          placeholder="Add a comment"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        ></textarea>
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
