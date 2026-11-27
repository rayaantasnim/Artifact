/**
 * Hybrid Cinema Audio Engine:
 * 1. Prioritizes real MP3 soundtrack at `./Assets/audio/bgm.mp3` (looping smoothly,
 *    with clean fade-in/fade-out synced to Play/Pause).
 * 2. Automatically unlocks audio on the user's very first pointer/keyboard interaction
 *    if browser autoplay policy blocks sound on initial page load.
 * 3. Falls back seamlessly to a multi-layered Web Audio API orchestral/sci-fi synth
 *    (sub-bass, fifth anchor, warm string pad, Lydian swells, arpeggio, and impacts)
 *    if `bgm.mp3` is missing or fails to decode.
 */
export class AudioSynth {
  // Real MP3 track state
  private mp3El: HTMLAudioElement | null = null;
  private mp3Status: 'unknown' | 'ready' | 'missing' = 'unknown';
  private mp3FadeRaf = 0;

  // Fallback Web Audio API synth state
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private fifthOsc: OscillatorNode | null = null;
  private shimmerOsc: OscillatorNode | null = null;
  private padOsc: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private arpeggioTimer: number | null = null;
  private arpeggioStep = 0;

  // Shared playback state & autoplay unlock
  private isPlaying = false;
  private currentActId = 1;
  private unlockBound = false;
  private disposed = false;

  private readonly scaleNotes = [
    110.0, // A2
    164.81, // E3
    220.0, // A3
    246.94, // B3
    277.18, // C#4
    329.63, // E4
    369.99, // F#4
    440.0, // A4
    493.88, // B4
  ];

  constructor() {
    this.initMp3Element();
  }

