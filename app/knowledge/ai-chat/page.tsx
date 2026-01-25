'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/ui/BottomNav';
import ChatBubble, { ChatInput } from '@/components/ui/ChatBubble';
import VoiceInput, { speak } from '@/components/ui/VoiceInput';
import { ArrowLeft, Volume2 } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    type: 'sent' | 'received';
    timestamp: string;
}

export default function AIChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'नमस्ते! मैं AI कृषि मित्र हूँ। मैं खेती से जुड़े आपके सवालों का जवाब दे सकता हूँ। आप क्या जानना चाहते हैं?',
            type: 'received',
            timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [inputValue, setInputValue] = useState('');

    const commonQuestions = [
        'गेहूं की बुवाई कब करें?',
        'कपास में कीट कैसे रोकें?',
        'मंडी भाव कैसे चेक करें?',
        'खाद कब डालें?',
    ];

    const getAIResponse = (question: string): string => {
        const lowerQuestion = question.toLowerCase();

        if (lowerQuestion.includes('गेहूं') && lowerQuestion.includes('बुवाई')) {
            return 'गेहूं की बुवाई नवंबर-दिसंबर में करें। तापमान 20-25°C होना चाहिए। बीज दर: 100-125 kg प्रति हेक्टेयर। पंक्ति से पंक्ति की दूरी 20-23 cm रखें।';
        }

        if (lowerQuestion.includes('कपास') && (lowerQuestion.includes('कीट') || lowerQuestion.includes('कीड़े'))) {
            return 'कपास में मुख्य कीट: सफेद मक्खी, गुलाबी सुंडी। रोकथाम: 1) नीम का तेल स्प्रे करें 2) फेरोमोन ट्रैप लगाएं 3) जरूरत पर ही कीटनाशक का उपयोग करें। हमेशा कृषि विशेषज्ञ से सलाह लें।';
        }

        if (lowerQuestion.includes('मंडी') && lowerQuestion.includes('भाव')) {
            return 'मंडी भाव देखने के लिए: 1) ऐप में "भाव देखें" पर जाएं 2) अपनी फसल चुनें 3) आसपास की मंडियों के भाव देखें। आप हर दिन ताज़ा भाव देख सकते हैं।';
        }

        if (lowerQuestion.includes('खाद')) {
            return 'खाद डालने का सही समय: 1) बुवाई के समय - DAP/NPK 2) 20-25 दिन बाद - यूरिया 3) फूल आने पर - पोटाश। मिट्टी परीक्षण जरूर करवाएं।';
        }

        return 'यह अच्छा सवाल है! मैं इस बारे में विस्तृत जानकारी के लिए आपको ज्ञान केंद्र में भेज रहा हूँ। वहां आपको पूरी जानकारी मिलेगी।';
    };

    const handleSend = (text?: string) => {
        const messageText = text || inputValue.trim();
        if (!messageText) return;

        // Add user message
        const userMessage: Message = {
            id: messages.length + 1,
            text: messageText,
            type: 'sent',
            timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, userMessage]);
        setInputValue('');

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: messages.length + 2,
                text: getAIResponse(messageText),
                type: 'received',
                timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, aiResponse]);
        }, 1000);
    };

    const handleVoiceResult = (transcript: string) => {
        setInputValue(transcript);
        handleSend(transcript);
    };

    const handleSpeak = (text: string) => {
        speak(text, 'hi-IN');
    };

    return (
        <div className="min-h-screen bg-chat-bg flex flex-col">
            {/* Header */}
            <header className="bg-primary-600 text-white p-4 shadow-lg flex items-center gap-3">
                <button onClick={() => router.back()}>
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex-1">
                    <h1 className="text-xl font-bold">AI कृषि मित्र</h1>
                    <p className="text-xs text-primary-100">हमेशा मदद के लिए तैयार</p>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 pb-32">
                {messages.map((message) => (
                    <div key={message.id} className="mb-2">
                        <ChatBubble
                            message={message.text}
                            type={message.type}
                            timestamp={message.timestamp}
                            senderName={message.type === 'received' ? 'AI कृषि मित्र' : undefined}
                        />
                        {message.type === 'received' && (
                            <button
                                onClick={() => handleSpeak(message.text)}
                                className="ml-2 text-xs text-gray-600 hover:text-primary-600 flex items-center gap-1"
                            >
                                <Volume2 className="w-3 h-3" />
                                सुनें
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
                <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600 mb-2">आम सवाल:</p>
                    <div className="flex flex-wrap gap-2">
                        {commonQuestions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(q)}
                                className="px-3 py-2 bg-white rounded-full text-sm text-gray-700 border border-gray-300 hover:bg-gray-50"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe-bottom">
                <div className="flex items-center gap-2 p-3">
                    <VoiceInput onResult={handleVoiceResult} language="hi-IN" />
                    <ChatInput
                        value={inputValue}
                        onChange={setInputValue}
                        onSend={() => handleSend()}
                        placeholder="अपना सवाल पूछें..."
                    />
                </div>
            </div>
        </div>
    );
}
