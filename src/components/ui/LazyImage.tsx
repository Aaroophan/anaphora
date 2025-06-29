import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Spinner } from './Spinner';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackSrc?: string;
    threshold?: number;
    onLoad?: () => void;
    onError?: () => void;
}

export const LazyImage = ({
    src,
    alt,
    className = '',
    fallbackSrc,
    threshold = 0.1,
    onLoad,
    onError
}: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    useEffect(() => {
        if (isInView && !isLoaded && !hasError) {
            setIsLoading(true);
            const img = new Image();

            img.onload = () => {
                setIsLoaded(true);
                setIsLoading(false);
                onLoad?.();
            };

            img.onerror = () => {
                setHasError(true);
                setIsLoading(false);
                onError?.();
            };

            img.src = src;
        }
    }, [isInView, src, isLoaded, hasError, onLoad, onError]);

    const handleImageError = () => {
        if (fallbackSrc && !hasError) {
            setHasError(true);
            if (imgRef.current) {
                imgRef.current.src = fallbackSrc;
            }
        }
    };

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <Spinner size={24} />
                </div>
            )}

            {isInView && (
                <motion.img
                    ref={imgRef}
                    src={hasError && fallbackSrc ? fallbackSrc : src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => {
                        setIsLoaded(true);
                        setIsLoading(false);
                        onLoad?.();
                    }}
                    onError={handleImageError}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{
                        opacity: isLoaded ? 1 : 0,
                        scale: isLoaded ? 1 : 1.1
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            )}

            {!isInView && (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
        </div>
    );
};