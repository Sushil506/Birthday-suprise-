import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, ArrowRight, Heart, Play, FastForward, Check } from 'lucide-react';
import { SECRET_LETTER_TEXT, BIRTHDAY_INFO } from '../../data/birthdayData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level9Props {
  onComplete: () => void;
}

export const Level9Letter: React.FC<Level9Props> = ({ onComplete }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  const handleOpenEnvelope = () => {
    sound.playSparkle();
    setIsOpened(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#ffffff'],
    });
  };

  // Typewriter effect
  useEffect(() => {
    if (!isOpened || isTypingDone) return;

    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      if (index >= SECRET_LETTER_TEXT.length) {
        setDisplayedText(SECRET_LETTER_TEXT);
        setIsTypingDone(true);
        clearInterval(interval);
      } else {
        setDisplayedText(SECRET_LETTER_TEXT.slice(0, index));
      }
    }, 28);

    return () => clearInterval(interval);
  }, [isOpened, isTypingDone]);

  const handleSkipTyping = () => {
    setDisplayedText(SECRET_LETTER_TEXT);
    setIsTypingDone(true);
  };

  return (
    <div className="relative min-h-[82vh] px-4 py-8 max-w-4xl mx-auto flex flex-col justify-between animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-2 relative z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-400/30">
          <span>Level 9</span>
          <span>•</span>
          <span>Secret Letter 💌</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          A Message from the Heart
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          {isOpened
            ? "A handwritten letter written just for Chota Don by British on this 22nd birthday milestone."
            : "An envelope sealed with wax awaits you. Break the seal to read what British wrote for you."}
        </p>
      </div>

      {/* Envelope or Parchment Letter */}
      <div className="my-6 flex flex-col items-center justify-center">
        {!isOpened ? (
          <div
            onClick={handleOpenEnvelope}
            className="group cursor-pointer p-8 rounded-3xl glass-panel-glow border-2 border-rose-400/50 shadow-[0_0_50px_rgba(244,63,94,0.35)] flex flex-col items-center justify-center hover:scale-105 transition-all text-center max-w-sm w-full"
          >
            {/* Wax Sealed Envelope */}
            <div className="relative my-4">
              <span className="text-7xl sm:text-8xl filter drop-shadow-xl block">
                💌
              </span>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-rose-600 border-2 border-amber-300 flex items-center justify-center text-amber-200 text-xs font-bold shadow-lg animate-pulse">
                🫀
              </div>
            </div>

            <div className="space-y-1 mt-2">
              <span className="text-xs uppercase tracking-widest text-rose-300 font-bold">
                Private & Confidential
              </span>
              <h3 className="text-lg font-bold text-white font-display">
                To: Chota Don 🫀
              </h3>
              <p className="text-xs text-slate-300">
                From: British ✨
              </p>
            </div>

            <div className="mt-5 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg group-hover:shadow-rose-500/50 transition-all flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Break Wax Seal</span>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl glass-panel p-6 sm:p-8 rounded-3xl border border-amber-300/30 shadow-2xl relative overflow-hidden animate-fade-in bg-gradient-to-b from-[#180e29]/90 to-[#100720]/95">
            {/* Decorative Gold Header Stamp */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🫀</span>
                <div>
                  <div className="text-xs font-bold text-amber-300 font-display uppercase tracking-wider">
                    Chapter 22 • The Royal Letter
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Handwritten with love by British
                  </div>
                </div>
              </div>

              {!isTypingDone && (
                <button
                  onClick={handleSkipTyping}
                  className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-amber-200 flex items-center gap-1 transition-all"
                >
                  <FastForward className="w-3.5 h-3.5" /> Skip typing
                </button>
              )}
            </div>

            {/* Typewritten Body */}
            <div className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal whitespace-pre-wrap min-h-[220px]">
              {displayedText}
              {!isTypingDone && (
                <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse" />
              )}
            </div>

            {/* Postscript Footer */}
            {isTypingDone && (
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-rose-300 animate-fade-in">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> Sealed forever with affection
                </span>
                <span className="font-bold text-amber-300">
                  British & Chota Don 🫀
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation to FINAL CELEBRATION */}
      <div className="text-center pt-2 relative z-20">
        <button
          onClick={() => {
            sound.playFanfare();
            onComplete();
          }}
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base transition-all ${
            isOpened
              ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 hover:from-amber-500 hover:via-rose-600 text-white shadow-2xl shadow-rose-500/40 active:scale-95'
              : 'bg-white/10 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          <span>
            {isOpened
              ? 'Launch the Grand Finale Celebration! 🎉🎂✨'
              : 'Read the letter to unlock Final Celebration'}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
