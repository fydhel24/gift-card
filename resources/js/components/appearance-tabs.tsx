import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLButtonElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const toggleAppearance = () => {
        updateAppearance(appearance === 'light' ? 'dark' : 'light');
    };

    const Icon = appearance === 'light' ? Sun : Moon;

    return (
        <button
            onClick={toggleAppearance}
            className={cn(
                'flex items-center rounded-md px-2 py-2 transition-colors text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                className,
            )}
            {...props}
        >
            <Icon className="h-4 w-4" />
        </button>
    );
}
