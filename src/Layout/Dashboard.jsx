import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaHome, FaUtensils, FaList, FaUsers, FaShoppingCart, FaAd, FaMoon, FaSun } from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            {/* Sidebar */}
            <div className={`h-screen p-5 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} bg-opacity-80 backdrop-blur-md bg-gray-800 text-white shadow-lg`}> 
                <button className="mb-4 text-xl" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <FaBars />
                </button>
                <ul className="space-y-4">
                    {isAdmin ? (
                        <>
                            <li><NavLink to="/dashboard/adminHome" className="flex items-center gap-2 hover:text-yellow-400"><FaHome /> {!isCollapsed && "Admin Home"}</NavLink></li>
                            <li><NavLink to="/dashboard/addItems" className="flex items-center gap-2 hover:text-yellow-400"><FaUtensils /> {!isCollapsed && "Add Items"}</NavLink></li>
                            <li><NavLink to="/dashboard/manageItems" className="flex items-center gap-2 hover:text-yellow-400"><FaList /> {!isCollapsed && "Manage Items"}</NavLink></li>
                            <li><NavLink to="/dashboard/users" className="flex items-center gap-2 hover:text-yellow-400"><FaUsers /> {!isCollapsed && "All Users"}</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/dashboard/userHome" className="flex items-center gap-2 hover:text-yellow-400"><FaHome /> {!isCollapsed && "User Home"}</NavLink></li>
                            <li><NavLink to="/dashboard/cart" className="flex items-center gap-2 hover:text-yellow-400"><FaShoppingCart /> {!isCollapsed && `My Cart (${cart.length})`}</NavLink></li>
                            <li><NavLink to="/dashboard/review" className="flex items-center gap-2 hover:text-yellow-400"><FaAd /> {!isCollapsed && "Add a Review"}</NavLink></li>
                        </>
                    )}
                    <div className="divider"></div>
                    <li><NavLink to="/" className="flex items-center gap-2 hover:text-yellow-400"><FaHome /> {!isCollapsed && "Home"}</NavLink></li>
                    <li><NavLink to="/order/menu" className="flex items-center gap-2 hover:text-yellow-400"><FaList /> {!isCollapsed && "Menu"}</NavLink></li>
                    <li><NavLink to="/order/contact" className="flex items-center gap-2 hover:text-yellow-400"><FaUtensils /> {!isCollapsed && "Contact"}</NavLink></li>
                    <button className="flex items-center gap-2 mt-4" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <FaSun /> : <FaMoon />} {!isCollapsed && (darkMode ? "Light Mode" : "Dark Mode")}
                    </button>
                </ul>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-8 transition-all duration-300">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;