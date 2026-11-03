import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { FireworksCanvas } from './components/FireworksCanvas';
import { HeaderHUD } from './components/HeaderHUD';
import { AIChatModal } from './components/AIChatModal';
import { AIImageModal } from './components/AIImageModal';
import { AchievementsModal } from './components/AchievementsModal';
import { Level1Welcome } from './components/levels/Level1Welcome';
import { Level2Door } from './components/levels/Level2Door';
import { Level3Gifts } from './components/levels/Level3Gifts';
import { Level4Butterflies } from './components/levels/Level4Butterflies';
import { Level5Balloons } from './components/levels/Level5Balloons';
import { Level6Stars } from './components/levels/Level6Stars';
import { Level7Treasure } from './components/levels/Level7Treasure';
import { Level8Cake } from './components/levels/Level8Cake';
import { Level9Letter } from './components/levels/Level9Letter';
import { FinalCelebration } from './components/levels/FinalCelebration';
import { Achievement, BIRTHDAY_INFO } from './data/birthdayData';
import { sound } from './utils/soundEngine';
import { Sparkles, Crown } from 'lucide-react';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'welcome', title: 'The Royal Awakening', description: 'Began Chota Don\'s 22nd Birthday Adventure.', icon: '🌟', unlocked: true },
  { id: 'door', title: 'Gatekeeper of 22', description: 'Unlocked the Magical Door of Destiny.', icon: '🚪', unlocked: false },
  { id: 'gifts', title: 'Gift Collector', description: 'Unwrapped magical wishes in the Gift Kingdom.', icon: '🎁', unlocked: false },
  { id: 'butterflies', title: 'Butterfly Whisperer', description: 'Caught glowing butterflies and discovered hidden compliments.', icon: '🦋', unlocked: false },
  { id: 'balloons', title: 'Joy Popper', description: 'Popped celebratory balloons in Balloon World.', icon: '🎈', unlocked: false },
  { id: 'stars', title: 'Celestial Stargazer', description: 'Gathered the 5 stars in the celestial night sky.', icon: '⭐', unlocked: false },
  { id: 'treasure', title: 'Sovereign of Wishes', description: 'Opened the Treasure Chest of 30 glowing blessings.', icon: '💎', unlocked: false },
  { id: 'candles', title: 'Flame of 22', description: 'Illuminated all 22 birthday candles on the grand cake.', icon: '🎂', unlocked: false },
  { id: 'letter', title: 'Heartfelt Reader', description: 'Unsealed the confidential letter from British.', icon: '💌', unlocked: false },
  { id: 'finale', title: 'Queen of the Day', description: 'Reached the Grand Finale Celebration.', icon: '👑', unlocked: false },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [fireworksActive, setFireworksActive] = useState(false);

  // Modals
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isImageStudioOpen, setIsImageStudioOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  // Unlock achievement helper
  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a))
    );
  };

  // Premium loading screen simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 15;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  // Music & SFX handler
  const handleToggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    sound.setMusicEnabled(next);
  };

  const handleToggleSfx = () => {
    const next = !sfxEnabled;
    setSfxEnabled(next);
    sound.setSfxEnabled(next);
  };

  const triggerFireworksBurst = () => {
    setFireworksActive(true);
    setTimeout(() => {
      // Keep fireworks running if in final celebration, else turn off after 12s
      if (currentLevel !== 10) {
        setFireworksActive(false);
      }
    }, 12000);
  };

  // Level Progression Handlers
  const handleNextLevel = () => {
    setCurrentLevel((lvl) => {
      const next = lvl + 1;
      if (next === 2) unlockAchievement('door');
      if (next === 4) unlockAchievement('gifts');
      if (next === 5) unlockAchievement('butterflies');
      if (next === 6) unlockAchievement('balloons');
      if (next === 7) unlockAchievement('stars');
      if (next === 8) unlockAchievement('treasure');
      if (next === 9) unlockAchievement('candles');
      if (next === 10) {
        unlockAchievement('letter');
        unlockAchievement('finale');
        setFireworksActive(true);
      }
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentLevel(1);
    setFireworksActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b051d] text-white p-4 select-none">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.6)] animate-pulse">
            <span className="text-4xl animate-bounce">🫀</span>
          </div>
          <Sparkles className="w-6 h-6 text-amber-300 absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold font-display text-center mb-1">
          Chota Don's 22nd Birthday Adventure
        </h1>
        <p className="text-xs text-rose-300/80 mb-6 font-medium">
          Enchanted realm lovingly prepared by British...
        </p>

        {/* Progress bar */}
        <div className="w-56 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/10 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <span className="text-[11px] text-slate-400 mt-2 font-mono">
          Weaving magical starlight {loadingProgress}%
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b051d] text-slate-100 relative overflow-x-hidden pt-20 pb-16">
      
      {/* Background Ambience */}
      <ParticleBackground />

      {/* Fireworks Engine */}
      <FireworksCanvas active={fireworksActive || currentLevel === 10} />

      {/* Header HUD */}
      <HeaderHUD
        currentLevel={currentLevel}
        totalLevels={10}
        unlockedAchievementsCount={unlockedCount}
        totalAchievementsCount={achievements.length}
        musicEnabled={musicEnabled}
        sfxEnabled={sfxEnabled}
        onToggleMusic={handleToggleMusic}
        onToggleSfx={handleToggleSfx}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenImageStudio={() => setIsImageStudioOpen(true)}
      />

      {/* Main Adventure Stage */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6">
        {currentLevel === 1 && (
          <Level1Welcome onStart={handleNextLevel} />
        )}
        {currentLevel === 2 && (
          <Level2Door onComplete={handleNextLevel} />
        )}
        {currentLevel === 3 && (
          <Level3Gifts onComplete={handleNextLevel} />
        )}
        {currentLevel === 4 && (
          <Level4Butterflies onComplete={handleNextLevel} />
        )}
        {currentLevel === 5 && (
          <Level5Balloons onComplete={handleNextLevel} />
        )}
        {currentLevel === 6 && (
          <Level6Stars onComplete={handleNextLevel} />
        )}
        {currentLevel === 7 && (
          <Level7Treasure onComplete={handleNextLevel} />
        )}
        {currentLevel === 8 && (
          <Level8Cake
            onComplete={handleNextLevel}
            onTriggerFireworks={triggerFireworksBurst}
          />
        )}
        {currentLevel === 9 && (
          <Level9Letter onComplete={handleNextLevel} />
        )}
        {currentLevel >= 10 && (
          <FinalCelebration
            onRestart={handleRestart}
            onOpenChat={() => setIsChatOpen(true)}
            onOpenImageStudio={() => setIsImageStudioOpen(true)}
            onOpenAchievements={() => setIsAchievementsOpen(true)}
            onTriggerFireworks={triggerFireworksBurst}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="text-center py-6 text-xs text-slate-400/80 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/5">
          <span>Created with</span>
          <span className="text-rose-400">🫀</span>
          <span>by</span>
          <span className="text-white font-semibold">{BIRTHDAY_INFO.createdBy}</span>
          <span>for</span>
          <span className="text-amber-300 font-bold">{BIRTHDAY_INFO.name}</span>
          <span>• 22nd Birthday</span>
        </div>
      </footer>

      {/* Modals */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <AIImageModal
        isOpen={isImageStudioOpen}
        onClose={() => setIsImageStudioOpen(false)}
      />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={achievements}
      />

    </div>
  );
}
