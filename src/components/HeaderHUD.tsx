import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Trophy, MessageCircleHeart, Wand2, Bell, BellOff } from 'lucide-react';
import { sound } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

interface HeaderHUDProps {
  currentLevel: number;
  totalLevels: number;
  unlockedAchievementsCount: number;
  totalAchievementsCount: number;
  musicEnabled: boolean;
  sfxEnabled: boolean;
  onToggleMusic: () => void;
  onToggleSfx: () => void;
  onOpenAchievements: () => void;
  onOpenChat: () => void;
  onOpenImageStudio: () => void;
  onJumpToLevel?: (lvl: number) => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  currentLevel,
  totalLevels,
  unlockedAchievementsCount,
  totalAchievementsCount,
  musicEnabled,
  sfxEnabled,
  onToggleMusic,
  onToggleSfx,
  onOpenAchievements,
  onOpenChat,
  onOpenImageStudio,
}) => {
  const [easterEggActive, setEasterEggActive] = useState(false);

  const triggerEasterEgg = () => {
    sound.playSparkle();
    setEasterEggActive(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.1 },
      colors: ['#f43f5e', '#fbbf24', '#c084fc', '#ffffff'],
    });
    setTimeout(() => setEasterEggActive(false), 3000);
  };

  const progressPct = Math.min(100, Math.round((currentLevel / totalLevels) * 100));

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 shadow-2xl border border-white/10">
        
        {/* Left: Celebrant Badge & Easter Egg */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={triggerEasterEgg}
            title="Click for a magical British Easter Egg!"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-rose-500/20 to-purple-500/20 hover:from-rose-500/30 hover:to-purple-500/30 border border-rose-400/30 transition-all transform active:scale-95 group text-left"
          >
            <span className="text-lg animate-bounce">🫀</span>
            <div>
              <div className="text-xs font-bold text-rose-300 flex items-center gap-1">
                Chota Don
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/30 text-rose-200">22</span>
              </div>
              <div className="text-[10px] text-slate-400 group-hover:text-rose-200 transition-colors">
                by British ✨
              </div>
            </div>
          </button>

          {/* Level Tracker */}
          <div className="hidden md:flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
              {currentLevel > 9 ? 'Final Celebration' : `Level ${currentLevel} of 9`}
            </span>
            <div className="w-28 sm:w-36 h-1.5 bg-slate-800/80 rounded-full overflow-hidden mt-1 border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Center / Right: Interactive Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* AI Fairy Chat Companion */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenChat();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-medium transition-all shadow-lg hover:shadow-purple-500/20 active:scale-95"
            title="Chat with Fairy Astraea (AI Multi-Turn Companion)"
          >
            <MessageCircleHeart className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
            <span className="hidden sm:inline">Fairy Chat</span>
          </button>

          {/* AI Keepsake Portrait Studio */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenImageStudio();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-medium transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95"
            title="Generate 22nd Birthday Keepsake Portraits (Gemini 3 Pro Image)"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">AI Studio</span>
          </button>

          {/* Achievements Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAchievements();
            }}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/40 text-yellow-300 text-xs font-medium transition-all active:scale-95"
            title="View Achievements"
          >
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[11px]">{unlockedAchievementsCount}/{totalAchievementsCount}</span>
          </button>

          {/* Audio Toggles */}
          <div className="flex items-center border-l border-white/10 pl-1.5 sm:pl-2 gap-1">
            {/* Music */}
            <button
              onClick={() => {
                sound.playClick();
                onToggleMusic();
              }}
              title={musicEnabled ? 'Mute Background Music' : 'Play Ambient Music'}
              className={`p-1.5 rounded-xl border transition-all ${
                musicEnabled
                  ? 'bg-rose-500/25 border-rose-400/50 text-rose-200'
                  : 'bg-slate-800/60 border-slate-700/50 text-slate-400'
              }`}
            >
              {musicEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* SFX */}
            <button
              onClick={() => {
                sound.playClick();
                onToggleSfx();
              }}
              title={sfxEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              className={`p-1.5 rounded-xl border transition-all ${
                sfxEnabled
                  ? 'bg-amber-500/25 border-amber-400/50 text-amber-200'
                  : 'bg-slate-800/60 border-slate-700/50 text-slate-400'
              }`}
            >
              {sfxEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Secret Easter Egg Toast */}
      {easterEggActive && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 glass-panel-glow px-4 py-2 rounded-2xl text-center text-xs text-rose-200 font-semibold animate-bounce z-50 border border-rose-400/50 shadow-2xl">
          💌 British whispered: "You are the coolest Chota Don in the universe! Happy 22nd!" 🫀✨
        </div>
      )}
    </header>
  );
};
