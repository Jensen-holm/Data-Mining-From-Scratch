import React from 'react';

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded flex items-center">
                <p>Loading</p>
                <div className="w-4 h-4 rounded-full bg-black ml-2 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-black ml-2 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-black ml-2 animate-bounce"></div>
            </div>
        </div>
    );
};

export default Loading;