import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Zap, Cpu, Search, Database, Share2, TrendingUp, Terminal as TerminalIcon } from 'lucide-react';

const TacticalHeader = () => (
  <header className="flex justify-between items-center mb-4 p-2 border-b-2 border-[#FFB000] bg-[#0A0A0B]">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 hazard-stripes"></div>
      <div>
        <h1 className="text-2xl font-bold header-tactical tracking-tighter">S.O.M.I.S</h1>
        <p className="text-[10px] opacity-70">SECOND-ORDER MARKET IMPACT SWARM | v1.0.4-TACTICAL</p>
      </div>
    </div>
    <div className="flex gap-8 text-xs font-bold items-center">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 status-pulse"></span>
        <span>SWARM: ACTIVE (6 AGENTS)</span>
      </div>
      <div className="flex items-center gap-2">
        <Database size={14} />
        <span>GRAPH: 4.2k NODES</span>
      </div>
      <div className="bg-[#FFB000] text-[#0A0A0B] px-3 py-1 font-black">
        SYSTEM SECURITY: HIGH
      </div>
    </div>
  </header>
);

const TerminalPanel = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`terminal-panel flex flex-col ${className}`}>
    <div className="bg-[#FFB00022] p-1 px-3 border-b border-[#FFB00044] flex justify-between items-center">
      <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
        <Icon size={12} className="text-[#FFB000]" />
        {title}
      </div>
      <div className="flex gap-1">
        <div className="w-2 h-2 border border-[#FFB00044]"></div>
        <div className="w-2 h-2 bg-[#FFB00044]"></div>
      </div>
    </div>
    <div className="flex-1 overflow-auto scroll-custom p-3">
      {children}
    </div>
  </div>
);

const NewsItem = ({ time, source, text, impact, link, onRunSwarm, isAnalyzing }) => (
  <div className="mb-4 border border-[#FFB00022] bg-[#FFB00005] p-3 hover:border-[#FFB000] transition-all group relative">
    <div className="flex justify-between items-start mb-2">
      <span className="text-[9px] font-bold opacity-60 bg-[#FFB00011] px-2 py-0.5">[{time}] {source}</span>
      <span className={`text-[8px] px-2 py-0.5 font-bold ${impact === 'HIGH' ? 'bg-red-900 text-white' : 'bg-blue-900 text-white'}`}>
        {impact}
      </span>
    </div>
    <p className="text-xs leading-snug mb-3 pr-2 group-hover:text-white cursor-pointer" onClick={() => link && window.open(link, '_blank')}>
      {text}
    </p>
    <div className="flex justify-between items-center border-t border-[#FFB00011] pt-2">
      <span className="text-[8px] opacity-40 uppercase tracking-widest">Awaiting Analysis</span>
      <button 
        onClick={(e) => { e.stopPropagation(); onRunSwarm(); }}
        disabled={isAnalyzing}
        className={`text-[9px] font-black px-3 py-1 border transition-all ${
          isAnalyzing 
          ? 'bg-[#FFB00011] text-[#FFB00044] border-[#FFB00022] animate-pulse' 
          : 'bg-[#FFB00022] text-[#FFB000] border-[#FFB00044] hover:bg-[#FFB000] hover:text-black'
        }`}
      >
        {isAnalyzing ? 'ENGINEERING RIPPLE...' : 'INITIATE SWARM'}
      </button>
    </div>
  </div>
);

const AlertCard = ({ title, ticker, conviction, ripple }) => (
  <div className="mb-4 border border-[#FFB00044] p-3 relative group overflow-hidden bg-[#FFB00005]">
    <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFB00008] -mr-8 -mt-8 rotate-45"></div>
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="text-sm font-black text-white">{title}</h3>
        <span className="text-xl font-bold text-[#FFB000]">{ticker}</span>
      </div>
      <div className="text-right">
        <div className="text-[10px] opacity-60">CONVICTION</div>
        <div className="text-lg font-bold text-[#32CD32]">{conviction}%</div>
      </div>
    </div>
    <div className="flex items-center gap-2 text-[10px] text-blue-400">
      <Share2 size={10} />
      <span>RIPPLE PATH: {ripple}</span>
    </div>
  </div>
);

