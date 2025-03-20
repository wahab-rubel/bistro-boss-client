import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [cart] = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    return (
        <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-opacity-80 bg-gray-900 text-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/" className="text-3xl font-extrabold text-yellow-400 tracking-wide">
                    Bistro Boss
                </Link>
                
                {/* Desktop Navigation */}
                <ul className="hidden lg:flex space-x-6 text-lg">
                    <li><Link to="/" className="hover:text-yellow-400 transition-all">Home</Link></li>
                    <li><Link to="/menu" className="hover:text-yellow-400 transition-all">Our Menu</Link></li>
                    <li><Link to="/order/salad" className="hover:text-yellow-400 transition-all">Order Food</Link></li>
                    {user && isAdmin && <li><Link to="/dashboard/adminHome" className="hover:text-yellow-400">Dashboard</Link></li>}
                    {user && !isAdmin && <li><Link to="/dashboard/userHome" className="hover:text-yellow-400">Dashboard</Link></li>}
                </ul>
                
                {/* Cart & User Actions */}
                <div className="flex items-center space-x-6">
                    <Link to="/dashboard/cart" className="relative">
                        <FaShoppingCart className="text-2xl hover:text-yellow-400 transition-all" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <button
                            onClick={handleLogOut}
                            className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-md shadow-lg"
                        >
                            Log Out
                        </button>
                    ) : (
                        <Link to="/login" className="bg-yellow-400 hover:bg-yellow-500 transition-all text-black px-4 py-2 rounded-md shadow-lg">
                            Login
                        </Link>
                    )}
                </div>
                
                {/* Mobile Menu Button */}
                <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className="lg:hidden flex flex-col items-center bg-gray-800 w-full py-4 space-y-4">
                    <li><Link to="/" className="hover:text-yellow-400 transition-all">Home</Link></li>
                    <li><Link to="/menu" className="hover:text-yellow-400 transition-all">Our Menu</Link></li>
                    <li><Link to="/order/salad" className="hover:text-yellow-400 transition-all">Order Food</Link></li>
                    {user && isAdmin && <li><Link to="/dashboard/adminHome" className="hover:text-yellow-400">Dashboard</Link></li>}
                    {user && !isAdmin && <li><Link to="/dashboard/userHome" className="hover:text-yellow-400">Dashboard</Link></li>}
                </ul>
            )}
        </nav>
    );
};

export default NavBar;