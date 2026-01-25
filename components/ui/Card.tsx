import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
}

export default function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
    const hoverStyles = hoverable ? 'hover:shadow-card-hover cursor-pointer' : '';

    return (
        <div
            className={`bg-white rounded-lg shadow-card p-4 ${hoverStyles} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
    return (
        <div className="flex items-start justify-between mb-3">
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`text-gray-700 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>{children}</div>;
}
