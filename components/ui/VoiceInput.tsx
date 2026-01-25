'use client';

import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInputProps {
    onResult: (transcript: string) => void;
    language?: string;
    continuous?: boolean;
}

export default function VoiceInput({ onResult, language = 'hi-IN', continuous = false }: VoiceInputProps) {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);

    useEffect(() => {
        // Check if Web Speech API is supported
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            if (SpeechRecognition) {
                setIsSupported(true);
                const recognitionInstance = new SpeechRecognition();
                recognitionInstance.continuous = continuous;
                recognitionInstance.interimResults = false;
                recognitionInstance.lang = language;

                recognitionInstance.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    onResult(transcript);
                    setIsListening(false);
                };

                recognitionInstance.onerror = (event: any) => {
                    console.error('Speech recognition error:', event.error);
                    setIsListening(false);
                };

                recognitionInstance.onend = () => {
                    setIsListening(false);
                };

                setRecognition(recognitionInstance);
            }
        }
    }, [language, continuous, onResult]);

    const toggleListening = () => {
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            recognition.start();
            setIsListening(true);
        }
    };

    if (!isSupported) {
        return null; // Don't render if not supported
    }

    return (
        <button
            onClick={toggleListening}
            className={`p-3 rounded-full transition-all ${isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                }`}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
    );
}

/**
 * Text-to-Speech utility
 */
export function speak(text: string, language: string = 'hi-IN') {
    if (typeof window === 'undefined') return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9; // Slightly slower for clarity

    synth.speak(utterance);
}

/**
 * Stop any ongoing speech
 */
export function stopSpeaking() {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
}
