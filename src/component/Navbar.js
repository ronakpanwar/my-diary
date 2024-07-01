import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";


function Navbar() {
    const [user, setUser] = useState({ name: '', content: '', tag: '' });

    const getUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/user/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'auth-token': localStorage.getItem('token')
                }
            });
            const jsonData = await response.json();
            setUser({
                ...user,
                name: jsonData.name,
                content: jsonData.content,
                tag: jsonData.tag
            });
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }
    
    useEffect(()=>{
        getUserInfo()
    });

        const navigate = useNavigate();
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };

        const LogOut = () => {
            localStorage.removeItem('token');
            navigate('/sign-in');
        };

        return (
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        {/* Mobile menu button */}
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className="block h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Logo and navigation links */}
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0">
                              
                            </div>
                            <div className="hidden sm:ml-6 sm:flex space-x-4">
                                <a
                                    href="/"
                                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                                <a
                                    href="/add-note"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Add Notes
                                </a>
                            </div>
                        </div>

                        {/* Right-hand side icons */}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* Notification bell */}
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="sr-only">View notifications</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                            </button>

                            {/* User profile dropdown */}
                            <div className="relative ml-3 ">
                                <button
                                    type="button"
                                    className="relative flex items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded={isMenuOpen}
                                    aria-haspopup="true"
                                    onClick={toggleMenu}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <i className="far fa-user text-gray-400 p-1"></i> {/* Replace "fa-regular" with "far" for regular icons */}
                                    <span className="text-white">{user.name}</span> {/* Adjust text color as needed */}
                                    <svg
                                        className="ml-2 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        {/* Your SVG icon code */}

                                        <path
                                            fillRule="evenodd"
                                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown menu */}
                                {isMenuOpen && (
                                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                        <a href="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                                            Your Profile
                                        </a>
                                        <a href="/sign-in" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                                            Sign in
                                        </a>
                                        <a href="/sign-up" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                                            Sign Up
                                        </a>
                                        <a href="" className="block px-4 py-2 text-sm text-gray-700" onClick={LogOut} role="menuitem">
                                            Log Out
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">
                            HOME
                        </a>
                        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Add Notes
                        </a>

                    </div>
                </div>
            </nav >
        );
    }

    export default Navbar;
