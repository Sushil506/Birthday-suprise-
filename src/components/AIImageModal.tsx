import React, { useState } from 'react';
import { X, Wand2, Download, Sparkles, RefreshCw, Image as ImageIcon, Check } from 'lucide-react';
import { sound } from '../utils/soundEngine';

interface AIImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIImageModal: React.FC<AIImageModalProps> = ({ isOpen, onClose }) => {
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '3:4'>('1:1');
  const [prompt, setPrompt] = useState(
    'A breathtaking royal 22nd birthday portrait of a stylish gorgeous young woman named Chota Don, wearing an enchanted diamond tiara and an iridescent rose-gold silk gown, holding a glowing ruby heart crystal. Surrounded by floating pastel balloons, golden confetti, and cosmic starlight. High fantasy cinematic portrait, 8k resolution, ultra-detailed.'
  );
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const presetPrompts = [
    {
      title: '👑 Royal Birthday Tiara',
      text: 'A breathtaking royal 22nd birthday portrait of a stylish gorgeous young woman named Chota Don, wearing an enchanted diamond tiara and an iridescent rose-gold silk gown, holding a glowing ruby heart crystal. Surrounded by floating pastel balloons, golden confetti, and cosmic starlight. High fantasy cinematic portrait, 8k resolution, ultra-detailed.',
    },
    {
      title: '✨ Aurora Sky Celebration',
      text: 'Chic young woman celebrating her 22nd birthday milestone with sparkling fireworks on an enchanted glass terrace under vibrant purple and emerald aurora borealis skies. Giant glowing neon letters that say "CHOTA DON 22", aesthetic fairy lights, and starlight champagne.',
    },
    {
      title: '🎂 22 Glowing Candles Cake',
      text: 'A whimsical fairytale birthday celebration featuring a towering three-tier pastel strawberry and gold leaf birthday cake with 22 glowing magical candles, fluttering crystal butterflies, and romantic rose petals.',
    },
    {
      title: '💖 British & Chota Don Bond',
      text: 'An artistic magical painting celebrating the unbreakable bond and friendship between British and Chota Don, featuring two celestial stars intertwining into a radiant glowing heart locket with golden runes of 22.',
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    sound.playClick();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageSize,
          aspectRatio,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate keepsake image');
      }

      setGeneratedImage(data.imageUrl);
      sound.playSparkle();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Image generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = `Chota_Don_22nd_Birthday_${imageSize}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-3xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden border border-amber-400/30 shadow-2xl">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-amber-950/60 via-purple-950/60 to-rose-950/60 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg border border-amber-300/40">
              <Wand2 className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5 font-display">
                Magical Keepsake Portrait Studio
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  gemini-3-pro-image-preview
                </span>
              </h2>
              <p className="text-xs text-amber-200/80">
                Craft high-resolution 22nd birthday artworks for Chota Don 🫀
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          
          {/* Controls Bar: Size and Aspect Ratio Affordance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
            {/* Resolution Selector: 1K, 2K, 4K Required */}
            <div>
              <label className="block text-xs font-semibold text-amber-200 uppercase tracking-wider mb-2">
                Image Resolution (Size):
              </label>
              <div className="flex items-center gap-2">
                {(['1K', '2K', '4K'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      sound.playClick();
                      setImageSize(sz);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      imageSize === sz
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-amber-300 shadow-lg shadow-amber-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}
                  >
                    {sz} {sz === '4K' && '⭐'}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {imageSize === '4K' ? 'Ultra high-definition masterwork' : imageSize === '2K' ? 'Crisp high-definition print quality' : 'Standard fast HD'}
              </p>
            </div>

            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-xs font-semibold text-rose-200 uppercase tracking-wider mb-2">
                Aspect Ratio:
              </label>
              <div className="flex items-center gap-2">
                {(['1:1', '16:9', '3:4'] as const).map((ar) => (
                  <button
                    key={ar}
                    onClick={() => {
                      sound.playClick();
                      setAspectRatio(ar);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      aspectRatio === ar
                        ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white border-rose-300 shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}
                  >
                    {ar}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {aspectRatio === '1:1' ? 'Square Portrait' : aspectRatio === '16:9' ? 'Cinematic Banner' : 'Story Card'}
              </p>
            </div>
          </div>

          {/* Preset Prompts */}
          <div>
            <label className="block text-xs font-semibold text-purple-200 uppercase tracking-wider mb-2">
              Magical Birthday Presets:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presetPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setPrompt(p.text);
                  }}
                  className="text-left p-2.5 rounded-xl bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-400/40 transition-all text-xs text-slate-200 group"
                >
                  <div className="font-semibold text-amber-300 group-hover:text-amber-200 mb-0.5">
                    {p.title}
                  </div>
                  <div className="line-clamp-2 text-slate-400 text-[11px]">
                    {p.text}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Keepsake Prompt:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="Describe the magical 22nd birthday artwork you wish to manifest for Chota Don..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all resize-none"
            />
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-600 hover:via-rose-600 hover:to-purple-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-98 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating {imageSize} Keepsake Masterpiece...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Generate {imageSize} Portrait</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Generated Result Preview */}
          {generatedImage && (
            <div className="glass-panel p-4 rounded-3xl border border-amber-400/40 text-center space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-300">
                <span className="font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-400" /> Generated Successfully ({imageSize} • {aspectRatio})
                </span>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold flex items-center gap-1.5 transition-all text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download HD
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-h-[380px] flex items-center justify-center bg-black/40">
                <img
                  src={generatedImage}
                  alt="Chota Don 22nd Birthday Keepsake"
                  className="max-h-[380px] w-auto object-contain rounded-xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
