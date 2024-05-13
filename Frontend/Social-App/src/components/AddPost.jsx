import React, { useState } from 'react';

const AddPost = () => {
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('image', image);
    
            // Retrieve authentication token from local storage or cookie
            const authToken = localStorage.getItem('AuthToken'); // Assuming you stored the token in local storage
    
            // Check if authToken is available
            if (!authToken) {
                throw new Error('Authentication token not found');
            }
            else{
                console.log(authToken)
            }
    
            // Assuming you have a backend running on localhost:5000
            const response = await fetch('http://localhost:5000/api/user/addposts', {
                method: 'POST',
                headers: {
                    'AuthToken': authToken, // Include the token in the Authorization header
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Failed to add post');
            }
    
            // Optionally, you can redirect the user or show a success message
        } catch (error) {
            console.error('Error adding post:', error);
            // Handle error, show error message, etc.
        }
    };

    
    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Add Post
            </button>
            {showModal && (
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Add New Post</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="description" className="block mb-2">Description:</label>
                                <input
                                    type="text"
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border border-gray-400 rounded-md px-3 py-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block mb-2">Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="border border-gray-400 rounded-md px-3 py-2 w-full"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddPost;
