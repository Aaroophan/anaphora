import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LazyGridProps {
    children: ReactNode[];
    className?: string;
    itemsPerLoad?: number;
    loadMoreThreshold?: number;
    renderItem: (item: ReactNode, index: number) => ReactNode;
}

export const LazyGrid = ({
    children,
    className = '',
    itemsPerLoad = 6,
    loadMoreThreshold = 0.8,
    renderItem
}: LazyGridProps) => {
    const [visibleItems, setVisibleItems] = useState(itemsPerLoad);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || isLoading) return;

            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

            if (scrollPercentage >= loadMoreThreshold && visibleItems < children.length) {
                setIsLoading(true);

                // Simulate loading delay for better UX
                setTimeout(() => {
                    setVisibleItems(prev => Math.min(prev + itemsPerLoad, children.length));
                    setIsLoading(false);
                }, 300);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [children.length, itemsPerLoad, loadMoreThreshold, visibleItems, isLoading]);

    return (
        <div ref={containerRef} className={`overflow-y-auto ${className}`}>
            <div className="grid gap-4">
                {children.slice(0, visibleItems).map((child, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: index >= visibleItems - itemsPerLoad ? (index % itemsPerLoad) * 0.1 : 0
                        }}
                    >
                        {renderItem(child, index)}
                    </motion.div>
                ))}
            </div>

            {isLoading && (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}

            {visibleItems >= children.length && children.length > itemsPerLoad && (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    All items loaded
                </div>
            )}
        </div>
    );
};