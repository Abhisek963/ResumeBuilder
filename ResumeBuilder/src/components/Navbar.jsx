import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/features/authSlice";
import React from "react";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogoutUser = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="sticky top-0 z-50 bg-[#0F0D1A]/90 backdrop-blur-md border-b border-violet-500/15">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3.5 text-white">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/Rlogo.png" alt="logo" className="w-auto h-11" />
                </Link>

                {/* Center nav links (public only) */}
                {!user && (
                    <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
                        <a href="#features" className="hover:text-white transition">Features</a>
                        <a href="#templates" className="hover:text-white transition">Templates</a>
                        <a href="#contact" className="hover:text-white transition">Contact</a>
                    </div>
                )}

                {/* Right section */}
                <div className="flex items-center gap-4 text-sm">
                    {user ? (
                        <>
                            <p className="hidden sm:block text-zinc-400">
                                Hi, <span className="font-medium text-white">{user?.name}</span>
                            </p>
                            <button
                                onClick={LogoutUser}
                                className="px-5 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50
                  text-zinc-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/40
                  active:scale-95 transition-all duration-200 text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/app?state=login"
                                className="text-zinc-400 hover:text-white transition text-sm"
                            >
                                Login
                            </Link>
                            <Link
                                to="/app?state=register"
                                className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-[0_0_16px_rgba(139,92,246,0.35)] hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;