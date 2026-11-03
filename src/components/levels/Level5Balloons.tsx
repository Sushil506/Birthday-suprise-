import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { BALLOON_COMPLIMENTS, BIRTHDAY_INFO } from '../../data/birthdayData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level5Props {
  onComplete: () => void;
}

interface FloatingBalloon {
  id: number;
  x: number;
  color: string;
  speed: number;
  size: number;
  compliment: string;
}

export const Level5Balloons: React.FC<Level5Props> = ({ onComplete }) => {
  const [balloons, setBalloons] = useState<FloatingBalloon[]>([]);
  const [poppedCount, setPoppedCount] = useState<number>(0);
  const [recentCompliment, setRecentCompliment] = useState<string | null>(null);

  const colors = [
    'from-pink-500 to-rose-600',
    'from-purple-500 to-indigo-600',
    'from-cyan-400 to-blue-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-teal-500',
    'from-fuchsia-500 to-pink-500',
    'from-rose-400 to-red-500',
  ];

  // Spawn initial set of balloons
  useEffect(() => {
    const list: FloatingBalloon[] = Array.from({ length: 12 }).map((_, idx) => ({
      id: Date.now() + idx,
      x: 8 + (idx * 7.5),
      color: colors[idx % colors.length],
      speed: 12 + Math.random() * 8,
      size: 64 + Math.random() * 20,
      compliment: BALLOON_COMPLIMENTS[idx % BALLOON_COMPLIMENTS.length],
    }));
    setBalloons(list);
  }, []);

  const popBalloon = (b: FloatingBalloon, e: React.MouseEvent) => {
    sound.playPop();
    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
      colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#c084fc'],
    });

    setPoppedCount((c) => c + 1);
    setRecentCompliment(b.compliment);

    // Remove balloon and respawn a new one from bottom after a moment
    setBalloons((prev) => prev.filter((item) => item.id !== b.id));

    setTimeout(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: 5 + Math.random() * 85,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: 12 + Math.random() * 8,
          size: 64 + Math.random() * 20,
          compliment: BALLOON_COMPLIMENTS[Math.floor(Math.random() * BALLOON_COMPLIMENTS.length)],
        },
      ]);
    }, 1200);
  };

  return (
    <div className="relative min-h-[82vh] px-4 py-8 max-w-5xl mx-auto flex flex-col justify-between animate-fade-in select-none">
      
      {/* Level Header */}
      <div className="text-center space-y-2 relative z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-400/30">
          <span>Level 5</span>
          <span>•</span>
          <span>Balloon World 🎈</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Pop the Birthday Balloons!
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Every balloon you pop reveals an inspiring compliment celebrating Chota Don 🫀 at 22!
        </p>

        {/* Counter */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="glass-panel px-4 py-1.5 rounded-full text-xs font-bold text-amber-200 border border-amber-400/30 shadow-lg">
            🎈 Balloons Popped: {poppedCount}
          </span>
        </div>
      </div>

      {/* Sky Canvas where balloons float */}
      <div className="relative h-[380px] sm:h-[440px] w-full my-4 rounded-3xl glass-panel border border-white/10 overflow-hidden bg-gradient-to-b from-indigo-950/40 via-purple-950/30 to-slate-950/60 shadow-2xl">
        
        {/* Floating Balloons */}
        {balloons.map((b) => (
          <div
            key={b.id}
            onClick={(e) => popBalloon(b, e)}
            className="absolute bottom-[-100px] cursor-pointer group transition-transform hover:scale-110 active:scale-95"
            style={{
              left: `${b.x}%`,
              animation: `float-slow ${b.speed}s ease-in-out infinite alternate`,
            }}
          >
            {/* Balloon Body */}
            <div
              className={`relative rounded-[50%] bg-gradient-to-tr ${b.color} shadow-lg shadow-black/40 border border-white/30 flex items-center justify-center`}
              style={{
                width: `${b.size}px`,
                height: `${b.size * 1.22}px`,
              }}
            >
              {/* Highlight shine */}
              <div className="absolute top-2 left-3 w-3 h-4 bg-white/40 rounded-full blur-[1px] -rotate-45" />
              <span className="text-sm opacity-80 select-none">✨</span>
              
              {/* Knot */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2 rounded-b-sm bg-inherit border-b border-black/20"
              />
              {/* String */}
              <div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-slate-300/40"
              />
            </div>
          </div>
        ))}

        {/* Popped Compliment Banner */}
        {recentCompliment && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 glass-panel-glow px-6 py-3 rounded-2xl border border-amber-400/50 shadow-2xl text-center animate-fade-in z-20">
            <span className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              {recentCompliment}
            </span>
          </div>
        )}
      </div>

      {/* Navigation to Level 6 */}
      <div className="text-center pt-2 relative z-20">
        <button
          onClick={() => {
            sound.playSparkle();
            onComplete();
          }}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all ${
            poppedCount >= 3
              ? 'bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white shadow-xl shadow-amber-500/25 active:scale-95'
              : 'bg-white/10 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          <span>
            {poppedCount >= 5
              ? 'Awesome! Proceed to Star Collection'
              : poppedCount >= 3
              ? 'Continue to Level 6 (Stars)'
              : 'Pop at least 3 balloons to continue'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
