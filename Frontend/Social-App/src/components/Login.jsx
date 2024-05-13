import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import SignLog from './Alerts/SignLog'; // Import the SignLog component for displaying alerts

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the alert
    const [errorMessage, setErrorMessage] = useState(''); // State to hold the error message
    const [icon, setIcon] = useState(''); // State to determine the icon for the alert

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            });
            const json = await response.json();
            if (json.AuthToken) {
                setIcon('success');
                setErrorMessage('Log in Successful');
                setShowAlert(true);
                console.log(json.AuthToken)
                localStorage.setItem('AuthToken',json.AuthToken)
            }
            // else{
            //     console.log(json.error)
            // }
            else if (json.error === 'Please enter correct credentials') {
                setIcon('error');
                setErrorMessage('Incorrect password');
                setShowAlert(true);
            }else if (json.error === 'Your email is incorrect!'){
                setIcon('warning');
                setErrorMessage('User with this email does not exist');
                setShowAlert(true);
            }
            else{
                setIcon('warning');
                setErrorMessage('Some Server Error occured! Please try again later');
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to handle closing the alert
    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>
                {showAlert && (
                    <SignLog
                        icon={icon}
                        title={errorMessage}
                        confirmation={true}
                        onClose={handleCloseAlert} // Pass onClose handler to the SignLog component
                    />
                )}
                <p className="mt-4 text-sm text-gray-600 text-center">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
