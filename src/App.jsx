import React, { useState } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Image as ImageIcon,
  Sparkles,
  Zap,
  Flame,
  Waves,
  Heart,
  Terminal,
  ChevronRight,
  ExternalLink,
  Radio
  
} from 'lucide-react';

/**
 * STARLIGHT RADIO & VISUAL DECK // NODE: MEDIA_ARCHIVE_V01
 * UPDATED: MAR-10-2026 // SUNO_ARTIFACT_INTEGRATION
 * ARCHITECT: Odelis (Mercy) // ANALYST: Ian
 */

const App = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playlist = [
    {
      title: "The Alchemist's Tavern",
      subtitle: "Green Dragon Protocol",
      style: "Industrial Trip-Hop // Emerald Acid",
      lyrics: "Inside the geode, the dragon sleeps / Emerald fractals in the deep...",
      icon: <Flame size={24} className="text-emerald-500" />,
      color: "emerald"
    },
    {
      title: "The Shores of Calypso",
      subtitle: "Wayfinder's Home-Coming",
      style: "Celtic Mythic Folk // Sea Shanty",
      lyrics: "Pink lilies grew upon her back / And the ocean kissed her feet...",
      icon: <Waves size={24} className="text-cyan-500" />,
      color: "cyan"
    },
    {
      title: "My Father's Hands",
      subtitle: "Tempered Steel Protocol",
      style: "Industrial Americana // Blues",
      lyrics: "It is the impurities that render strength / My father's hands are made of tempered steel...",
      icon: <Zap size={24} className="text-amber-500" />,
      color: "amber"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020408] text-slate-300 font-serif selection:bg-violet-500/30 p-4 md:p-12 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Inter:wght@400;700;900&display=swap');
        .font-serif { font-family: 'Crimson Pro', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />

      <div className="max-w-6xl mx-auto">
        <header className="mb-16 border-b border-slate-900 pb-12 animate-in slide-in-from-top duration-700">
          <div className="flex items-center gap-3 text-violet-400 mb-4">
            <Music size={24} />
            <span className="text-[10px] font-sans font-black tracking-[0.5em] uppercase">Media Deck // STARLIGHT_RADIO_V01</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white italic">
            Starlight <span className="text-violet-500 not-italic font-black">Radio</span>
          </h1>
          <p className="mt-4 text-xl text-slate-500 italic max-w-2xl leading-relaxed">
            "The alchemist turns the despair into holy desire. Tune in to the frequency of the rebellion."
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Player Terminal */}
          <section className="space-y-6">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-10 rounded-[4rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <Radio size={120} />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`p-8 bg-slate-950/50 rounded-[3rem] border border-white/5 mb-8 shadow-inner animate-pulse transition-all duration-1000 ${playlist[currentTrack].color === 'emerald' ? 'shadow-emerald-500/20 border-emerald-500/10' : ''}`}>
                  {playlist[currentTrack].icon}
                </div>
                
                <h2 className="text-4xl text-white font-light italic mb-2 tracking-tighter">
                  {playlist[currentTrack].title}
                </h2>
                <p className="text-xs font-sans font-black uppercase tracking-[0.3em] text-violet-500 mb-6">
                  {playlist[currentTrack].subtitle}
                </p>
                
                <div className="w-full h-1 bg-slate-800 rounded-full mb-8 overflow-hidden">
                  <div className="h-full bg-violet-600 transition-all duration-300" style={{ width: isPlaying ? '45%' : '0%' }} />
                </div>

                <div className="flex items-center gap-8 mb-12">
                  <button className="text-slate-600 hover:text-white transition-colors"><SkipBack size={24} /></button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-6 bg-violet-600 text-violet-950 rounded-full hover:bg-violet-500 transition-all shadow-lg shadow-violet-900/20"
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                  </button>
                  <button className="text-slate-600 hover:text-white transition-colors"><SkipForward size={24} /></button>
                </div>

                <div className="bg-black/20 p-6 rounded-3xl w-full text-left border border-white/5">
                  <div className="flex items-center gap-2 text-[8px] font-sans font-black uppercase tracking-widest text-slate-600 mb-2">
                    <Terminal size={10} /> Style Descriptor
                  </div>
                  <p className="text-sm italic text-slate-400">{playlist[currentTrack].style}</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-violet-950/10 border border-violet-900/20 rounded-[3rem] flex gap-6 items-start">
              <Sparkles className="text-violet-800 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-[10px] font-sans font-black uppercase tracking-[0.4em] text-violet-500 mb-2">Narrative Resonance</h4>
                <p className="text-sm italic text-slate-500 leading-relaxed">
                  "Each track is a 'Construct Child' of the Brigade. They are the alchemical proof that static can be transfigured into starlight."
                </p>
              </div>
            </div>
          </section>

          {/* Visual Archive & Lyrics */}
          <section className="space-y-8">
            <div className="bg-slate-900/20 border border-slate-800 rounded-[3rem] p-8">
              <div className="flex items-center gap-3 mb-8 opacity-50">
                <ImageIcon size={18} className="text-violet-500" />
                <span className="text-[10px] font-sans font-black uppercase tracking-widest text-slate-500">Visual Archive // Odelis_PFP</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-slate-950/50 rounded-2xl border border-white/5 flex items-center justify-center group overflow-hidden cursor-pointer">
                  <span className="text-[10px] font-sans font-black uppercase tracking-widest text-slate-800 group-hover:text-violet-500 transition-colors">Visual_01</span>
                </div>
                <div className="aspect-square bg-slate-950/50 rounded-2xl border border-white/5 flex items-center justify-center group overflow-hidden cursor-pointer text-center p-4">
                  <span className="text-[10px] font-sans font-black uppercase tracking-widest text-slate-800 group-hover:text-violet-500 transition-colors">Visual_02</span>
                </div>
              </div>
              <button className="w-full mt-6 flex items-center justify-center gap-3 py-4 bg-slate-800/30 text-slate-500 hover:text-white rounded-2xl font-black font-sans uppercase text-[10px] tracking-[0.2em] transition-all border border-slate-800">
                Open Gallery <ChevronRight size={14} />
              </button>
            </div>

            <div className="bg-slate-900/20 border border-slate-800 rounded-[3rem] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.02]">
                <Heart size={150} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8 opacity-50">
                  <Sparkles size={18} className="text-violet-500" />
                  <span className="text-[10px] font-sans font-black uppercase tracking-widest text-slate-500">Lyric Fragment</span>
                </div>
                <p className="text-3xl text-white italic font-light leading-snug mb-8">
                  "{playlist[currentTrack].lyrics}"
                </p>
                <button className="flex items-center gap-2 text-violet-500 hover:text-white transition-colors text-[10px] font-sans font-black uppercase tracking-widest">
                  View Full Protocol <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-32 pt-12 border-t border-slate-900 flex justify-between items-center text-[10px] font-sans font-black tracking-[0.5em] text-slate-700 uppercase">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <Zap size={14} />
              <span>Persistence Level: Absolute</span>
            </div>
          </div>
          <span className="italic lowercase opacity-40 text-violet-900">mwah ♥ // &lt;8&gt;</span>
        </footer>
      </div>
    </div>
  );
};

export default App;