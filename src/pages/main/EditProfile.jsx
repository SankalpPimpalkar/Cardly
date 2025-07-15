import React, { useEffect, useState, useTransition } from 'react';
import { ChevronLeft, Eye, EyeOff, Plus, X, Link as LinkIcon, LoaderCircle } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import appwrite from '../../lib/appwrite';

export default function EditProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [links, setLinks] = useState(user?.links || []);
    const [newLink, setNewLink] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [oldPassword, setOldPassword] = useState('')
    const [ShowOldPassword, setShowOldPassword] = useState(false)
    const [isSubmitting, startSubmittingTransition] = useTransition()

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name,
            bio,
            password: password || undefined,
            avatar: avatar || null,
            links,
            oldPassword: oldPassword || undefined
        };
        try {
            startSubmittingTransition(async () => {
                const { success, data } = await appwrite.UPDATE_PROFILE(payload)
                if (success) {
                    console.log(data)
                    navigate('/dashboard')
                }
            })

        } catch (error) {
            console.log("Failed to update profile")
        }
    };

    const addLink = () => {
        if (newLink.trim() && !links.includes(newLink)) {
            setLinks([...links, newLink]);
            setNewLink('');
            setShowLinkInput(false);
        }
    };

    const removeLink = (index) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    useEffect(() => {
        setName(user?.name || '')
        setBio(user?.bio || '')
        setAvatar(user?.avatar_id || '')
        setLinks(user?.links || [])
    }, [user])

    return (
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Edit Profile
                </h1>
                <button
                    onClick={() => navigate(-1)}
                    className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src={
                                avatar
                                    ? typeof (avatar) != "string" ? URL.createObjectURL(avatar) : avatar
                                    : user?.avatar_id || 'https://avatar.vercel.sh/default'
                            }
                            alt="Avatar"
                            className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            onError={(e) => {
                                e.target.src = 'https://avatar.vercel.sh/default';
                            }}
                        />
                        <label
                            htmlFor="avatar"
                            className="absolute -bottom-2 -right-2 bg-white border border-gray-200 rounded-full p-1.5 cursor-pointer hover:bg-gray-50"
                        >
                            <Plus size={16} className="text-gray-600" />
                            <input
                                type="file"
                                id="avatar"
                                accept=".jpg, .jpeg .png"
                                className="hidden"
                                onChange={(e) => setAvatar(e.target.files[0])}
                            />
                        </label>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Profile Picture</p>
                        <p className="text-xs text-gray-400">JPG, PNG (max 2MB)</p>
                    </div>
                </div>

                {/* Name */}
                <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
                        required
                    />
                </div>

                {/* Bio */}
                <div className="space-y-1">
                    <label htmlFor="bio" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell people about yourself"
                        className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 min-h-[100px]"
                        maxLength={200}
                    />
                    <p className="text-xs text-gray-400 text-right">{bio?.length}/200</p>
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label htmlFor="password" className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Update Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Leave blank to keep current"
                            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 pr-10"
                        />
                        <button
                            type="button"
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type={ShowOldPassword ? 'text' : 'password'}
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Old Password"
                            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 pr-10"
                        />
                        <button
                            type="button"
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowOldPassword(!ShowOldPassword)}
                        >
                            {ShowOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Links */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Social Links
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowLinkInput(!showLinkInput)}
                            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                        >
                            {showLinkInput ? <X size={18} /> : <Plus size={18} />}
                        </button>
                    </div>

                    {showLinkInput && (
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                placeholder="https://example.com"
                                className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
                            />
                            <button
                                type="button"
                                onClick={addLink}
                                className="bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    )}

                    <div className="space-y-2">
                        {links.length > 0 ? (
                            links.map((link, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <LinkIcon size={14} className="text-gray-500 flex-shrink-0" />
                                        <span className="text-sm text-gray-700 truncate">{link}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeLink(index)}
                                        className="text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 italic text-sm">No links added</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-800 text-white text-sm font-medium px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors mt-6 gap-3 disabled:bg-gray-600 flex items-center justify-center"
                >
                    {
                        isSubmitting ?
                            (
                                <>
                                    <LoaderCircle size={18} className='animate-spin' />
                                    <p>
                                        Updating Account Details
                                    </p>
                                </>
                            ) :
                            (
                                <p>
                                    Update details
                                </p>
                            )
                    }
                </button>
            </form>
        </div>
    );
}