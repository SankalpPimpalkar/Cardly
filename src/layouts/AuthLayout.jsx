import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-black text-white flex size-6 items-center justify-center rounded-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M3 9h18" />
                                <path d="M9 21V9" />
                            </svg>
                        </div>
                        Cardly
                    </a>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <Outlet /> 
                    </div>
                </div>
            </div>

            <div className="bg-muted relative hidden lg:block">
                <img
                    src="/auth-bg.png"
                    alt="Decorative background"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />
                <div className="absolute bottom-8 left-8 text-white">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            "Cardly has transformed how I share my digital profile."
                        </p>
                        <footer className="text-sm">Sankalp Pimpalkar</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}