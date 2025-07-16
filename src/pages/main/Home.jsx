import React, { useEffect, useState } from 'react';
import { ArrowRight, LayoutDashboard, Link as LinkIcon, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import appwrite from '../../lib/appwrite';

export default function Home() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const { data, success } = await appwrite.GET_CURRENT_USER()
                if (success) {
                    setCurrentUser(data)
                }

            } catch (error) {
                setCurrentUser(null)
            }
        })();
    }, [navigate])

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Bar */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-gray-900">
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Cardly
                                </span>
                            </span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/u/shanky"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Demo
                            </Link>
                        </div>
                        {
                            currentUser ?
                                (
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-1"
                                    >
                                        <LayoutDashboard size={16} />
                                        Dashboard
                                    </button>
                                ) :
                                (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => navigate('/auth/signin')}
                                            className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-1"
                                        >
                                            <LogIn size={16} />
                                            Login
                                        </button>
                                        <button
                                            onClick={() => navigate('/auth/signup')}
                                            className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-1"
                                        >
                                            <UserPlus size={16} />
                                            Sign Up
                                        </button>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                    Share Your Digital Presence with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cardly</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                    A beautiful, customizable link hub to showcase all your important links in one place. Perfect for creators, professionals, and businesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/auth/signup')}
                        className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                        Get Started <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => navigate('/demo')}
                        className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                        See Demo
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Why Choose Cardly</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <LinkIcon className="text-blue-600" size={24} />,
                                title: "All Links in One Place",
                                description: "Share multiple links through a single, beautiful profile page."
                            },
                            {
                                icon: <div className="text-purple-600">🎨</div>,
                                title: "Customizable Design",
                                description: "Match your brand with customizable colors and layouts."
                            },
                            {
                                icon: <div className="text-green-600">📊</div>,
                                title: "Simple Analytics",
                                description: "Track visits and see which links get the most attention."
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Share Your Links?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Create your Cardly profile in minutes and start sharing your digital presence with the world.
                </p>
                <button
                    onClick={() => navigate('/auth/signup')}
                    className="bg-gray-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                    Create Your Profile Now
                </button>
            </div>
        </div>
    );
}