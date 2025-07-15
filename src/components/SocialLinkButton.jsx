import React from 'react';
import {
    Linkedin,
    Instagram,
    Twitter,
    Github,
    Globe,
    Youtube,
    Link as LinkIcon,
} from 'lucide-react';

// Custom OnlyFans icon component
const OnlyFansIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="fill-current">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 1.5c5.799 0 10.5 4.701 10.5 10.5S17.799 22.5 12 22.5 1.5 17.799 1.5 12 6.201 1.5 12 1.5zm-3 8.25a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h6a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75H9z"/>
  </svg>
);

const PLATFORM_MAP = {
    linkedin: {
        name: 'LinkedIn',
        icon: Linkedin,
        color: 'text-[#0077b5]',
        bg: 'bg-[#0077b5]/10 hover:bg-[#0077b5]/20',
    },
    instagram: {
        name: 'Instagram',
        icon: Instagram,
        color: 'text-transparent bg-clip-text bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#dc2743]',
        bg: 'bg-[#e6683c]/10 hover:bg-[#e6683c]/20',
    },
    twitter: {
        name: 'Twitter',
        icon: Twitter,
        color: 'text-[#000000]',
        bg: 'bg-[#000000]/10 hover:bg-[#000000]/20',
    },
    x: {
        name: 'X (Twitter)',
        icon: Twitter,
        color: 'text-[#000000]',
        bg: 'bg-[#000000]/10 hover:bg-[#000000]/20', 
    },
    github: {
        name: 'GitHub',
        icon: Github,
        color: 'text-gray-800',
        bg: 'bg-gray-800/10 hover:bg-gray-800/20',
    },
    youtube: {
        name: 'YouTube',
        icon: Youtube,
        color: 'text-[#FF0000]',
        bg: 'bg-[#FF0000]/10 hover:bg-[#FF0000]/20',
    },
    onlyfans: {
        name: 'OnlyFans',
        icon: OnlyFansIcon, // Using the component directly
        color: 'text-[#00aff0]',
        bg: 'bg-[#00aff0]/10 hover:bg-[#00aff0]/20',
    },
    website: {
        name: 'Website',
        icon: Globe,
        color: 'text-gray-700',
        bg: 'bg-gray-700/10 hover:bg-gray-700/20',
    },
    default: {
        name: 'Visit Link',
        icon: LinkIcon,
        color: 'text-gray-600',
        bg: 'bg-gray-600/10 hover:bg-gray-600/20',
    }
};

function detectPlatform(url) {
    if (!url) return 'default';
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('linkedin.com')) return 'linkedin';
    if (lowerUrl.includes('instagram.com')) return 'instagram';
    if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return 'x';
    if (lowerUrl.includes('github.com')) return 'github';
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return 'youtube';
    if (lowerUrl.includes('onlyfans.com')) return 'onlyfans';
    if (lowerUrl.startsWith('http')) return 'website';
    return 'default';
}

export default function SocialLinkButton({ link }) {
    const platformKey = detectPlatform(link);
    const platform = PLATFORM_MAP[platformKey] || PLATFORM_MAP.default;

    // Safely extract hostname
    let hostname = '';
    try {
        hostname = new URL(link).hostname.replace('www.', '');
    } catch {
        hostname = link.length > 20 ? `${link.substring(0, 20)}...` : link;
    }

    const IconComponent = platform.icon;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors ${platform.bg}`}
        >
            <div className={`${platform.color} flex-shrink-0`}>
                <IconComponent size={18} />
            </div>
            <span className="text-gray-800 font-medium text-sm">
                {platform.name}
            </span>
            <span className="ml-auto text-xs text-gray-500 truncate max-w-[120px]">
                {hostname}
            </span>
        </a>
    );
}