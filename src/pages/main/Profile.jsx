import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwrite from "../../lib/appwrite";
import SocialLinkButton from "../../components/SocialLinkButton";
import { Copy, Check, LoaderCircle } from "lucide-react";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const { username } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const { data, success } = await appwrite.GET_PROFILE({ username });
                if (success) {
                    setUser(data);
                }
            } catch (error) {
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        })();
    }, [username]);

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
    }, [username, user])

    const copyProfileLink = () => {
        const profileUrl = `${window.location.origin}/u/${username}`;
        navigator.clipboard.writeText(profileUrl)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    if (isLoading) {
        return (
            <div className='w-full min-h-dvh flex items-center justify-center'>
                <LoaderCircle size={32} className='animate-spin' />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex flex-col select-none">
            <div className="flex-grow max-w-md mx-auto px-6 py-10 w-full">
                <div className="flex flex-col items-center">
                    {/* Profile content remains the same */}
                    <div className="mb-6">
                        <img
                            draggable={false}
                            className="w-32 h-32 rounded-full object-cover border border-gray-100"
                            src={user?.avatar_id || "https://avatar.vercel.sh/default"}
                            alt={user?.name}
                            onError={(e) => {
                                e.target.src = "https://avatar.vercel.sh/default";
                            }}
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {user?.name || username}
                    </h1>

                    {user?.proffession && (
                        <p className="text-gray-500 text-sm font-medium mb-4">
                            {user.proffession}
                        </p>
                    )}

                    {user?.bio && (
                        <p className="text-gray-600 text-center text-xs max-w-md leading-relaxed mb-8">
                            {user.bio}
                        </p>
                    )}

                    <div className="w-full space-y-3">
                        <h2 className="text-sm font-medium text-gray-400 text-center mb-2">
                            CONNECT WITH ME
                        </h2>
                        <div className="space-y-3 w-full">
                            {user?.links?.length > 0 ? (
                                user.links.map((link, index) => (
                                    <SocialLinkButton key={index} link={link} />
                                ))
                            ) : (
                                <p className="text-gray-400 text-center py-4 text-sm">
                                    No links available
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 pb-8 max-w-md mx-auto w-full space-y-2">
                <button
                    onClick={copyProfileLink}
                    className={`w-full py-3 px-4 border rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer ${isCopied
                        ? "bg-green-100 border-green-300 text-green-700"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                >
                    {isCopied ? (
                        <>
                            <Check size={16} />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy size={16} />
                            Copy Profile Link
                        </>
                    )}
                </button>
                {
                    currentUser?.$id == user?.$id ? (
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-3 px-4 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Dashboard
                        </button>
                    ) :
                        (
                            <button
                                onClick={() => navigate('/auth/signup')}
                                className="w-full py-3 px-4 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Create your profile
                            </button>
                        )
                }
            </div>
        </div>
    );
}