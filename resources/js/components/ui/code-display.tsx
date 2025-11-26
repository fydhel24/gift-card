import { cn } from '@/lib/utils';

interface CodeDisplayProps {
    code: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function CodeDisplay({ code, className, size = 'md' }: CodeDisplayProps) {
    const sizeClasses = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-2',
        lg: 'text-base px-4 py-3'
    };

    return (
        <div className={cn(
            'font-mono bg-muted rounded break-all max-w-full',
            sizeClasses[size],
            className
        )}>
            {code}
        </div>
    );
}