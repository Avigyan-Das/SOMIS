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

const NewsItem = ({ time, source, text, impact }) => (
  <div className="mb-3 border-l-2 border-[#FFB00044] pl-3 py-1 hover:bg-[#FFB00008] transition-colors cursor-pointer group">
    <div className="flex justify-between items-center mb-1">
      <span className="text-[10px] font-bold opacity-60">[{time}] {source}</span>
      <span className={`text-[9px] px-2 py-0.5 font-bold ${impact === 'HIGH' ? 'bg-red-900 text-red-200' : 'bg-blue-900 text-blue-200'}`}>
        {impact} IMPACT
      </span>
    </div>
    <p className="text-xs leading-relaxed group-hover:text-white">{text}</p>
  </div>
);

const AlertCard = ({ title, ticker, conviction, ripple }) => (
  <div className="mb-4 border border-[#FFB00044] p-3 relative group overflow-hidden">
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
    <div className="flex items-center gap-2 text-[10px] text-blue-400 mb-2">
      <Share2 size={10} />
      <span>RIPPLE PATH: {ripple}</span>
    </div>
    <button className="w-full py-1 text-[10px] font-bold bg-[#FFB000] text-[#0A0A0B] hover:bg-white transition-colors">
      GENERATE DETAILED IMPACT REPORT
    </button>
  </div>
);

const App = () => {
  return (
    <div className="flex flex-col h-full gap-4 max-w-[1600px] mx-auto w-full">
      <TacticalHeader />
      
      <div className="grid grid-cols-12 gap-4 flex-1 overflow-hidden">
        {/* Left Column: Input & Swarm Logic */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          <TerminalPanel title="LIVE INTEL STREAM" icon={Activity} className="flex-[2]">
            <NewsItem 
              time="20:04:12" 
              source="REUTERS" 
              text="Factory explosion reported in semiconductor plant, Kaohsiung. Possible production halt for 4 weeks."
              impact="HIGH"
            />
            <NewsItem 
              time="19:58:33" 
              source="GEOPOL-AGENT" 
              text="Panama Canal congestion levels rising. 15% increase in cargo delay risk for East Coast routes."
              impact="MEDIUM"
            />
            <NewsItem 
              time="19:45:10" 
              source="ENERGY-MONITOR" 
              text="Norway gas pipeline maintenance extended by 72 hours. EU spot prices responding."
              impact="HIGH"
            />
          </TerminalPanel>
          
          <TerminalPanel title="SWARM THOUGHT LOG" icon={TerminalIcon} className="flex-1 bg-[#000] text-[#32CD32] data-stream">
            <div className="opacity-80">
              <p>> [Agent:Extractor] Found entity: TSMC (Supplier)</p>
              <p>> [Agent:Ripple] Tracing dependency: Neon Gas -> Laser Etching -> GPU Fab</p>
              <p>> [Agent:Market] Cross-referencing 10-K filings for NVIDIA partners...</p>
              <p>> [Agent:Oracle] Calculating probability of supply-side shock: 0.84</p>
              <span className="animate-pulse">_</span>
            </div>
          </TerminalPanel>
        </div>

        {/* Center Column: Knowledge Graph / Visualizer */}
        <div className="col-span-6 flex flex-col gap-4 overflow-hidden">
          <TerminalPanel title="KNOWLEDGE GRAPH: SECOND-ORDER IMPACT MAPPING" icon={Share2} className="flex-1 relative overflow-hidden">
             {/* Mock Graph Visualization */}
             <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full border border-[#FFB00011] rounded-full flex items-center justify-center opacity-40">
                    <div className="absolute w-[80%] h-[80%] border border-[#FFB00022] rounded-full"></div>
                    <div className="absolute w-[60%] h-[60%] border border-[#FFB00033] rounded-full"></div>
                    <div className="absolute w-[40%] h-[40%] border border-[#FFB00044] rounded-full"></div>
                    
                    {/* Floating Nodes */}
                    <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-[#FFB000] shadow-[0_0_10px_#FFB000]"></div>
                    <div className="absolute bottom-[30%] right-[25%] w-3 h-3 bg-blue-500 shadow-[0_0_10px_blue]"></div>
                    <div className="absolute top-[50%] left-[10%] w-2 h-2 bg-[#FFB000] opacity-50"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-black opacity-10 select-none">TACTICAL_VIZ_ACTIVE</span>
                  <div className="flex gap-10 mt-20">
                     <div className="text-center">
                        <div className="text-xs opacity-50">ENTITIES</div>
                        <div className="text-2xl font-bold">1,244</div>
                     </div>
                     <div className="text-center">
                        <div className="text-xs opacity-50">RIPPLES</div>
                        <div className="text-2xl font-bold">8,912</div>
                     </div>
                  </div>
                </div>
             </div>
          </TerminalPanel>
        </div>

        {/* Right Column: Predictive Alerts & Market Data */}
        <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
          <TerminalPanel title="PREDICTIVE MARKET ALERTS" icon={ShieldAlert} className="flex-1">
             <AlertCard 
               title="Automotive Supply Shock" 
               ticker="F" 
               conviction={92} 
               ripple="Explosion -> Chips -> Modules -> Assembly"
             />
             <AlertCard 
               title="Energy Logistics Strain" 
               ticker="XOM" 
               conviction={78} 
               ripple="Norway -> EU Pipeline -> LNG Demand"
             />
             <AlertCard 
               title="Consumer Electronics Lag" 
               ticker="AAPL" 
               conviction={64} 
               ripple="Display Panel Shortage -> Q4 Volume"
             />
          </TerminalPanel>
          
          <TerminalPanel title="SYSTEM DIAGNOSTICS" icon={Activity} className="h-[200px]">
            <div className="flex flex-col gap-2 text-[10px]">
               <div className="flex justify-between">
                  <span>GPU UTILIZATION (KOBOLD)</span>
                  <span className="text-[#32CD32]">84% [RTX 3090]</span>
               </div>
               <div className="w-full bg-[#FFB00011] h-1">
                  <div className="bg-[#32CD32] h-full w-[84%]"></div>
               </div>
               <div className="flex justify-between mt-2">
                  <span>LATENCY</span>
                  <span>14ms</span>
               </div>
               <div className="flex justify-between">
                  <span>SCRAPER STATUS</span>
                  <span className="text-[#32CD32]">STEALTH_ENABLED</span>
               </div>
            </div>
          </TerminalPanel>
        </div>
      </div>

      <footer className="h-6 flex justify-between items-center text-[9px] px-2 bg-[#FFB00008] border-t border-[#FFB00022]">
        <div className="flex gap-4">
          <span>LAT: 37.7749 | LON: -122.4194</span>
          <span className="text-[#FFB000]">SECURITY_TOKEN: AES-256-LE</span>
        </div>
        <div>
          <span>© 2026 S.O.M.I.S COMMAND SYSTEM</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
