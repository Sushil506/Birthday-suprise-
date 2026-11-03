import React, { useState } from 'react';
import { Star, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { CELESTIAL_STARS, StarItem, BIRTHDAY_INFO } from '../../data/birthdayData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level6Props {
  onComplete: () => void;
}

export const Level6Stars: React.FC<Level6Props> = ({ onComplete }) => {
  const [collectedStarIds, setCollectedStarIds] = useState<number[]>([]);
  const [activeStar, setActiveStar] = useState<StarItem | null>(null);

  const starPositions = [
    { top: '22%', left: '18%' },
    { top: '18%', left: '72%' },
    { top: '50%', left: '50%' },
    { top: '65%', left: '25%' },
    { top: '60%', left: '80%' },
  ];

  const handleCollectStar = (star: StarItem) => {
    sound.playStar();
    if (!collectedStarIds.includes(star.id)) {
      setCollectedStarIds((prev) => [...prev, star.id]);
    }
    setActiveStar(star);

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f59e0b', '#ffffff', '#c084fc'],
    });
  };

  const allCollected = collectedStarIds.length >= CELESTIAL_STARS.length;

  return (
    <div className="relative min-h-[82vh] px-4 py-8 max-w-5xl mx-auto flex flex-col justify-between animate-fade-in select-none">
      
      {/* Level Header */}
      <div className="text-center space-y-2 relative z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
          <span>Level 6</span>
          <span>•</span>
          <span>Star Collection ⭐</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Collect the 5 Celestial Stars
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Find and touch the 5 glowing stars hidden in Chota Don's night sky to unlock milestone blessings for age 22.
        </p>

        {/* Counter */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="glass-panel px-4 py-1.5 rounded-full text-xs font-bold text-amber-200 border border-amber-400/40 shadow-lg">
            ⭐ Stars Collected: {collectedStarIds.length} / 5
          </span>
        </div>
      </div>

      {/* Night Sky Constellation Dome */}
      <div className="relative h-[380px] sm:h-[430px] w-full my-4 rounded-3xl glass-panel border border-white/10 overflow-hidden bg-gradient-to-b from-[#080214] via-[#100628] to-[#1a0a38] shadow-2xl">
        
        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 stroke-amber-300/40" strokeWidth="1" strokeDasharray="4 4">
          <line x1="18%" y1="22%" x2="50%" y2="50%" />
          <line x1="72%" y1="18%" x2="50%" y2="50%" />
          <line x1="25%" y1="65%" x2="50%" y2="50%" />
          <line x1="80%" y1="60%" x2="50%" y2="50%" />
        </svg>

        {/* 5 Interactive Stars */}
        {CELESTIAL_STARS.map((star, idx) => {
          const isCollected = collectedStarIds.includes(star.id);
          const pos = starPositions[idx];

          return (
            <div
              key={star.id}
              onClick={() => handleCollectStar(star)}
              className="absolute cursor-pointer transition-transform hover:scale-125 z-20 group"
              style={{
                top: pos.top,
                left: pos.left,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className={`relative p-3 rounded-full transition-all duration-500 ${
                  isCollected
                    ? 'bg-amber-400/30 border border-amber-300 shadow-[0_0_30px_#fbbf24]'
                    : 'bg-white/10 hover:bg-amber-500/20 border border-white/30 animate-pulse'
                }`}
              >
                <Star
                  className={`w-7 h-7 sm:w-9 sm:h-9 transition-colors ${
                    isCollected
                      ? 'fill-amber-300 text-amber-300 drop-shadow-[0_0_15px_#fbbf24]'
                      : 'text-amber-100 hover:text-amber-300'
                  }`}
                />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap bg-black/70 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/20">
                  {isCollected ? star.name : 'Tap to collect'}
                </span>
              </div>
            </div>
          );
        })}

        {/* Revealed Star Message Toast */}
        {activeStar && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-lg glass-panel-glow p-4 rounded-2xl border border-amber-400/50 shadow-2xl text-center animate-fade-in z-30">
            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeStar.name} • {activeStar.meaning}</span>
            </div>
            <p className="text-sm font-medium text-white leading-relaxed">
              "{activeStar.blessing}"
            </p>
          </div>
        )}
      </div>

      {/* Navigation to Level 7 */}
      <div className="text-center pt-2 relative z-20">
        <button
          onClick={() => {
            sound.playSparkle();
            onComplete();
          }}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all ${
            allCollected
              ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 text-white shadow-xl shadow-amber-500/25 active:scale-95'
              : collectedStarIds.length >= 3
              ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg'
              : 'bg-white/10 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          <span>
            {allCollected
              ? 'All 5 Stars Aligned! Unlock the Treasure Chest'
              : collectedStarIds.length >= 3
              ? 'Continue to Level 7 (Treasure Chest)'
              : 'Collect all 5 stars to reveal the chest'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
