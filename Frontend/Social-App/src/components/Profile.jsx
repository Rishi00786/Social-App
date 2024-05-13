// Profile.jsx

import React from 'react';
import AddPost from './AddPost';
import profile from '../assets/1.jpeg';

const Profile = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-center items-center my-4">
                <div className="flex items-center">
                    <img className="rounded-full mr-4 w-80 h-80" src={profile} alt="Profile" />
                    <h1 className="text-3xl font-bold">Username</h1>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Edit Profile
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {/* Display posts here */}
                {/* Example: <Post /> components */}
            </div>
            {/* <AddPost /> */}
        </div>
    );
};

export default Profile;