  private initMp3Element(): void {
    if (typeof window === 'undefined' || typeof Audio === 'undefined') {
      this.mp3Status = 'missing';
      return;
    }

    const audio = new Audio('./Assets/audio/bgm.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;

    audio.addEventListener('canplay', () => {
      if (this.disposed) return;
      this.mp3Status = 'ready';
      if (this.isPlaying) {
        this.stopSynthBed();
        void this.playMp3WithFade();
      }
    });

    audio.addEventListener('error', () => {
      if (this.disposed) return;
      this.mp3Status = 'missing';
      if (this.isPlaying) {
        void this.startSynthBed();
      }
    });

    this.mp3El = audio;
  }

  private fadeMp3Volume(targetVolume: number, durationMs: number, pauseOnZero = false): void {
    if (!this.mp3El) return;
    if (this.mp3FadeRaf) {
      window.cancelAnimationFrame(this.mp3FadeRaf);
      this.mp3FadeRaf = 0;
    }

    const startVol = this.mp3El.volume;
    const startTime = performance.now();

    const step = (now: number) => {
      if (!this.mp3El || this.disposed) return;
      const progress = Math.min(1, (now - startTime) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 2);
      this.mp3El.volume = Math.max(0, Math.min(1, startVol + (targetVolume - startVol) * eased));

      if (progress < 1) {
        this.mp3FadeRaf = window.requestAnimationFrame(step);
      } else {
        this.mp3FadeRaf = 0;
        if (pauseOnZero && targetVolume === 0) {
          this.mp3El.pause();
        }
      }
    };

    this.mp3FadeRaf = window.requestAnimationFrame(step);
  }

  private async playMp3WithFade(): Promise<boolean> {
    if (!this.mp3El || this.mp3Status === 'missing') return false;
    try {
      await this.mp3El.play();
      this.fadeMp3Volume(0.58, 700);
      return true;
    } catch {
      this.registerAutoplayUnlock();
      return false;
    }
  }

  private readonly handleUserUnlock = (): void => {
    this.removeAutoplayUnlock();
    if (!this.isPlaying || this.disposed) return;

    const ctx = this.ensureContext();
    if (ctx && ctx.state === 'suspended') {
      void ctx.resume();
    }

    if (this.mp3Status !== 'missing' && this.mp3El) {
      void this.playMp3WithFade();
    }
    if (this.mp3Status === 'missing' || this.mp3Status === 'unknown') {
      void this.startSynthBed();
    }
  };

  private registerAutoplayUnlock(): void {
    if (this.unlockBound || typeof window === 'undefined') return;
    this.unlockBound = true;
    window.addEventListener('pointerdown', this.handleUserUnlock, { capture: true, passive: true });
    window.addEventListener('keydown', this.handleUserUnlock, { capture: true, passive: true });
    window.addEventListener('touchstart', this.handleUserUnlock, { capture: true, passive: true });
  }

  private removeAutoplayUnlock(): void {
    if (!this.unlockBound || typeof window === 'undefined') return;
    this.unlockBound = false;
    window.removeEventListener('pointerdown', this.handleUserUnlock, { capture: true });
    window.removeEventListener('keydown', this.handleUserUnlock, { capture: true });
    window.removeEventListener('touchstart', this.handleUserUnlock, { capture: true });
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (this.ctx) return this.ctx;

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const sfxGain = ctx.createGain();
    sfxGain.gain.setValueAtTime(0.85, ctx.currentTime);
    sfxGain.connect(ctx.destination);

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(220, ctx.currentTime);
    droneFilter.Q.setValueAtTime(2.6, ctx.currentTime);
    droneFilter.connect(masterGain);

    // 55Hz Sub-bass foundation
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(55, ctx.currentTime);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.3, ctx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(droneFilter);

    // 82.41Hz Fifth harmonic anchor
    const fifthOsc = ctx.createOscillator();
    fifthOsc.type = 'triangle';
    fifthOsc.frequency.setValueAtTime(82.41, ctx.currentTime);
    const fifthGain = ctx.createGain();
    fifthGain.gain.setValueAtTime(0.18, ctx.currentTime);
    fifthOsc.connect(fifthGain);
    fifthGain.connect(droneFilter);

    // Detuned pad shimmer
    const shimmerOsc = ctx.createOscillator();
    shimmerOsc.type = 'sawtooth';
    shimmerOsc.frequency.setValueAtTime(110.45, ctx.currentTime);
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.setValueAtTime(0.09, ctx.currentTime);
    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(droneFilter);

    // Warm orchestral octave pad (164.81Hz)
    const padOsc = ctx.createOscillator();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(164.81, ctx.currentTime);
    const padGain = ctx.createGain();
    padGain.gain.setValueAtTime(0.11, ctx.currentTime);
    padOsc.connect(padGain);
    padGain.connect(droneFilter);

    // Slow breathing LFO
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(85, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(droneFilter.frequency);

    subOsc.start();
    fifthOsc.start();
    shimmerOsc.start();
    padOsc.start();
    lfo.start();

    this.ctx = ctx;
    this.masterGain = masterGain;
    this.sfxGain = sfxGain;
    this.droneFilter = droneFilter;
    this.subOsc = subOsc;
    this.fifthOsc = fifthOsc;
    this.shimmerOsc = shimmerOsc;
    this.padOsc = padOsc;
    this.lfo = lfo;

    return ctx;
  }

  private async startSynthBed(): Promise<void> {
    if (!this.isPlaying || this.mp3Status === 'ready') return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        this.registerAutoplayUnlock();
        return;
      }
      if (ctx.state === 'suspended') {
        this.registerAutoplayUnlock();
        return;
      }
    }

    const now = ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.32, now + 0.65);
    this.startArpeggioLoop();
    this.playSynthChordSwell(0.7);
  }

  private stopSynthBed(): void {
    this.stopArpeggioLoop();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
  }

  private getMp3Status(): 'unknown' | 'ready' | 'missing' {
    return this.mp3Status;
  }

  public async setPlaying(playing: boolean): Promise<void> {
    this.isPlaying = playing;

    if (playing) {
      const status = this.getMp3Status();
      if (status === 'ready') {
        this.stopSynthBed();
        await this.playMp3WithFade();
      } else if (status === 'unknown') {
        const mp3Started = await this.playMp3WithFade();
        const latestStatus = this.getMp3Status();
        if (!mp3Started && latestStatus === 'missing') {
          await this.startSynthBed();
        } else if (!mp3Started) {
          this.registerAutoplayUnlock();
        }
      } else {
        await this.startSynthBed();
      }
    } else {
      this.fadeMp3Volume(0, 350, true);
      this.stopSynthBed();
    }
  }

  public setAct(actId: number, triggerImpact = false): void {
    const changed = actId !== this.currentActId;
    this.currentActId = actId;

    if (this.mp3Status === 'ready') return;
    if (!this.ctx || !this.droneFilter || !this.isPlaying || this.ctx.state !== 'running') return;

    const targetCutoff = actId === 1 ? 185 : Math.min(390, 220 + actId * 16);
    this.droneFilter.frequency.setTargetAtTime(targetCutoff, this.ctx.currentTime, 0.45);

    if (changed && triggerImpact) {
      this.playShockwaveImpact(actId === 2 ? 1.15 : 0.9);
      this.playSynthChordSwell(actId === 2 ? 1.0 : 0.75);
    }
  }

  public playSynthChordSwell(intensity = 0.85): void {
    if (this.mp3Status === 'ready') return;
    if (!this.ctx || !this.masterGain || !this.isPlaying || this.ctx.state !== 'running') return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const freqs = [220.0, 329.63, 493.88, 554.37];
    const chordFilter = ctx.createBiquadFilter();
    chordFilter.type = 'lowpass';
    chordFilter.frequency.setValueAtTime(420, now);
    chordFilter.frequency.exponentialRampToValueAtTime(1950, now + 0.85);
    chordFilter.frequency.exponentialRampToValueAtTime(480, now + 2.6);

    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0.0001, now);
    chordGain.gain.linearRampToValueAtTime(0.08 * intensity, now + 0.55);
    chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    chordFilter.connect(chordGain);
    chordGain.connect(this.masterGain);

    for (let i = 0; i < freqs.length; i++) {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freqs[i] * (i === 1 ? 1.003 : 1), now);
      osc.connect(chordFilter);
      osc.start(now);
      osc.stop(now + 2.85);
    }
  }

  public playShockwaveImpact(intensity = 0.9): void {
    if (!this.ctx || !this.sfxGain || !this.isPlaying || this.ctx.state !== 'running') return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const scale = this.mp3Status === 'ready' ? 0.38 : 1;

    const boomOsc = ctx.createOscillator();
    boomOsc.type = 'sine';
    boomOsc.frequency.setValueAtTime(132, now);
    boomOsc.frequency.exponentialRampToValueAtTime(32, now + 0.9);

    const boomGain = ctx.createGain();
    boomGain.gain.setValueAtTime(0.0001, now);
    boomGain.gain.linearRampToValueAtTime(0.28 * intensity * scale, now + 0.025);
    boomGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);

    boomOsc.connect(boomGain);
    boomGain.connect(this.sfxGain);
    boomOsc.start(now);
    boomOsc.stop(now + 1.3);

    const pingOsc = ctx.createOscillator();
    pingOsc.type = 'sine';
    pingOsc.frequency.setValueAtTime(880, now);
    pingOsc.frequency.exponentialRampToValueAtTime(220, now + 0.38);

    const pingGain = ctx.createGain();
    pingGain.gain.setValueAtTime(0.0001, now);
    pingGain.gain.linearRampToValueAtTime(0.06 * intensity * scale, now + 0.015);
    pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    pingOsc.connect(pingGain);
    pingGain.connect(this.sfxGain);
    pingOsc.start(now);
    pingOsc.stop(now + 0.42);

    this.playTransitionWhoosh(0.14 * intensity);
  }

  public playTransitionWhoosh(gainLevel = 0.13): void {
    if (!this.ctx || !this.sfxGain || !this.isPlaying || this.ctx.state !== 'running') return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const effectiveGain = this.mp3Status === 'ready' ? gainLevel * 0.5 : gainLevel;

    const bufferSize = Math.floor(ctx.sampleRate * 0.95);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(160, now);
    bandpass.frequency.exponentialRampToValueAtTime(1550, now + 0.34);
    bandpass.frequency.exponentialRampToValueAtTime(210, now + 0.9);
    bandpass.Q.setValueAtTime(2.2, now);

    const whooshGain = ctx.createGain();
    whooshGain.gain.setValueAtTime(0.0001, now);
    whooshGain.gain.linearRampToValueAtTime(effectiveGain, now + 0.22);
    whooshGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.92);

    noise.connect(bandpass);
    bandpass.connect(whooshGain);
    whooshGain.connect(this.sfxGain);
    noise.start(now);
    noise.stop(now + 0.95);
  }

  private playArpeggioNote(): void {
    if (this.mp3Status === 'ready') return;
    if (!this.ctx || !this.masterGain || !this.isPlaying || this.ctx.state !== 'running') return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const pattern = [0, 2, 5, 4, 6, 3, 7, 5];
    const index = pattern[this.arpeggioStep % pattern.length];
    const freq = this.scaleNotes[index];
    this.arpeggioStep += 1;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const harmonic = ctx.createOscillator();
    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(360, now + 1.35);

    const noteGain = ctx.createGain();
    const peak = this.currentActId === 1 ? 0.055 : 0.085;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(peak, now + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.45);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.28, now);

    osc.connect(filter);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + 1.5);
    harmonic.stop(now + 1.5);
  }

  private startArpeggioLoop(): void {
    if (this.arpeggioTimer !== null) return;
    this.playArpeggioNote();
    this.arpeggioTimer = window.setInterval(() => {
      this.playArpeggioNote();
    }, 980);
  }

  private stopArpeggioLoop(): void {
    if (this.arpeggioTimer !== null) {
      window.clearInterval(this.arpeggioTimer);
      this.arpeggioTimer = null;
    }
  }

  public dispose(): void {
    this.disposed = true;
    this.removeAutoplayUnlock();
    this.stopArpeggioLoop();
    if (this.mp3FadeRaf) {
      window.cancelAnimationFrame(this.mp3FadeRaf);
      this.mp3FadeRaf = 0;
    }
    if (this.mp3El) {
      this.mp3El.pause();
      this.mp3El.src = '';
      this.mp3El = null;
    }
    try {
      this.subOsc?.stop();
      this.fifthOsc?.stop();
      this.shimmerOsc?.stop();
      this.padOsc?.stop();
      this.lfo?.stop();
      void this.ctx?.close();
    } catch {
      // Ignore cleanup errors on already-closed AudioContext
    }
    this.ctx = null;
  }
}
