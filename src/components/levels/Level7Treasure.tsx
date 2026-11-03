import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart, Crown, Filter, Check } from 'lucide-react';
import { TREASURE_WISHES, TreasureWish, BIRTHDAY_INFO } from '../../data/birthdayData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level7Props {
  onComplete: () => void;
}

export const Level7Treasure: React.FC<Level7Props> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readWishIds, setReadWishIds] = useState<number[]>([]);

  const handleOpenChest = () => {
    sound.playFanfare();
    setIsOpen(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f59e0b', '#f43f5e', '#ffffff'],
    });
  };

  const handleReadWish = (w: TreasureWish) => {
    sound.playClick();
    if (!readWishIds.includes(w.id)) {
      setReadWishIds((prev) => [...prev, w.id]);
    }
  };

  const categories = ['All', 'Magic', 'Royalty', 'Blossoming', 'Wealth', 'Joy', 'Peace', 'Success'];

  const filteredWishes =
    selectedCategory === 'All'
      ? TREASURE_WISHES
      : TREASURE_WISHES.filter((w) => w.category === selectedCategory);

  return (
    <div className="relative min-h-[82vh] px-4 py-8 max-w-6xl mx-auto flex flex-col justify-between animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-2 relative z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-400/30">
          <span>Level 7</span>
          <span>•</span>
          <span>Treasure Chest 💎</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          The Vault of 30 Royal Birthday Wishes
        </h2>
        <p className="text-sm text-slate-300 max-w-lg mx-auto">
          {isOpen
            ? "Unsealed! Explore 30 glowing blessing cards curated for Chota Don's 22nd year."
            : "Tap the royal golden chest to unleash 30 animated birthday blessings into the world."}
        </p>
      </div>

      {/* The Chest Chamber */}
      {!isOpen ? (
        <div className="my-8 flex flex-col items-center justify-center">
          <div
            onClick={handleOpenChest}
            className="group cursor-pointer p-8 rounded-3xl glass-panel-glow border-2 border-amber-400/60 shadow-[0_0_60px_rgba(251,191,36,0.4)] flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 text-center max-w-sm"
          >
            {/* Chest Icon */}
            <div className="relative">
              <span className="text-7xl sm:text-8xl filter drop-shadow-[0_0_25px_#fbbf24] animate-bounce block">
                💎
              </span>
              <div className="absolute -inset-4 bg-amber-400/20 rounded-full blur-xl group-hover:bg-amber-400/40 transition-all" />
            </div>

            <h3 className="text-xl font-bold text-amber-200 mt-4 font-display">
              The Sovereign Chest of 22
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Protected by British's golden seal for Chota Don 🫀
            </p>

            <div className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-lg group-hover:shadow-amber-400/50 transition-all flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Tap to Open Chest</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-6 space-y-4 animate-fade-in">
          
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 30 Glowing Wish Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 max-h-[460px] overflow-y-auto p-2 pr-3">
            {filteredWishes.map((w) => {
              const isRead = readWishIds.includes(w.id);
              return (
                <div
                  key={w.id}
                  onClick={() => handleReadWish(w)}
                  className={`p-4 rounded-2xl glass-card-interactive cursor-pointer border flex flex-col justify-between group ${
                    isRead
                      ? 'border-amber-400/40 bg-amber-500/10'
                      : 'border-white/15 hover:border-amber-400/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl p-2 rounded-xl bg-white/10 shadow-inner group-hover:scale-110 transition-transform">
                        {w.icon}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-rose-300 px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/30">
                        {w.category}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors font-display">
                      {w.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      "{w.wish}"
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Wish #{w.id} of 30</span>
                    {isRead ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Blessed
                      </span>
                    ) : (
                      <span className="text-amber-300 group-hover:underline">Touch to bless</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Navigation to Level 8 (Birthday Cake) */}
      <div className="text-center pt-4 relative z-20">
        <button
          onClick={() => {
            sound.playSparkle();
            onComplete();
          }}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all ${
            isOpen
              ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 text-white shadow-xl shadow-amber-500/25 active:scale-95'
              : 'bg-white/10 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          <span>
            {isOpen
              ? 'Proceed to Birthday Cake & 22 Candles 🎂'
              : 'Open the treasure chest first'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
