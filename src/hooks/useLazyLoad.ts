import { useState, useEffect, useRef, RefObject } from 'react';

interface UseLazyLoadOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useLazyLoad(
    options: UseLazyLoadOptions = {}
): [RefObject<HTMLElement>, boolean] {
    const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    if (triggerOnce) {
                        observer.disconnect();
                    }
                } else if (!triggerOnce) {
                    setIsIntersecting(false);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isIntersecting];
}