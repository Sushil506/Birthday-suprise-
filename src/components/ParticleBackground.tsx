import React, { useMemo } from 'react';

export const ParticleBackground: React.FC = () => {
  // Generate random ambient floating elements (stars, butterflies, hearts, balloons, sparkles)
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      type: i % 5 === 0 ? '🦋' : i % 5 === 1 ? '✨' : i % 5 === 2 ? '💖' : i % 5 === 3 ? '⭐' : '🎈',
      opacity: Math.random() * 0.4 + 0.25,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Aurora Ambient Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-purple-600/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-32 left-1/4 w-[36rem] h-[36rem] bg-indigo-600/15 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '4s' }} />
      <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-pink-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none transition-transform will-change-transform"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-slow ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        >
          {p.type}
        </div>
      ))}
    </div>
  );
};
