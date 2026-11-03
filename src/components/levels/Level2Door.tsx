import React, { useState } from 'react';
import { Sparkles, Key, ArrowRight, Heart } from 'lucide-react';
import { BIRTHDAY_INFO } from '../../data/birthdayData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level2Props {
  onComplete: () => void;
}

export const Level2Door: React.FC<Level2Props> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDoor = () => {
    if (isOpen) return;
    sound.playDoorOpen();
    setIsOpen(true);
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f43f5e', '#a855f7'],
    });
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-8 text-center animate-fade-in">
      <div className="max-w-xl w-full mx-auto relative z-10 space-y-6">
        
        {/* Level Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-400/30">
          <span>Level 2</span>
          <span>•</span>
          <span>The Magical Door 🚪</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Unlock the Gate of Destiny ✨
        </h2>
        <p className="text-sm text-slate-300">
          Touch the enchanted door to open the doorway to Chota Don's 22nd year!
        </p>

        {/* 3D Door Chamber */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Glowing Archway Frame */}
          <div className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-t-full p-2 bg-gradient-to-b from-amber-400 via-rose-500 to-purple-800 shadow-[0_0_50px_rgba(251,191,36,0.35)] border border-amber-300/40">
            
            {/* Interior Reveal Content (Behind the door) */}
            <div className="w-full h-full rounded-t-full bg-gradient-to-b from-rose-950/80 via-purple-950/90 to-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden border border-amber-200/20">
              <div className="text-4xl mb-2 animate-bounce">👑</div>
              <h3 className="text-lg font-bold text-amber-200 font-display">
                Welcome to 22, Chota Don 🫀!
              </h3>
              <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                "Behind this door lies 365 days of triumph, glamour, happiness, and unforgettable adventures, prepared with love by British."
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-[11px] text-rose-300 bg-rose-500/20 px-3 py-1 rounded-full border border-rose-400/30">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" /> Forever Cherished
              </div>
            </div>

            {/* The Left Door Leaf */}
            <div
              onClick={handleOpenDoor}
              className={`absolute top-2 left-2 bottom-2 w-[calc(50%-8px)] rounded-tl-full bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 border-r border-t border-l border-amber-400/40 cursor-pointer transition-transform duration-1000 origin-left flex items-center justify-end pr-2 shadow-2xl ${
                isOpen ? '-rotate-y-110 opacity-30 pointer-events-none' : 'hover:brightness-110'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {!isOpen && (
                <div className="w-3 h-8 rounded-full bg-amber-400/80 shadow-[0_0_10px_#fbbf24] animate-pulse" />
              )}
            </div>

            {/* The Right Door Leaf */}
            <div
              onClick={handleOpenDoor}
              className={`absolute top-2 right-2 bottom-2 w-[calc(50%-8px)] rounded-tr-full bg-gradient-to-bl from-purple-900 via-indigo-950 to-slate-900 border-l border-t border-r border-amber-400/40 cursor-pointer transition-transform duration-1000 origin-right flex items-center justify-start pl-2 shadow-2xl ${
                isOpen ? 'rotate-y-110 opacity-30 pointer-events-none' : 'hover:brightness-110'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {!isOpen && (
                <div className="w-3 h-8 rounded-full bg-amber-400/80 shadow-[0_0_10px_#fbbf24] animate-pulse" />
              )}
            </div>

            {/* Prompt Pulse when closed */}
            {!isOpen && (
              <div
                onClick={handleOpenDoor}
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-20 group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 p-0.5 shadow-[0_0_30px_#f43f5e] group-hover:scale-110 transition-transform">
                  <div className="w-full h-full rounded-full bg-slate-950/80 flex items-center justify-center">
                    <Key className="w-6 h-6 text-amber-300 animate-pulse" />
                  </div>
                </div>
                <span className="mt-3 text-xs font-bold text-amber-200 tracking-wider uppercase bg-black/60 px-3 py-1 rounded-full border border-amber-400/30">
                  Click to Open
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Revealed Actions */}
        {isOpen && (
          <div className="animate-fade-in space-y-4 pt-2">
            <p className="text-xs sm:text-sm text-rose-300 font-medium">
              The magical realm has recognized Chota Don! Let the celebrations proceed. 🌟
            </p>
            <button
              onClick={() => {
                sound.playSparkle();
                onComplete();
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-xl shadow-rose-500/25 active:scale-95 transition-all"
            >
              <span>Enter Gift Kingdom</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
