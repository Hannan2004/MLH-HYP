import React from 'react';

const Modal = ({ url, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
                <button onClick={onClose} className="mb-4 text-red-500">Close</button>
                <iframe src={url} className="w-full h-96"></iframe>
            </div>
        </div>
    );
};

export default Modal;
