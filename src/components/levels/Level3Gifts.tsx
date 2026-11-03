import React, { useState } from 'react';
import { Gift, Sparkles, Check, ArrowRight, X, Heart } from 'lucide-react';
import { GIFTS, GiftItem, BIRTHDAY_INFO } from '../../data/birthdayData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level3Props {
  onComplete: () => void;
}

export const Level3Gifts: React.FC<Level3Props> = ({ onComplete }) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [activeGift, setActiveGift] = useState<GiftItem | null>(null);

  const handleOpenGift = (gift: GiftItem) => {
    sound.playSparkle();
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts((prev) => [...prev, gift.id]);
    }
    setActiveGift(gift);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fbbf24', '#c084fc', '#38bdf8'],
    });
  };

  const handleOpenAll = () => {
    sound.playFanfare();
    setOpenedGifts(GIFTS.map((g) => g.id));
    setActiveGift(GIFTS[0]);
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="relative min-h-[82vh] px-4 py-8 max-w-5xl mx-auto flex flex-col justify-center animate-fade-in">
      
      {/* Level Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-400/30">
          <span>Level 3</span>
          <span>•</span>
          <span>Gift Kingdom 🎁</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          10 Enchanted Gifts for Chota Don 🫀
        </h2>
        <p className="text-sm text-slate-300 max-w-lg mx-auto">
          Every floating box holds a unique 22nd birthday wish tailored specifically for you by British. Unbox them all!
        </p>

        {/* Counter & Action */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-amber-200 border border-white/10 font-bold">
            {openedGifts.length} / 10 Unwrapped
          </span>
          {openedGifts.length < 10 && (
            <button
              onClick={handleOpenAll}
              className="text-xs text-rose-300 hover:text-white underline underline-offset-4 transition-colors"
            >
              Unwrap All with Magic ✨
            </button>
          )}
        </div>
      </div>

      {/* 10 Floating Gift Boxes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 my-4">
        {GIFTS.map((gift, idx) => {
          const isOpened = openedGifts.includes(gift.id);
          return (
            <div
              key={gift.id}
              onClick={() => handleOpenGift(gift)}
              className={`relative p-4 rounded-3xl glass-card-interactive cursor-pointer flex flex-col items-center justify-center text-center min-h-[140px] group ${
                isOpened
                  ? 'border-amber-400/50 bg-amber-500/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                  : 'hover:border-rose-400/60'
              }`}
              style={{
                animation: `float-slow ${4 + (idx % 3)}s ease-in-out ${idx * 0.4}s infinite alternate`,
              }}
            >
              {/* Box Emoji / Icon */}
              <div className="relative">
                <span className="text-3xl sm:text-4xl filter drop-shadow-md transition-transform group-hover:scale-110 block">
                  {isOpened ? gift.emoji : '🎁'}
                </span>
                {isOpened && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow">
                    ✓
                  </span>
                )}
              </div>

              <span className="mt-2 text-xs font-bold text-slate-200 group-hover:text-amber-200 line-clamp-1 transition-colors">
                {gift.title}
              </span>

              <span className="text-[10px] text-slate-400 mt-1">
                {isOpened ? 'Read Wish' : 'Tap to open'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Level Transition button */}
      <div className="text-center pt-6">
        <button
          onClick={() => {
            sound.playSparkle();
            onComplete();
          }}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all ${
            openedGifts.length >= 3
              ? 'bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-xl shadow-rose-500/25 active:scale-95'
              : 'bg-white/10 text-slate-400 cursor-not-allowed opacity-60'
          }`}
        >
          <span>
            {openedGifts.length >= 10
              ? 'All Gifts Unlocked! Proceed to Butterfly Challenge'
              : openedGifts.length >= 3
              ? 'Continue to Level 4 (Butterflies)'
              : 'Unwrap at least 3 gifts to proceed'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Active Gift Detail Modal */}
      {activeGift && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 relative border border-amber-400/40 shadow-2xl text-center space-y-4">
            <button
              onClick={() => setActiveGift(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-3xl shadow-xl animate-bounce">
              {activeGift.emoji}
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-rose-300 font-bold px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/30">
                Gift #{activeGift.id} • {activeGift.effect}
              </span>
              <h3 className="text-xl font-bold text-white font-display mt-2">
                {activeGift.title}
              </h3>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-normal bg-white/5 p-4 rounded-2xl border border-white/10">
              "{activeGift.wish}"
            </p>

            <div className="text-xs text-amber-200/90 font-medium flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> Dedicated with love to Chota Don 🫀
            </div>

            <button
              onClick={() => setActiveGift(null)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
            >
              Close & Keep Exploring
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
