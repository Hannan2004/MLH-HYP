import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaUsers, FaUpload, FaBook, FaPen, FaList, FaCalendarPlus, FaCalendarAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-[240px] bg-gray-800 text-white h-screen flex flex-col justify-between fixed">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Community Platform</h2>
        <ul>
          <li className="mb-2">
            <Link to="/join-group" className="flex items-center text-white hover:text-gray-400">
              <FaUsers className="mr-2" /> Join Groups
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/create-study-groups" className="flex items-center text-white hover:text-gray-400">
              <FaCalendarPlus className="mr-2" /> Create Study Group
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/fileupload" className="flex items-center text-white hover:text-gray-400">
              <FaUpload className="mr-2" /> Share Resources
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/materials" className="flex items-center text-white hover:text-gray-400">
              <FaBook className="mr-2" /> Resources
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/ask-doubt" className="flex items-center text-white hover:text-gray-400">
              <FaPen className="mr-2" /> Ask a doubt
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/doubts" className="flex items-center text-white hover:text-gray-400">
              <FaList className="mr-2" /> Doubts
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/create-event" className="flex items-center text-white hover:text-gray-400">
              <FaCalendarPlus className="mr-2" /> Host an Event
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/events-list" className="flex items-center text-white hover:text-gray-400">
              <FaCalendarAlt className="mr-2" /> Join an event
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <button
          className="flex items-center text-white hover:text-gray-400 w-full text-left mt-auto"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
