import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<><Navbar/><Home/></>} />
                <Route path="/signup" element={<Signin/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </Router>
    );
}

export default App;
