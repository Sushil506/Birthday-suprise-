import React, { useState } from 'react';
import { Sparkles, ArrowRight, Wand2, Flame, Heart } from 'lucide-react';
import { BIRTHDAY_INFO } from '../../data/birthdayData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level8Props {
  onComplete: () => void;
  onTriggerFireworks: () => void;
}

export const Level8Cake: React.FC<Level8Props> = ({ onComplete, onTriggerFireworks }) => {
  // 22 candles for 22nd birthday
  const [litCandles, setLitCandles] = useState<number[]>([]);
  const [celebrationLaunched, setCelebrationLaunched] = useState(false);

  const totalCandles = 22;

  const handleLightCandle = (id: number) => {
    if (litCandles.includes(id)) return;
    sound.playCandleLit();

    const newLit = [...litCandles, id];
    setLitCandles(newLit);

    if (newLit.length === totalCandles && !celebrationLaunched) {
      triggerFullCelebration();
    }
  };

  const handleLightAll = () => {
    sound.playSparkle();
    const all = Array.from({ length: totalCandles }).map((_, i) => i + 1);
    setLitCandles(all);
    triggerFullCelebration();
  };

  const triggerFullCelebration = () => {
    setCelebrationLaunched(true);
    sound.playFanfare();
    onTriggerFireworks();

    // Multistage confetti explosion
    const end = Date.now() + 3000;
    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#f43f5e', '#fbbf24', '#c084fc', '#38bdf8', '#ffffff'],
      });
    }, 250);
  };

  return (
    <div className="relative min-h-[82vh] px-4 py-8 max-w-4xl mx-auto flex flex-col justify-between animate-fade-in select-none">
      
      {/* Header */}
      <div className="text-center space-y-2 relative z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-400/30">
          <span>Level 8</span>
          <span>•</span>
          <span>Birthday Cake 🎂</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Light the 22 Birthday Candles!
        </h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Click each candle to illuminate Chota Don's 22 years of radiance, then make your most cherished wish.
        </p>

        {/* Counter and quick tool */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <span className="glass-panel px-4 py-1.5 rounded-full text-xs font-bold text-amber-200 border border-amber-400/40 shadow-lg">
            🕯️ Candles Lit: {litCandles.length} / 22
          </span>
          {litCandles.length < totalCandles && (
            <button
              onClick={handleLightAll}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Light All with Magic Wand</span>
            </button>
          )}
        </div>
      </div>

      {/* The 3-Tier Birthday Cake Illustration & Candles */}
      <div className="relative my-6 flex flex-col items-center justify-center">
        
        {/* Tier 1 (Top Tier with 6 candles) */}
        <div className="relative flex flex-col items-center">
          {/* Top Candles Row */}
          <div className="flex items-end justify-center gap-2 sm:gap-3 mb-1 z-30">
            {Array.from({ length: 6 }).map((_, i) => {
              const id = i + 1;
              const isLit = litCandles.includes(id);
              return (
                <div
                  key={id}
                  onClick={() => handleLightCandle(id)}
                  className="cursor-pointer flex flex-col items-center group -mb-1"
                >
                  {/* Flame */}
                  <div
                    className={`w-3.5 h-5 rounded-full transition-all duration-300 ${
                      isLit
                        ? 'bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_15px_#f59e0b] animate-candle'
                        : 'opacity-0 scale-50 group-hover:opacity-40 group-hover:scale-75'
                    }`}
                  />
                  {/* Wick */}
                  <div className="w-0.5 h-1.5 bg-slate-400" />
                  {/* Candle Wax Stick */}
                  <div className="w-2.5 sm:w-3 h-8 sm:h-10 rounded-t-sm bg-gradient-to-b from-rose-300 via-pink-400 to-rose-500 border border-white/20 shadow-sm" />
                </div>
              );
            })}
          </div>

          {/* Top Cake Layer */}
          <div className="w-44 sm:w-52 h-14 sm:h-16 rounded-t-2xl bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 border-t-2 border-x border-white/40 shadow-lg relative flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-3 bg-white/40 rounded-b-xl" />
            <span className="text-xs font-bold text-rose-900 tracking-wider">
              CHOTA DON 🫀
            </span>
          </div>
        </div>

        {/* Tier 2 (Middle Tier with 8 candles) */}
        <div className="relative flex flex-col items-center -mt-2">
          {/* Middle Candles Row */}
          <div className="flex items-end justify-center gap-2 sm:gap-2.5 mb-1 z-20">
            {Array.from({ length: 8 }).map((_, i) => {
              const id = i + 7;
              const isLit = litCandles.includes(id);
              return (
                <div
                  key={id}
                  onClick={() => handleLightCandle(id)}
                  className="cursor-pointer flex flex-col items-center group -mb-1"
                >
                  <div
                    className={`w-3.5 h-5 rounded-full transition-all duration-300 ${
                      isLit
                        ? 'bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_15px_#f59e0b] animate-candle'
                        : 'opacity-0 scale-50 group-hover:opacity-40'
                    }`}
                  />
                  <div className="w-0.5 h-1.5 bg-slate-400" />
                  <div className="w-2.5 sm:w-3 h-7 sm:h-9 rounded-t-sm bg-gradient-to-b from-purple-300 via-fuchsia-400 to-purple-500 border border-white/20 shadow-sm" />
                </div>
              );
            })}
          </div>

          {/* Middle Cake Layer */}
          <div className="w-64 sm:w-76 h-16 sm:h-20 rounded-t-2xl bg-gradient-to-r from-purple-400 via-pink-200 to-purple-400 border-t-2 border-x border-white/40 shadow-xl relative flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-4 bg-white/40 rounded-b-xl" />
            <span className="text-xs font-bold text-purple-950 font-display">
              ✨ 22 FABULOUS YEARS ✨
            </span>
          </div>
        </div>

        {/* Tier 3 (Bottom Tier with 8 candles) */}
        <div className="relative flex flex-col items-center -mt-2">
          {/* Bottom Candles Row */}
          <div className="flex items-end justify-center gap-2 sm:gap-3 mb-1 z-10">
            {Array.from({ length: 8 }).map((_, i) => {
              const id = i + 15;
              const isLit = litCandles.includes(id);
              return (
                <div
                  key={id}
                  onClick={() => handleLightCandle(id)}
                  className="cursor-pointer flex flex-col items-center group -mb-1"
                >
                  <div
                    className={`w-3.5 h-5 rounded-full transition-all duration-300 ${
                      isLit
                        ? 'bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_15px_#f59e0b] animate-candle'
                        : 'opacity-0 scale-50 group-hover:opacity-40'
                    }`}
                  />
                  <div className="w-0.5 h-1.5 bg-slate-400" />
                  <div className="w-2.5 sm:w-3 h-7 sm:h-8 rounded-t-sm bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 border border-white/20 shadow-sm" />
                </div>
              );
            })}
          </div>

          {/* Bottom Cake Layer */}
          <div className="w-80 sm:w-96 h-20 sm:h-24 rounded-t-3xl bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200 border-t-2 border-x border-white/40 shadow-2xl relative flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-5 bg-white/40 rounded-b-xl" />
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-950 tracking-wider uppercase">
              <span>Made with love by British</span>
              <span>🫀</span>
            </div>
          </div>

          {/* Silver Cake Platter */}
          <div className="w-[340px] sm:w-[420px] h-4 rounded-full bg-gradient-to-r from-slate-400 via-white to-slate-400 shadow-2xl border-t border-white/80" />
        </div>

      </div>

      {/* Celebration Banner when all 22 lit */}
      {celebrationLaunched && (
        <div className="text-center my-3 animate-fade-in">
          <div className="inline-block glass-panel-glow px-6 py-3 rounded-2xl border-2 border-amber-400 shadow-2xl animate-pulse">
            <p className="text-sm sm:text-base font-extrabold text-amber-300 font-display flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              ALL 22 CANDLES ARE GLOWING! MAKE YOUR WISH, CHOTA DON! 🫀🎂
              <Sparkles className="w-5 h-5 text-amber-300" />
            </p>
          </div>
        </div>
      )}

      {/* Navigation to Level 9 (Secret Letter) */}
      <div className="text-center pt-2 relative z-20">
        <button
          onClick={() => {
            sound.playSparkle();
            onComplete();
          }}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all ${
            litCandles.length === totalCandles
              ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 text-white shadow-xl shadow-rose-500/25 active:scale-95'
              : 'bg-white/10 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          <span>
            {litCandles.length === totalCandles
              ? 'Open the Secret Letter from British 💌'
              : `Light all 22 candles (${litCandles.length}/22 lit)`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
