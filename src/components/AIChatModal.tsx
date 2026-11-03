import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, RefreshCw, Zap, Brain, MessageSquare } from 'lucide-react';
import { sound } from '../utils/soundEngine';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Greetings, dearest Chota Don 🫀! I am Astraea, your Celestial Fairy Guardian, brought forth into this starlit realm by British to honor your 22nd birthday milestone. Ask me for a personalized 22nd birthday sonnet, a magical prophecy for this year, or anything your heart desires! ✨🎂",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelTier, setModelTier] = useState<'fast' | 'general' | 'complex'>('general');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || loading) return;

    sound.playClick();
    const updatedMessages: Message[] = [...messages, { role: 'user', text: textToSend }];
    setMessages(updatedMessages);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          modelTier,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get answer');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.text || "May every day of your 22nd year be showered with starlight, Chota Don! ✨🫀",
        },
      ]);
      sound.playSparkle();
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `✨ (The celestial mist parted): Wishing you endless happiness, Chota Don! (Error: ${err.message})`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "Write a royal 22nd birthday poem for Chota Don 🫀",
    "What are 22 reasons Chota Don will conquer the world this year?",
    "Give a heartwarming message acknowledging British's love",
    "Predict the 3 happiest surprises awaiting Chota Don at 22 ✨",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-2xl h-[88vh] max-h-[680px] rounded-3xl flex flex-col overflow-hidden border border-purple-500/30 shadow-2xl">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-900/40 via-rose-900/40 to-slate-900/40 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-lg border border-rose-300/40">
              <Sparkles className="w-5 h-5 text-yellow-200 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5 font-display">
                Fairy Astraea
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/30 font-sans">
                  Guardian of 22
                </span>
              </h2>
              <p className="text-xs text-purple-200/80">
                Created by British for Chota Don 🫀
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

        {/* Model Tier Selector */}
        <div className="px-4 py-2 bg-slate-900/50 border-b border-white/5 flex items-center justify-between text-xs text-slate-300 overflow-x-auto">
          <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap mr-2">
            Intelligence Tier:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setModelTier('fast')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                modelTier === 'fast'
                  ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-200 font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
              title="Fast responses (gemini-3.1-flash-lite)"
            >
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Fast (Lite)</span>
            </button>
            <button
              onClick={() => setModelTier('general')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                modelTier === 'general'
                  ? 'bg-rose-500/30 border border-rose-400 text-rose-200 font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
              title="Balanced model (gemini-3.8-flash)"
            >
              <MessageSquare className="w-3 h-3 text-rose-400" />
              <span>General (3.8)</span>
            </button>
            <button
              onClick={() => setModelTier('complex')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                modelTier === 'complex'
                  ? 'bg-purple-500/30 border border-purple-400 text-purple-200 font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400'
              }`}
              title="Deep reasoning & elaborate sonnets (gemini-4-argon)"
            >
              <Brain className="w-3 h-3 text-purple-400" />
              <span>Complex (Argon)</span>
            </button>
          </div>
        </div>

        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/40 border border-purple-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-purple-300" />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-br-none shadow-lg'
                    : 'glass-panel bg-white/10 text-slate-100 rounded-bl-none border border-white/10'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-rose-600/40 border border-rose-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-rose-300" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-purple-300 py-1">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Astraea is weaving celestial words for Chota Don...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2 px-4 bg-slate-900/40 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              disabled={loading}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-400/30 text-slate-300 hover:text-purple-200 text-xs whitespace-nowrap transition-all shrink-0"
            >
              ✨ {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask Astraea for a 22nd birthday poem, wish, or prophecy..."
            disabled={loading}
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || loading}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white disabled:opacity-40 transition-all shadow-lg active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
