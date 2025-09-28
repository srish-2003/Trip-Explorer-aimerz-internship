import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
    const navigate = useNavigate();
    const activeLinkStyle = { color: '#16a34a', textDecoration: 'underline' };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/user"><img src={assets.logo} alt="Trip Explorer Logo" className="h-32 w-auto" /></Link>
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink to="/home" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-700 hover:text-green-700 transition">Home</NavLink>
                        <NavLink to="/create-trip" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-700 hover:text-green-700 transition">Create Trip</NavLink>
                        {/* <NavLink to="/account" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-700 hover:text-green-700 transition">My Account</NavLink> */}
                    </nav>
                    <button onClick={handleLogout} className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition">Logout</button>
                </div>
            </div>
        </header>
    );
};
export default Navbar;