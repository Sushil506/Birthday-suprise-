/**
 * Web Audio API synthesizer for ambient background music and magical SFX.
 * Zero external audio file dependencies - 100% reliable in any browser environment!
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private isMuted: boolean = false;
  private isSfxMuted: boolean = false;
  private musicInterval: any = null;
  private noteIndex: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.value = 0.15;
        this.musicGain.connect(this.ctx.destination);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = 0.25;
        this.sfxGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMusicEnabled(enabled: boolean) {
    this.isMuted = !enabled;
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.15, this.ctx.currentTime, 0.1);
    }
    if (enabled && !this.isMusicPlaying) {
      this.startAmbientMusic();
    }
  }

  public setSfxEnabled(enabled: boolean) {
    this.isSfxMuted = !enabled;
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setTargetAtTime(this.isSfxMuted ? 0 : 0.25, this.ctx.currentTime, 0.05);
    }
  }

  public startAmbientMusic() {
    this.initContext();
    if (!this.ctx || this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    // Dreamy harp & celestial chime scale (Pentatonic/Lydian in F/C)
    const scale = [
      261.63, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99,
      880.00, 1046.50
    ];
    const bassChords = [130.81, 146.83, 174.61, 196.00];

    const playStep = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      // Arpeggio note
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      const freq = scale[Math.floor(Math.random() * scale.length)];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(noteGain);
      noteGain.connect(this.musicGain);

      osc.start(now);
      osc.stop(now + 1.3);

      // Warm bass pad occasionally
      if (this.noteIndex % 6 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(bassChords[(this.noteIndex / 6) % bassChords.length], now);
        
        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.linearRampToValueAtTime(0.06, now + 0.4);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        bassOsc.connect(bassGain);
        bassGain.connect(this.musicGain);
        bassOsc.start(now);
        bassOsc.stop(now + 3.0);
      }

      this.noteIndex++;
    };

    this.musicInterval = setInterval(playStep, 450);
  }

  public stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  // SFX: Click tap
  public playClick() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
    g.gain.setValueAtTime(0.12, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  // SFX: Sparkle Shimmer
  public playSparkle() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const freqs = [880, 1046, 1318, 1567, 1760, 2093];
    const now = this.ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const t = now + idx * 0.04;
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.1, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(g);
      g.connect(this.sfxGain!);
      osc.start(t);
      osc.stop(t + 0.36);
    });
  }

  // SFX: Balloon Pop
  public playPop() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);
    g.gain.setValueAtTime(0.3, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.11);
  }

  // SFX: Star Collect Bell
  public playStar() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const notes = [587.33, 880, 1174.66];
    notes.forEach((f, i) => {
      const t = now + i * 0.06;
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0.15, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      osc.connect(g);
      g.connect(this.sfxGain!);
      osc.start(t);
      osc.stop(t + 0.65);
    });
  }

  // SFX: Candle Light
  public playCandleLit() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);
    g.gain.setValueAtTime(0.15, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.38);
  }

  // SFX: Magical Door Opening
  public playDoorOpen() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.8);
    g.gain.setValueAtTime(0.01, now);
    g.gain.linearRampToValueAtTime(0.15, now + 0.3);
    g.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 1.25);
    this.playSparkle();
  }

  // SFX: Grand Celebration Fanfare
  public playFanfare() {
    if (this.isSfxMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    // Chords: C, E, G, High C
    const melody = [
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.4 },
      { f: 783.99, d: 0.25 },
      { f: 1046.50, d: 0.8 },
    ];
    let offset = 0;
    melody.forEach((note) => {
      const t = now + offset;
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);
      g.gain.setValueAtTime(0.18, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + note.d);
      osc.connect(g);
      g.connect(this.sfxGain!);
      osc.start(t);
      osc.stop(t + note.d + 0.05);
      offset += note.d * 0.75;
    });
  }
}

export const sound = new SoundEngine();
