import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Eye } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import SocialLinkButton from '../../components/SocialLinkButton';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [showAddLinkInput, setShowAddLinkInput] = useState(false);
    const [newLink, setNewLink] = useState('');
    console.log(user)

    const handleAddLink = () => {
        if (!newLink.trim()) return;
        console.log('Updating links with:', newLink);
        setShowAddLinkInput(false);
        setNewLink('');
    };

    return (
        <div className="w-full min-w-0 px-4 py-6 sm:px-6 sm:py-10 mx-auto max-w-3xl overflow-x-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words min-w-0">
                    Hello, {user?.name}
                </h1>
                <div className="flex gap-2 w-full sm:w-auto min-w-0">
                    <button
                        onClick={() => navigate(`/u/${user?.username}`)}
                        className="flex-1 sm:flex-none py-2 px-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-xs min-w-0"
                    >
                        <Eye size={16} className="flex-shrink-0" />
                        <span className="truncate">View Profile</span>
                    </button>
                    <button
                        onClick={() => navigate('/edit-profile')}
                        className="flex-1 sm:flex-none py-2 px-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-xs min-w-0 truncate"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100 w-full min-w-0">
                <div className="min-w-0">
                    <p className="text-sm text-gray-500 truncate">Profile Views</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{user?.visits || 0}</p>
                </div>
                <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                    Last 7 days
                </span>
            </div>

            {/* Profile Info */}
            <div className="flex items-center gap-4 py-4 border-b border-gray-100 w-full min-w-0">
                <img
                    draggable={false}
                    src={user?.avatar_id || 'https://avatar.vercel.sh/default'}
                    alt="Avatar"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-200 flex-shrink-0"
                    onError={(e) => {
                        e.target.src = 'https://avatar.vercel.sh/default';
                    }}
                />
                <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{user?.name}</h2>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>
            </div>

            {/* User Details */}
            <div className="space-y-4 sm:space-y-6 w-full min-w-0 mt-2">
                {/* Username */}
                <div className="space-y-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                        Username
                    </p>
                    <p className="text-gray-700 font-bold text-sm truncate">
                        {user?.username ? `@${user.username}` : 'Not set'}
                    </p>
                </div>

                {/* Social Links */}
                <div className="space-y-3 min-w-0">
                    <div className="flex items-center justify-between min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                            Social Links
                        </p>
                        <button
                            onClick={() => setShowAddLinkInput(!showAddLinkInput)}
                            className="text-gray-500 hover:text-gray-700 transition-colors p-1 flex-shrink-0"
                        >
                            {showAddLinkInput ? <X size={18} /> : <Plus size={18} />}
                        </button>
                    </div>

                    {showAddLinkInput && (
                        <div className="flex flex-col sm:flex-row gap-2 pt-2 w-full min-w-0">
                            <input
                                type="url"
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 min-w-0"
                            />
                            <button
                                onClick={handleAddLink}
                                className="w-full sm:w-24 bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    )}

                    <div className="space-y-2 min-w-0">
                        {user?.links?.length > 0 ? (
                            user.links.map((link, index) => (
                                <div key={index} className="min-w-0">
                                    <SocialLinkButton link={link} />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 italic text-sm">No links added</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}