import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateStudyGroups from './pages/CreateStudyGroups';
import FileUpload from './pages/FileUpload';
import MaterialsList from './pages/MaterialsList';
import AskDoubt from './pages/AskDoubt';
import DoubtsList from './pages/Doubts';
import CreateEvent from './pages/CreateEvents';
import EventsList from './pages/EventsList';
import Sidebar from './components/Sidebar';
import JoinGroup from './pages/JoinGroup';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-4 ml-[240px]">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-study-groups" element={<CreateStudyGroups />} />
            <Route path="/fileupload" element={<FileUpload />} />
            <Route path="/materials" element={<MaterialsList />} />
            <Route path="/ask-doubt" element={<AskDoubt />} />
            <Route path="/doubts" element={<DoubtsList />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/events-list" element={<EventsList />} />
            <Route path="/join-group" element={<JoinGroup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
