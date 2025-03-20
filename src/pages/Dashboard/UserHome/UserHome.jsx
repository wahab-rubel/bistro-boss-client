import useAuth from "../../../hooks/useAuth";
import { FaUserCircle, FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaBell, FaMoon, FaSun, FaShoppingCart, FaHeart, FaCog } from "react-icons/fa";
import { useState } from "react";

const UserHome = () => {
    const { user } = useAuth();
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`flex justify-center items-center min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-500 to-purple-600 text-gray-800"} p-6 relative transition-all duration-300`}>
            {/* Dark Mode Toggle */}
            <button 
                onClick={() => setDarkMode(!darkMode)}
                className="absolute top-6 right-6 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
            >
                {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-700" />}
            </button>

            <div className={`relative ${darkMode ? "bg-gray-800" : "bg-white"} bg-opacity-90 shadow-2xl rounded-2xl p-8 max-w-md text-center`}>
                {/* User Profile */}
                <div className="flex flex-col items-center">
                    {user?.photoURL ? (
                        <img 
                            src={user.photoURL} 
                            alt="User" 
                            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
                        />
                    ) : (
                        <FaUserCircle className="text-gray-300 text-7xl" />
                    )}

                    <h2 className="text-2xl font-bold mt-4">
                        Hi, Welcome {user?.displayName ? user.displayName : "Back"}!
                    </h2>
                    <p className="text-sm mt-1 opacity-75">
                        {user?.email ? user.email : "No Email Provided"}
                    </p>
                </div>

                {/* User Stats */}
                <div className="flex justify-around mt-6 text-lg font-semibold">
                    <div className="text-center">
                        <FaShoppingCart className="text-blue-500 text-2xl mx-auto" />
                        <p>Orders</p>
                        <p className="text-blue-600">12</p>
                    </div>
                    <div className="text-center">
                        <FaHeart className="text-red-500 text-2xl mx-auto" />
                        <p>Wishlist</p>
                        <p className="text-red-600">5</p>
                    </div>
                    <div className="text-center">
                        <FaCog className="text-gray-500 text-2xl mx-auto" />
                        <p>Settings</p>
                        <p className="text-gray-600">3</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex justify-center gap-4 mt-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-blue-600 text-2xl hover:text-blue-800 transition" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-blue-400 text-2xl hover:text-blue-600 transition" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-blue-700 text-2xl hover:text-blue-900 transition" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-gray-700 text-2xl hover:text-black transition" />
                    </a>
                </div>

                {/* Notifications & Actions */}
                <div className="mt-6">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
                        Explore Dashboard
                    </button>
                    <button className="ml-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow-md hover:bg-gray-300 transition">
                        <FaBell className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
