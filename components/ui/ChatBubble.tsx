import React from 'react';

interface ChatBubbleProps {
    message: string;
    type: 'sent' | 'received';
    timestamp?: string;
    senderName?: string;
}

export default function ChatBubble({ message, type, timestamp, senderName }: ChatBubbleProps) {
    const isSent = type === 'sent';

    return (
        <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`max-w-[75%] ${isSent ? 'order-2' : 'order-1'}`}>
                {!isSent && senderName && (
                    <p className="text-xs text-gray-600 mb-1 px-2">{senderName}</p>
                )}
                <div
                    className={`rounded-lg px-4 py-2 ${isSent
                            ? 'bg-chat-sent text-gray-900 rounded-br-none'
                            : 'bg-chat-received text-gray-900 rounded-bl-none shadow-sm'
                        }`}
                >
                    <p className="text-sm leading-relaxed">{message}</p>
                    {timestamp && (
                        <p className="text-xs text-gray-500 mt-1 text-right">{timestamp}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSend: () => void;
    placeholder?: string;
    onVoiceClick?: () => void;
}

export function ChatInput({ value, onChange, onSend, placeholder = 'Type a message...', onVoiceClick }: ChatInputProps) {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="flex items-center gap-2 p-3 bg-white border-t border-gray-200">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {onVoiceClick && (
                <button
                    onClick={onVoiceClick}
                    className="p-2 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
                    aria-label="Voice input"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>
            )}
            <button
                onClick={onSend}
                disabled={!value.trim()}
                className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </button>
        </div>
    );
}
