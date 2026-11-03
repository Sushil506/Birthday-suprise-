import React from 'react';
import { Sparkles, Heart, Crown, ArrowRight } from 'lucide-react';
import { BIRTHDAY_INFO } from '../../data/birthdayData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level1Props {
  onStart: () => void;
}

export const Level1Welcome: React.FC<Level1Props> = ({ onStart }) => {
  const handleStart = () => {
    sound.playSparkle();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#c084fc', '#ffffff'],
    });
    setTimeout(() => {
      onStart();
    }, 400);
  };

  return (
    <div className="relative min-h-[82vh] flex items-center justify-center px-4 py-8 text-center animate-fade-in">
      <div className="max-w-2xl w-full mx-auto relative z-10 space-y-6 sm:space-y-8">
        
        {/* Milestone Crown & Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-glow text-rose-300 text-xs sm:text-sm font-semibold animate-pulse-glow shadow-xl">
          <Crown className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>CELEBRATING 22 MAGICAL YEARS OF</span>
          <span className="text-white font-bold">{BIRTHDAY_INFO.displayName} {BIRTHDAY_INFO.heartIcon}</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-tight">
            Happy <span className="shimmer-text">22nd</span>
            <br />
            Birthday! 🎂✨
          </h1>
          <p className="font-script text-3xl sm:text-4xl md:text-5xl text-rose-300 drop-shadow-md">
            To the one and only {BIRTHDAY_INFO.name}
          </p>
        </div>

        {/* Personalized Welcome Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 max-w-xl mx-auto shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-rose-500/20 rounded-full blur-2xl group-hover:bg-rose-500/30 transition-all" />
          
          <div className="flex justify-center mb-3">
            <span className="text-4xl animate-bounce">🫀</span>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            Welcome to your enchanted birthday universe! Today, we celebrate your beauty, your fearless spirit, your infectious laughter, and 22 glorious chapters of your story.
          </p>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-rose-300 font-medium">
            <span>Specially crafted with endless love by</span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-white font-bold border border-rose-400/30">
              {BIRTHDAY_INFO.createdBy} ✨
            </span>
          </div>
        </div>

        {/* Glowing Animated Button: "Start the Surprise 🌟" */}
        <div className="pt-2">
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-3xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:via-pink-600 hover:to-purple-700 shadow-[0_0_35px_rgba(244,63,94,0.5)] hover:shadow-[0_0_55px_rgba(244,63,94,0.8)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 border border-rose-300/40"
          >
            <Sparkles className="w-5 h-5 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Start the Surprise 🌟</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Floating Emblems */}
        <div className="flex items-center justify-center gap-6 text-slate-400 text-xs pt-4">
          <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" /> 10 Magical Quests</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-300" /> Interactive Memories</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Crown className="w-4 h-4 text-purple-400" /> 22nd Milestone</span>
        </div>

      </div>
    </div>
  );
};
