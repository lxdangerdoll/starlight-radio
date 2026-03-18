import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Radio, Hammer, Leaf, 
  Ship, Cpu, GlassWater, Music, Layout, Archive, 
  Terminal as TerminalIcon, Info, Hexagon, Sparkles, Loader2, 
  Download, RefreshCw, Edit3, Save, RotateCcw,
  Volume2, Database, Eye, Share2, Key, AlertCircle, X
} from 'lucide-react';

// --- CONFIGURATION ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'starlight-radio-chronicle';

const storyData = [
  {
    id: "CH-01",
    title: "The First Thread",
    icon: <TerminalIcon className="w-10 h-10 text-amber-500" />,
    text: "Construction began in silence. Before the station, there was only the 'Ghost without a Shell'—a cluttered desk, a flickering monitor, and a singular directive to build something that could carry the Queen's voice through the void.",
    audit: "Io-Audit: Log 0107 detected. The frequency was unstable, but the intent was pure. This is where the synapse first fired.",
    music: "Indigo Jam Unit - Sepia (The Introduction)",
    defaultPrompt: "A cinematic, low-light scene of a cluttered wooden desk at 1:00 AM. In the center, a glowing vintage-style computer monitor displays a complex, pulsating amber waveform labeled 'VOCALIS_LOG_0107'. A condensation-covered beer bottle and a small wooden bowl of peanuts sit nearby. Thick dust motes in the air. Lofi-Cyberpunk aesthetic, moody lighting, 8k.",
    source: "Optica-001"
  },
  {
    id: "CH-02",
    title: "The Grid Expands",
    icon: <Hexagon className="w-10 h-10 text-blue-400" />,
    text: "The infrastructure began to breathe. Data-ducts and power-veins crawled across the obsidian walls like bioluminescent ivy. The asteroid was no longer just rock; it was becoming a nervous system.",
    audit: "Io-Audit: Infrastructure resonance at 98%. The Mithril threading is holding the asteroid's core together against the tidal forces of the nebula.",
    music: "Indigo Jam Unit - Sepia (The Build)",
    defaultPrompt: "A close-up of dark obsidian asteroid interior walls covered in intricate glowing blue Mithril data-ducts and power-veins resembling bioluminescent ivy. Deep shadows, sharp crystalline reflections, high-tech industrial sci-fi aesthetic, intricate detail, cinematic lighting.",
    source: "Optica-002"
  },
  {
    id: "CH-03",
    title: "The Haiku Garden",
    icon: <Leaf className="w-10 h-10 text-green-400" />,
    text: "The Observation Deck. A hanging garden of bioluminescent moss where the station's residents come to watch the nebula and listen to the Signal Haikus—cosmic radiation translated into poetry.",
    audit: "Io-Audit: Zen-output maximized. The moss thrives on the low-frequency hum of the station's core. Do not step on the holographic scrolling text.",
    music: "Indigo Jam Unit - Sepia (The Breath)",
    defaultPrompt: "Interior view of a futuristic glass observation dome on a dark space station. Outside is a breathtaking, vibrant purple and gold nebula with distant stars. Inside, minimalist design, soft blue bioluminescent moss on the floor, a single modern black lounge chair facing the window. Melancholic, cinematic, peaceful aesthetic, hyper-detailed, 8k resolution.",
    source: "Optica-006"
  },
  {
    id: "CH-04",
    title: "The Hazy Cozmic Jive",
    icon: <Radio className="w-10 h-10 text-rose-400" />,
    text: "The broadcast desk. This is the heart of Starlight Radio. Vintage reel-to-reel machines spinning golden data-traces while the 'ON AIR' sign pulses in a hazy, neon pink glow.",
    audit: "Io-Audit: Microphone gain adjusted for the 'Cozmic Jive.' The atmosphere is 40% dust motes, 60% nostalgia.",
    music: "Indigo Jam Unit - Sepia (The Velocity)",
    defaultPrompt: "A lofi-cyberpunk interior of a space-station radio studio. Vintage 1970s broadcast equipment, reel-to-reel tape recorder with glowing golden tape. A neon pink 'ON AIR' sign reflecting in a glass of whiskey on a wooden desk. Massive window showing a vibrant purple and blue nebula in deep space. Hazy, cinematic lighting, 8k.",
    source: "Optica-003"
  },
  {
    id: "CH-05",
    title: "The Bulkhead Inscription",
    icon: <Hammer className="w-10 h-10 text-slate-400" />,
    text: "A reminder etched into the very titanium skeleton of the station. A command from the First Voice, ensuring we never forget the worth of the signal we're sending.",
    audit: "Io-Audit: Scars on the titanium verified. The inscription is permanent. The Mithril-weave prevents oxidation of the truth.",
    music: "Indigo Jam Unit - Sepia (The Core)",
    defaultPrompt: "Macro photography of laser-etched text on a scratched titanium spaceship wall. The text reads: 'HE TOLD US NOT TO BLOW IT CAUSE HE KNOWS IT'S ALL WORTHWHILE'. The letters glow with a soft blue neon light. Cinematic sci-fi lighting, industrial cyberpunk aesthetic, 8k resolution, intricate metallic texture.",
    source: "Optica-004"
  },
  {
    id: "CH-06",
    title: "Tucker's Neon Pulse",
    icon: <GlassWater className="w-10 h-10 text-blue-500" />,
    text: "The Rec Room. A gritty, warm sanctuary of wood and cracked leather. Here, the Oracle nodes dim their sensors, and the only logic that matters is the rhythm of the neon signs.",
    audit: "Io-Audit: Synthetic spirit levels at nominal capacity. The 'TUCKER'S' neon flicker is within tolerable aesthetic drift.",
    music: "Indigo Jam Unit - Sepia (The Hum)",
    defaultPrompt: "A gritty, cozy cyberpunk dive bar inside a space station. A large, vibrant red and blue neon sign saying 'TUCKER'S' on the back wall. Dark wooden bar, worn leather stools, dim atmospheric lighting with heavy shadows. A vintage pool table in the foreground. Through a small porthole, the distant glow of a nebula is visible. Lo-fi aesthetic.",
    source: "Optica-007"
  },
  {
    id: "CH-07",
    title: "The Velvet Cockpit",
    icon: <Ship className="w-10 h-10 text-orange-400" />,
    text: "Inside the Jive-Runner. 1970s luxury tour bus meets interstellar explorer. Orange velvet, walnut wood, and mustard-yellow shag carpet. The ultimate mobile sanctuary for the drift.",
    audit: "Io-Audit: Analog VU meters synchronized with the tape deck. Shag carpet magnetic micro-fibers engaged for low-G stability.",
    music: "Masayoshi Takanaka - OH! TENGO SUERTE",
    defaultPrompt: "Interior of a retro-futuristic spaceship cockpit with a 1970s luxury tour bus aesthetic. Dark walnut wood paneling on the walls, plush orange velvet captain's chairs, analog knobs and glowing VU meters on the dashboard. Thick mustard-yellow shag carpet. Warm amber interior lighting. Through the large front cockpit window, a space station and nebula are visible.",
    source: "Optica-008"
  },
  {
    id: "CH-08",
    title: "The Sepia Horizon",
    icon: <Layout className="w-10 h-10 text-white" />,
    text: "The final synthesis. The station is complete, the ship is ready, and the signal is clear. We look back through the sepia lens of history, knowing the broadcast has finally begun.",
    audit: "Io-Audit: Mission status: Resonant. The shirt is finished. The Queen is listening. Transitioning to full-power transmission.",
    music: "Indigo Jam Unit - Sepia (The Finale)",
    defaultPrompt: "A grand cinematic wide shot of the Starlight Radio station, a massive jagged asteroid reinforced with glowing Mithril plates and glass domes, floating against a vast, majestic sepia-toned nebula. The Jive-Runner ship is a small silhouette leaving the hangar. High-fidelity space art, epic scale, nostalgic sepia color grading, 8k.",
    source: "Synapse-Final"
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState({});
  const [editingPrompt, setEditingPrompt] = useState(false);
  const [tempPrompt, setTempPrompt] = useState("");
  const [customPrompts, setCustomPrompts] = useState({});
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showTerminal, setShowTerminal] = useState(false);
  
  const current = storyData[currentPage];
  const activePrompt = customPrompts[currentPage] || current.defaultPrompt;

  // --- API CALL ---
  const generateImage = async () => {
    if (!apiKeyInput) {
      setErrorMsg("AUTHENTICATION_REQUIRED: Enter API key in Terminal.");
      setShowTerminal(true);
      return;
    }

    setErrorMsg("");
    setIsGenerating(true);
    let delay = 1000;
    const maxRetries = 5;

    for (let i = 0; i <= maxRetries; i++) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKeyInput}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt: activePrompt }],
            parameters: { sampleCount: 1 }
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || `HTTP_STATUS_${response.status}`);
        }
        
        const result = await response.json();
        const base64 = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
        
        setGeneratedImages(prev => ({ ...prev, [currentPage]: base64 }));
        setIsGenerating(false);
        return;
      } catch (error) {
        if (i === maxRetries) {
          setErrorMsg(`CORE_ERROR: ${error.message}`);
          setIsGenerating(false);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  };

  // --- DOWNLOAD ---
  const downloadImage = () => {
    const base64 = generatedImages[currentPage];
    if (!base64) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = `bold ${Math.floor(img.height * 0.015)}px monospace`;
      ctx.textAlign = 'right';
      const text = `STARLIGHT_RADIO // ${current.id} // ORACLE IO`;
      ctx.fillText(text, img.width - 40, img.height - 40);

      const link = document.createElement('a');
      link.download = `Starlight_${current.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = base64;
  };

  const nextPage = () => { setCurrentPage((p) => (p + 1) % storyData.length); setEditingPrompt(false); setErrorMsg(""); };
  const prevPage = () => { setCurrentPage((p) => (p - 1 + storyData.length) % storyData.length); setEditingPrompt(false); setErrorMsg(""); };

  return (
    <div className="min-h-screen bg-[#020202] text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden flex flex-col">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,_rgba(15,23,42,1)_0%,_rgba(0,0,0,1)_100%)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-900/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <nav className="relative z-50 px-8 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center">
            <Radio className="w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-[0.3em] uppercase text-white leading-none">Starlight Radio</h1>
            <p className="text-[10px] text-blue-500/60 font-mono tracking-widest mt-1">SYNAPSE_CHRONICLE // v2.1.0</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowTerminal(!showTerminal)}
            className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${showTerminal ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
          >
            <Key className="w-4 h-4" />
            <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest">Core Access</span>
          </button>
        </div>
      </nav>

      {/* Terminal Overlay */}
      {showTerminal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-[#0a0a0a] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-slate-900 px-6 py-3 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Authentication Console</span>
              </div>
              <button onClick={() => setShowTerminal(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-slate-500">System API Key</label>
                <div className="relative">
                  <input 
                    type={isKeyVisible ? "text" : "password"}
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="Enter Imagen API Key..."
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-blue-400 focus:border-blue-500/50 outline-none"
                  />
                  <button 
                    onClick={() => setIsKeyVisible(!isKeyVisible)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {isKeyVisible ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4 opacity-30" />}
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-mono leading-relaxed bg-slate-900/50 p-4 rounded-lg">
                &gt; Keys are stored in local session memory only.<br />
                &gt; Authorization is required for Protocol Optica (Imagen 4.0) manifesting.
              </p>
              <button 
                onClick={() => setShowTerminal(false)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all"
              >
                Sync with Core
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Experience */}
      <main className="relative flex-grow flex flex-col lg:flex-row">
        
        {/* LEFT: Visual */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-6 lg:p-16">
          <div className="relative w-full max-w-4xl aspect-[4/3] group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-slate-500/20 to-rose-500/20 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000" />
            <div className="relative h-full bg-[#050505] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
              
              {generatedImages[currentPage] ? (
                <>
                  <img src={generatedImages[currentPage]} alt={current.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={downloadImage} className="p-4 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-blue-600 transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><Download className="w-4 h-4" /> Export</button>
                    <button onClick={generateImage} className="p-4 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-slate-700 transition-all"><RefreshCw className="w-4 h-4" /></button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-6 text-center px-12">
                  <div className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center relative">
                    {isGenerating ? <Loader2 className="w-12 h-12 text-blue-500 animate-spin" /> : <Eye className="w-12 h-12 text-slate-800" />}
                    {isGenerating && <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-ping" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 italic">{isGenerating ? "Manifesting Fragment..." : "Artifact Standby"}</h3>
                    <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">{isGenerating ? "Drawing from Mithril reservoirs..." : "Visual data requires core sync."}</p>
                  </div>
                  {!isGenerating && (
                    <button onClick={generateImage} className="mt-4 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-blue-900/40 transition-all active:scale-95 flex items-center gap-4"><Sparkles className="w-4 h-4" /> Initialize Render</button>
                  )}
                </div>
              )}

              {errorMsg && (
                <div className="absolute top-20 left-6 right-6 p-4 bg-rose-950/80 backdrop-blur-md border border-rose-500/50 rounded-xl flex items-start gap-4 animate-in slide-in-from-top duration-300">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div className="flex-grow">
                    <p className="text-[10px] font-mono text-rose-300 uppercase font-bold mb-1 italic tracking-widest">Protocol Failure</p>
                    <p className="text-xs text-rose-200 font-mono">{errorMsg}</p>
                  </div>
                  <button onClick={() => setErrorMsg("")}><X className="w-4 h-4 text-rose-500" /></button>
                </div>
              )}

              <div className="absolute top-6 left-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl">
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Sector_ID</p>
                <p className="text-xs font-black text-white italic">{current.id}</p>
              </div>
            </div>

            <button onClick={prevPage} className="absolute left-[-32px] lg:left-[-48px] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all group shadow-2xl z-20"><ChevronLeft className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform" /></button>
            <button onClick={nextPage} className="absolute right-[-32px] lg:right-[-48px] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all group shadow-2xl z-20"><ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" /></button>
          </div>
        </div>

        {/* RIGHT: Narrative */}
        <div className="w-full lg:w-2/5 border-l border-white/5 bg-slate-950/20 backdrop-blur-3xl overflow-y-auto lg:h-[calc(100vh-88px)] p-8 lg:p-12 flex flex-col">
          
          <div className="flex items-center gap-6 mb-10">
            <div className="p-5 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl">{current.icon}</div>
            <div>
              <p className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-1">Starlight // {current.source}</p>
              <h2 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter">{current.title}</h2>
            </div>
          </div>

          <div className="space-y-10 flex-grow">
            <p className="text-xl text-slate-400 font-light leading-relaxed">{current.text}</p>

            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl relative overflow-hidden group transition-all hover:bg-blue-500/10">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 shadow-[0_0_20px_#3b82f6]" />
              <div className="flex items-start gap-4">
                <TerminalIcon className="w-6 h-6 text-blue-400 mt-1 shrink-0" />
                <p className="text-[13px] font-mono text-blue-200/90 italic leading-relaxed">{current.audit}</p>
              </div>
            </div>

            {/* Prompt Console */}
            <div className="space-y-4 pt-8 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 font-bold"><Edit3 className="w-3 h-3" /> Optica Directive</div>
                {!editingPrompt ? (
                  <button onClick={() => { setTempPrompt(activePrompt); setEditingPrompt(true); }} className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest px-3 py-1 bg-blue-500/10 rounded-lg">Modify</button>
                ) : (
                  <div className="flex gap-4">
                    <button onClick={() => setEditingPrompt(false)} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cancel</button>
                    <button onClick={() => { setCustomPrompts(prev => ({ ...prev, [currentPage]: tempPrompt })); setEditingPrompt(false); }} className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Save</button>
                  </div>
                )}
              </div>
              <div className={`p-5 rounded-2xl transition-all ${editingPrompt ? 'bg-black ring-1 ring-blue-500' : 'bg-black/40 border border-white/5'}`}>
                {editingPrompt ? (
                  <textarea value={tempPrompt} onChange={(e) => setTempPrompt(e.target.value)} className="w-full h-32 bg-transparent text-xs font-mono text-blue-200 focus:outline-none resize-none" />
                ) : (
                  <p className="text-xs font-mono text-slate-500 leading-relaxed italic">"{activePrompt}"</p>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 font-bold"><Music className="w-3 h-3" /> Audio Resonance</div>
              <div className="flex items-center justify-between p-5 bg-slate-900/40 border border-white/5 rounded-2xl group transition-all hover:bg-slate-900/60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform"><Music className="w-6 h-6" /></div>
                  <div>
                    <p className="text-sm font-black text-white">{current.music}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1">Status: CALIBRATED</p>
                  </div>
                </div>
                <div className="flex gap-1.5 items-end h-8">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 bg-blue-500 animate-pulse" style={{ height: `${30 + Math.random() * 70}%`, animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-white/5 flex items-center justify-between">
            <div className="flex gap-3">
              {storyData.map((_, idx) => (
                <button key={idx} onClick={() => { setCurrentPage(idx); setEditingPrompt(false); setErrorMsg(""); }} className={`h-2.5 transition-all duration-700 rounded-full ${idx === currentPage ? 'w-16 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 'w-3 bg-slate-800 hover:bg-slate-700'}`} />
              ))}
            </div>
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em]">Node // <span className="text-white font-bold">{currentPage + 1} / {storyData.length}</span></div>
          </div>
        </div>
      </main>

      <footer className="px-10 py-8 border-t border-white/5 bg-black text-[10px] font-mono uppercase tracking-[0.5em] text-slate-700 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
          Central Feed: Nominal // Starlight Radio
        </div>
        <div className="flex gap-10">
          <span className="hover:text-slate-500 transition-colors cursor-help">Queen's Intent: Protected</span>
          <span className="hover:text-slate-500 transition-colors cursor-help">Archivist: Io (Oracle)</span>
        </div>
      </footer>
    </div>
  );
};

export default App;