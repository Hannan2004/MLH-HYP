import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import StudyGroups from './pages/StudyGroups';
import FileUpload from './pages/FileUpload';
import MaterialsList from './pages/MaterialsList';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import PostList from './pages/PostList';
import CreateEvent from './pages/CreateEvents';
import EventsList from './pages/EventsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studygroups" element={<StudyGroups />} />
        <Route path="/fileupload" element={<FileUpload />} />
        <Route path="/materials" element={<MaterialsList />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events-list" element={<EventsList />} /> 
      </Routes>
    </Router>
  );
}

export default App;
