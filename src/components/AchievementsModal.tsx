import React from 'react';
import { X, Trophy, CheckCircle2, Lock } from 'lucide-react';
import { Achievement } from '../data/birthdayData';
import { sound } from '../utils/soundEngine';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements,
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl max-h-[85vh] rounded-3xl flex flex-col overflow-hidden border border-yellow-400/30 shadow-2xl">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-yellow-950/60 via-purple-950/60 to-slate-950/60 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg border border-yellow-200/40">
              <Trophy className="w-5 h-5 text-yellow-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-1.5 font-display">
                Adventure Achievements
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                  {unlockedCount} / {achievements.length} Unlocked
                </span>
              </h2>
              <p className="text-xs text-yellow-200/70">
                Honoring Chota Don's 22nd Birthday Quest
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                a.unlocked
                  ? 'bg-gradient-to-r from-yellow-500/15 via-rose-500/10 to-purple-500/10 border-yellow-400/40 shadow-lg'
                  : 'bg-white/5 border-white/5 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border ${
                  a.unlocked
                    ? 'bg-yellow-400/20 border-yellow-400/50 shadow-inner'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                {a.unlocked ? a.icon : <Lock className="w-5 h-5 text-slate-500" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-sm font-bold truncate ${
                      a.unlocked ? 'text-yellow-200' : 'text-slate-400'
                    }`}
                  >
                    {a.title}
                  </h3>
                  {a.unlocked && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold shrink-0 ml-2">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300/80 mt-0.5 line-clamp-2">
                  {a.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
