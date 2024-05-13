import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaComment, FaHeart, FaSave } from 'react-icons/fa';
import img1 from '../assets/1.jpeg';
import imgg from '../assets/imgg.webp'

const Home = () => {
    const [likedImages, setLikedImages] = useState({}); // State to store liked images
    const [savedImages, setsavedImages] = useState({}); // State to store saved images

    const images = [
        {
            index: 1,
            image: {
                imageUrl: imgg,
                title: "First image",
                description: "Description for first image",
                user: {
                    name: "John Doe",
                    profilePic: img1
                }
            }
        },
        {
            index: 2,
            image: {
                imageUrl: imgg,
                title: "Second image",
                description: "Description for second image",
                user: {
                    name: "Jane Doe",
                    profilePic: img1
                }
            }
        },
        {
            index: 3,
            image: {
                imageUrl: imgg,
                title: "Second image",
                description: "Description for second image",
                user: {
                    name: "Jane Doe",
                    profilePic: img1
                }
            }
        },
        {
            index: 4,
            image: {
                imageUrl: imgg,
                title: "Second image",
                description: "Description for second image",
                user: {
                    name: "Jane Doe",
                    profilePic: img1
                }
            }
        },
        {
            index: 5,
            image: {
                imageUrl: imgg,
                title: "Second image",
                description: "Description for second image",
                user: {
                    name: "Jane Doe",
                    profilePic: img1
                }
            }
        },
        // Include other images similarly
    ];

    // Function to handle toggling like state
    const handleLikeToggle = (index) => {
        setLikedImages(prevLikedImages => ({
            ...prevLikedImages,
            [index]: !prevLikedImages[index]
        }));
    };

    // Function to handle toggling save state
    const handleSaveToggle = (index) => {
        setsavedImages(prevSavedImages => ({
            ...prevSavedImages,
            [index]: !prevSavedImages[index]
        }));
    };

    return (
        <div className="container mx-auto p-4 flex justify-center ">
            <div className="mt-8 ">
                {images.map((item, index) => (
                    <div key={index} className=" flex flex-col md:flex-row mb-4 border-4 border-black max-w-[1200px] xl:w-[920px] md:rounded-lg overflow-hidden">
                        <div className="md:w-1/2">
                            <img src={item.image.imageUrl} alt="Post Image" className="w-full rounded-lg" />
                        </div>
                        <div className="md:w-1/2 bg-black p-4 flex flex-col justify-between ">
                            <div className="flex flex-col items-start mb-4 gap-2">
                                <div className='flex'>
                                    <img src={item.image.user.profilePic} alt="User Icon" className="w-10 h-10 rounded-full mr-4" />
                                    <div>
                                        <p className="text-white">{item.image.user.name}</p>
                                        <p className="text-white">Posted on March 1, 2023</p>
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-white mb-2">{item.image.title}</h2>
                                <p className="text-white mb-2">{item.image.description}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className="h-[1px] bg-white"></div>
                                <div className="flex gap-4 text-white">
                                    <div onClick={() => handleLikeToggle(index)} style={{ cursor: 'pointer' }}>
                                        <FaHeart color={likedImages[index] ? 'red' : 'white'} className='text-2xl' />
                                    </div>
                                    <div>
                                        <FaComment className='text-2xl' />
                                    </div>
                                    <div onClick={() => handleSaveToggle(index)} style={{ cursor: 'pointer' }}>
                                        <FaSave color={savedImages[index] ? 'blue' : 'white'} className='text-2xl' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
