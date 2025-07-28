import '../../index.css';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function PageWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();

    return (
        <div className={`flex flex-col w-screen h-screen items-center text-gray-200 relative ${className}`}>
            {(isFetching > 0 || isMutating > 0) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
                    <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            {children}
            <ReactQueryDevtools />
        </div>
    )
}   