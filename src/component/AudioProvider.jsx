import React, { createContext, useContext, useEffect, useState, useRef } from "react";

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio("/assets/Way_Back_then.mp3"); // ✅ Correct path
            audioRef.current.loop = true;
        }

        const audio = audioRef.current;

        const playAudio = () => {
            audio.play().catch((e) => console.error("Autoplay blocked:", e));
        };

        if (isPlaying) {
            playAudio();
        } else {
            audio.pause();
        }

        return () => {
            audio.pause();
        };
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    return (
        <AudioContext.Provider value={{ isPlaying, togglePlay }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        console.warn("useAudio must be used within an AudioProvider");
        return { isPlaying: false, togglePlay: () => {} }; // Safe defaults
    }
    return context;
};
