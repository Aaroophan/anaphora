import { lazy, Suspense, ComponentType } from 'react';
import { Spinner } from './Spinner';

interface LazyComponentProps {
    fallback?: React.ReactNode;
    className?: string;
}

export function createLazyComponent<T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: React.ReactNode
) {
    const LazyComponent = lazy(importFunc);

    return function LazyWrapper(props: React.ComponentProps<T> & LazyComponentProps) {
        const { fallback: customFallback, className, ...componentProps } = props;

        return (
            <Suspense
                fallback={
                    customFallback || fallback || (
                        <div className={`flex justify-center items-center p-8 ${className || ''}`}>
                            <Spinner size={32} />
                        </div>
                    )
                }
            >
                <LazyComponent {...componentProps} />
            </Suspense>
        );
    };
}