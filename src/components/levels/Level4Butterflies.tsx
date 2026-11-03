import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Heart, Award } from 'lucide-react';
import { BUTTERFLIES, ButterflyItem, BIRTHDAY_INFO } from '../../data/birthdayData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level4Props {
  onComplete: () => void;
}

interface ActiveButterfly extends ButterflyItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const Level4Butterflies: React.FC<Level4Props> = ({ onComplete }) => {
  const [activeButterflies, setActiveButterflies] = useState<ActiveButterfly[]>([]);
  const [caughtCount, setCaughtCount] = useState<number>(0);
  const [unlockedSecrets, setUnlockedSecrets] = useState<ButterflyItem[]>([]);
  const [lastCaught, setLastCaught] = useState<ButterflyItem | null>(null);

  // Initialize butterfly positions and trajectories
  useEffect(() => {
    const list: ActiveButterfly[] = BUTTERFLIES.map((b, idx) => ({
      ...b,
      x: 10 + (idx % 4) * 22 + (Math.random() * 8),
      y: 20 + Math.floor(idx / 4) * 35 + (Math.random() * 10),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
    setActiveButterflies(list);

    // Smooth fluttering interval
    const interval = setInterval(() => {
      setActiveButterflies((prev) =>
        prev.map((b) => {
          let nx = b.x + b.vx;
          let ny = b.y + b.vy;
          let nvx = b.vx;
          let nvy = b.vy;

          if (nx < 5 || nx > 90) nvx = -nvx;
          if (ny < 10 || ny > 80) nvy = -nvy;

          // Gentle random drift
          if (Math.random() < 0.1) {
            nvx += (Math.random() - 0.5) * 0.1;
            nvy += (Math.random() - 0.5) * 0.1;
          }

          return { ...b, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const catchButterfly = (b: ButterflyItem, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playStar();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: ['#f472b6', '#38bdf8', '#fbbf24', '#c084fc'],
    });

    setCaughtCount((c) => c + 1);
    setLastCaught(b);
    if (!unlockedSecrets.some((s) => s.id === b.id)) {
      setUnlockedSecrets((prev) => [...prev, b]);
    }
  };

  return (
    <div className="relative min-h-[82vh] px-4 py-8 max-w-5xl mx-auto flex flex-col justify-between animate-fade-in select-none">
      
      {/* Header & Score Tracker */}
      <div className="text-center space-y-2 relative z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold border border-pink-400/30">
          <span>Level 4</span>
          <span>•</span>
          <span>Butterfly Challenge 🦋</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Catch the Enchanted Butterflies!
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Tap or click the fluttering butterflies to capture their hidden birthday wishes and secret compliments for Chota Don 🫀.
        </p>

        {/* Score pill */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="glass-panel px-4 py-1.5 rounded-full flex items-center gap-2 border border-pink-400/40 text-rose-200 text-xs font-bold shadow-lg">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Score: {caughtCount} Butterflies Caught</span>
            <span className="text-[10px] text-slate-400">({unlockedSecrets.length}/{BUTTERFLIES.length} unique)</span>
          </div>
        </div>
      </div>

      {/* Fluttering Meadow Playfield */}
      <div className="relative h-[360px] sm:h-[420px] w-full my-4 rounded-3xl glass-panel border border-white/10 overflow-hidden bg-gradient-to-b from-purple-950/20 via-slate-900/40 to-slate-950/60 shadow-2xl">
        
        {/* Floating Butterflies */}
        {activeButterflies.map((b) => (
          <div
            key={b.id}
            onClick={(e) => catchButterfly(b, e)}
            className="absolute cursor-pointer transition-transform duration-75 hover:scale-125 z-10 p-2"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
            }}
          >
            <div className="relative group">
              <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_12px_rgba(244,114,182,0.6)] animate-pulse">
                🦋
              </span>
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded-full whitespace-nowrap transition-opacity pointer-events-none">
                Catch me!
              </span>
            </div>
          </div>
        ))}

        {/* Catch Toast in playfield */}
        {lastCaught && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-md glass-panel-glow p-4 rounded-2xl border border-pink-400/50 shadow-2xl text-center animate-fade-in z-20">
            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Compliment Unlocked!</span>
            </div>
            <p className="text-sm font-semibold text-white">
              "{lastCaught.compliment}"
            </p>
            <p className="text-xs text-pink-200/90 mt-1 italic">
              💌 Secret: {lastCaught.secret}
            </p>
          </div>
        )}
      </div>

      {/* Navigation to Level 5 */}
      <div className="text-center pt-2 relative z-20">
        <button
          onClick={() => {
            sound.playSparkle();
            onComplete();
          }}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all ${
            caughtCount >= 3
              ? 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-xl shadow-pink-500/25 active:scale-95'
              : 'bg-white/10 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          <span>
            {caughtCount >= 5
              ? 'Terrific job! Advance to Balloon World'
              : caughtCount >= 3
              ? 'Continue to Level 5 (Balloons)'
              : 'Catch at least 3 butterflies to proceed'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
