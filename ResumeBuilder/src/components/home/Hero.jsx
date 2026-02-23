import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import resume from '../../assets/resume.png'
const Hero = () => {
    const { user } = useSelector((state) => state.auth);
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <div className="bg-gray-200 text-slate-900 min-h-screen">

            {/* ================= NAVBAR ================= */}
            <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-40 py-6">
                <img src="Rlogo.png" alt="logo" className="h-10 w-auto" />

                <div className="hidden md:flex items-center gap-10 text-sm font-medium">
                    <a href="#features" className="hover:text-indigo-600 transition">
                        Features
                    </a>
                    <a href="#templates" className="hover:text-indigo-600 transition">
                        Templates
                    </a>
                    <a href="#contact" className="hover:text-indigo-600 transition">
                        Contact
                    </a>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {!user && (
                        <>
                            <Link
                                to="/app?state=login"
                                className="text-sm hover:text-indigo-600 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/app?state=register"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm transition"
                            >
                                Get Started
                            </Link>
                        </>
                    )}

                    {user && (
                        <Link
                            to="/app"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm transition"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="md:hidden"
                >
                    ☰
                </button>
            </nav>

            {/* ================= MOBILE MENU ================= */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur flex flex-col items-center justify-center gap-8 text-white text-lg z-50">
                    <a href="#features">Features</a>
                    <a href="#templates">Templates</a>
                    <a href="#contact">Contact</a>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="bg-indigo-600 px-6 py-2 rounded-lg"
                    >
                        Close
                    </button>
                </div>
            )}

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 md:px-16 lg:px-24 xl:px-40 pt-20 pb-32">

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* LEFT SIDE */}
                    <div className="max-w-xl">

                        <p className="text-indigo-600 font-semibold text-sm tracking-widest uppercase mb-4">
                            Professional Resume Builder
                        </p>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Build a resume that
                            <span className="block text-indigo-600 mt-2">
                                gets you hired.
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                            Create clean, modern, and ATS-friendly resumes in minutes.
                            Choose a template, add your details, and download instantly.
                        </p>

                        <div className="mt-8">
                            <Link
                                to="/app"
                                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition"
                            >
                                Start Building →
                            </Link>
                        </div>

                        <p className="mt-6 text-sm text-slate-500">
                            No design skills needed. No complicated setup.
                        </p>

                    </div>

                    {/* RIGHT SIDE – PRODUCT PREVIEW */}
                    <div className="relative">

                        <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>

                        <div className="relative bg-white border rounded-xl shadow-2xl p-4">
                            <img
                                src = {resume}
                                alt="Resume Preview"
                                className="rounded-lg"
                            />
                        </div>

                    </div>

                </div>

            </section>
        </div>
    );
};

export default Hero;