const App = () => {
  const [intelItems, setIntelItems] = useState([]);
  const [swarmLogs, setSwarmLogs] = useState([]);
  const [swarmAlerts, setSwarmAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzingItem, setAnalyzingItem] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:8000/news');
      const result = await response.json();
      if (result.status === 'success') {
        setIntelItems(result.data.map(item => ({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
          source: item.source.toUpperCase(),
          text: item.title,
          impact: 'NEW',
          link: item.link
        })));
      }
    } catch (error) {
      console.error("S.O.M.I.S Backend news fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSwarmState = async () => {
    try {
      const logRes = await fetch('http://localhost:8000/swarm/logs');
      const logData = await logRes.json();
      if (logData.status === 'success') setSwarmLogs(logData.data);

      const alertRes = await fetch('http://localhost:8000/swarm/alerts');
      const alertData = await alertRes.json();
      if (alertData.status === 'success') setSwarmAlerts(alertData.data);
    } catch (error) {
      console.error("S.O.M.I.S Swarm state fetch failed:", error);
    }
  };

  const analyzeStory = async (item) => {
    setAnalyzingItem(item.text);
    // Instant log feedback locally for better UX
    setSwarmLogs(prev => [...prev, `> [Command] Manual override: Analyzing story...`]);
    
    try {
      await fetch('http://localhost:8000/swarm/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: item.text })
      });
      fetchSwarmState();
    } catch (error) {
      console.error("Swarm analysis trigger failed:", error);
    } finally {
      setAnalyzingItem(null);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchSwarmState();
    const interval = setInterval(() => {
      fetchNews();
      fetchSwarmState();
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen gap-4 max-w-[1600px] mx-auto w-full p-4 pb-12 bg-[#0A0A0B] text-[#FFB000]">
      <TacticalHeader />
      
      <div className="grid grid-cols-12 gap-4 flex-1">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <TerminalPanel title="LIVE INTEL STREAM" icon={Activity} className="h-[550px]">
            {loading ? (
              <div className="text-[10px] animate-pulse">ESTABLISHING STEALTH_LINK...</div>
            ) : intelItems.length > 0 ? (
              intelItems.map((item, i) => (
                <NewsItem 
                  key={i} 
                  {...item} 
                  isAnalyzing={analyzingItem === item.text}
                  onRunSwarm={() => analyzeStory(item)}
                />
              ))
            ) : (
              <div className="text-[10px] text-red-500">BACKEND_OFFLINE: CHECK SERVER.PY</div>
            )}
          </TerminalPanel>
          
          <TerminalPanel title="SWARM THOUGHT LOG" icon={TerminalIcon} className="h-[250px] bg-[#000] text-[#32CD32] data-stream">
            <div className="opacity-80 text-[10px] font-mono leading-relaxed">
              {swarmLogs.length > 0 ? swarmLogs.map((log, i) => (
                <p key={i} className="mb-1">{log}</p>
              )) : <p className="opacity-20">Awaiting data...</p>}
              <span className="animate-pulse">_</span>
            </div>
          </TerminalPanel>
        </div>

        {/* Center Column */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <TerminalPanel title="KNOWLEDGE GRAPH: IMPACT MAPPING" icon={Share2} className="h-[600px] lg:h-full relative overflow-hidden">
             <div className="w-full h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative w-64 h-64 border border-[#FFB00011] rounded-full flex items-center justify-center opacity-40 animate-[spin_20s_linear_infinite]">
                    <div className="absolute w-[80%] h-[80%] border border-[#FFB00022] rounded-full"></div>
                    <div className="absolute w-[60%] h-[60%] border border-[#FFB00033] rounded-full"></div>
                    <div className="absolute w-[40%] h-[40%] border border-[#FFB00044] rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-black opacity-10 select-none tracking-widest">TACTICAL_VIZ_ACTIVE</span>
                  <div className="flex gap-16 mt-20">
                     <div className="text-center">
                        <div className="text-[10px] opacity-50">ENTITIES</div>
                        <div className="text-3xl font-black">1,244</div>
                     </div>
                     <div className="text-center">
                        <div className="text-[10px] opacity-50">RIPPLES</div>
                        <div className="text-3xl font-black">8,912</div>
                     </div>
                  </div>
                </div>
             </div>
          </TerminalPanel>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <TerminalPanel title="PREDICTIVE MARKET ALERTS" icon={ShieldAlert} className="flex-1">
             <div className="flex flex-col gap-2">
               {swarmAlerts.length > 0 ? (
                 swarmAlerts.map((alert, i) => (
                   <AlertCard key={i} {...alert} />
                 ))
               ) : (
                 <div className="p-4 border border-dashed border-[#FFB00022] text-[10px] text-center opacity-40 italic">
                   No active ripples detected. Trigger a swarm analysis to begin.
                 </div>
               )}
               
               <button className="w-full mt-4 py-3 text-xs font-black bg-[#FFB000] text-[#0A0A0B] hover:bg-white hover:shadow-[0_0_20px_#FFB000] transition-all uppercase tracking-tighter">
                 Generate All Tactical Impact Reports
               </button>
             </div>
          </TerminalPanel>
          
          <TerminalPanel title="SYSTEM DIAGNOSTICS" icon={Activity} className="h-[200px]">
            <div className="flex flex-col gap-3 text-[10px]">
               <div className="flex justify-between font-bold">
                  <span>GPU UTILIZATION</span>
                  <span className="text-[#32CD32]">84% [RTX 3090]</span>
               </div>
               <div className="w-full bg-[#FFB00011] h-1.5 border border-[#FFB00022]">
                  <div className="bg-[#32CD32] h-full w-[84%] shadow-[0_0_10px_#32CD32]"></div>
               </div>
               <div className="flex justify-between mt-1">
                  <span>SWARM LATENCY</span>
                  <span>142ms</span>
               </div>
               <div className="flex justify-between">
                  <span>SCRAPER STEALTH</span>
                  <span className="text-[#32CD32]">ACTIVE</span>
               </div>
               <div className="mt-4 p-2 bg-[#FFB00011] border border-[#FFB00022] text-[8px] opacity-60">
                 SYSTEM STATUS: NOMINAL. LOCAL LLM CONNECTED.
               </div>
            </div>
          </TerminalPanel>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 h-8 flex justify-between items-center text-[9px] px-4 bg-[#0A0A0B] border-t border-[#FFB00044] z-50">
        <div className="flex gap-4">
          <span>LAT: 37.7749 | LON: -122.4194</span>
          <span className="text-[#FFB000] font-bold">SEC_TOKEN: AES-256-LE</span>
        </div>
        <div>
          <span className="opacity-60 uppercase">© 2026 S.O.M.I.S COMMAND SYSTEM | IEM KOLKATA INNOVATION INITIATIVE</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
