import React, { useEffect } from 'react';
import { Sparkles, Heart, Crown, RotateCcw, Share2, Wand2, MessageCircleHeart, Trophy, Gift } from 'lucide-react';
import { BIRTHDAY_INFO } from '../../data/birthdayData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface FinalCelebrationProps {
  onRestart: () => void;
  onOpenChat: () => void;
  onOpenImageStudio: () => void;
  onOpenAchievements: () => void;
  onTriggerFireworks: () => void;
}

export const FinalCelebration: React.FC<FinalCelebrationProps> = ({
  onRestart,
  onOpenChat,
  onOpenImageStudio,
  onOpenAchievements,
  onTriggerFireworks,
}) => {
  useEffect(() => {
    sound.playFanfare();
    onTriggerFireworks();

    // Continuous celebration confetti rain
    const end = Date.now() + 4500;
    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fbbf24', '#c084fc', '#38bdf8', '#34d399'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#fbbf24', '#c084fc', '#38bdf8', '#34d399'],
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 text-center animate-fade-in relative z-20">
      <div className="max-w-3xl w-full mx-auto space-y-6 sm:space-y-8">
        
        {/* Floating Emblems */}
        <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl animate-bounce">
          <span>👑</span>
          <span>✨</span>
          <span>🎂</span>
          <span>🫀</span>
          <span>🎉</span>
        </div>

        {/* Giant Glowing Message */}
        <div className="space-y-2">
          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/30 to-amber-500/30 border border-amber-300/40 text-amber-200 text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-xl">
            🌟 AGE 22 • THE GRAND CELEBRATION 🌟
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display drop-shadow-[0_0_35px_rgba(244,63,94,0.6)]">
            🌟 HAPPY BIRTHDAY! 🌟🌟
          </h1>

          <p className="font-script text-3xl sm:text-5xl text-rose-300 drop-shadow-lg">
            Dearest {BIRTHDAY_INFO.name}
          </p>
        </div>

        {/* Personalized Birthday Blessing Card */}
        <div className="glass-panel-glow p-6 sm:p-10 rounded-3xl border-2 border-amber-400/50 shadow-2xl space-y-4 max-w-2xl mx-auto relative overflow-hidden bg-gradient-to-b from-purple-950/70 via-rose-950/70 to-slate-950/80">
          <div className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium">
            "Wishing the legendary <span className="text-amber-300 font-bold">{BIRTHDAY_INFO.displayName} {BIRTHDAY_INFO.heartIcon}</span> endless happiness, monumental success, glowing health, thrilling adventures, beautiful memories, unshakable confidence, and the brightest future imaginable!"
          </div>

          <p className="text-xs sm:text-sm text-slate-300 italic pt-2">
            "May your 22nd year be filled with genuine smiles, loyal companions, and dreams that unfold effortlessly before your eyes."
          </p>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-rose-300 font-bold flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> Lovingly Planned by {BIRTHDAY_INFO.createdBy}
            </span>
            <span className="text-amber-300 font-semibold">
              Forever 22 & Irreplaceable ✨
            </span>
          </div>
        </div>

        {/* Action Grid: Keepsake Studio, Fairy Chat, Achievements, Replay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4 max-w-2xl mx-auto">
          {/* AI Keepsake Studio */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenImageStudio();
            }}
            className="p-3.5 rounded-2xl glass-card-interactive border border-amber-400/40 text-left flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-200">
                Keepsake Studio
              </div>
              <div className="text-[10px] text-slate-400">
                Generate 4K Portraits
              </div>
            </div>
          </button>

          {/* Fairy Chat */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenChat();
            }}
            className="p-3.5 rounded-2xl glass-card-interactive border border-purple-400/40 text-left flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <MessageCircleHeart className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-purple-200">
                Fairy Companion
              </div>
              <div className="text-[10px] text-slate-400">
                Chat & Birthday Sonnets
              </div>
            </div>
          </button>

          {/* Achievements */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAchievements();
            }}
            className="p-3.5 rounded-2xl glass-card-interactive border border-yellow-400/40 text-left flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-yellow-200">
                View Trophies
              </div>
              <div className="text-[10px] text-slate-400">
                All 10 Badges Unlocked
              </div>
            </div>
          </button>
        </div>

        {/* Replay Adventure Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playSparkle();
              onRestart();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all active:scale-95 shadow-lg"
          >
            <RotateCcw className="w-4 h-4 text-rose-300" />
            <span>Replay the 22nd Birthday Adventure</span>
          </button>
        </div>

      </div>
    </div>
  );
};
