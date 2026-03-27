import React, { useState, useEffect, useRef } from 'react';
import { Activity, ShieldAlert, Zap, Cpu, Search, Database, Share2, TrendingUp, Terminal as TerminalIcon, Maximize2, Minimize2, ArrowUpRight, ArrowDownRight, Clock, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TacticalHeader = () => (
  <header className="flex justify-between items-center mb-4 p-2 border-b-2 border-[#FFB000] bg-[#0A0A0B]">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 hazard-stripes"></div>
      <div>
        <h1 className="text-2xl font-bold header-tactical tracking-tighter text-[#FFB000]">S.O.M.I.S</h1>
        <p className="text-[10px] opacity-70 text-[#FFB000]">SECOND-ORDER MARKET IMPACT SWARM | v1.0.4-TACTICAL</p>
      </div>
    </div>
    <div className="flex gap-8 text-xs font-bold items-center text-[#FFB000]">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 status-pulse"></span>
        <span>SWARM: ACTIVE (3 AGENTS)</span>
      </div>
      <div className="flex items-center gap-2 text-blue-400">
        <Database size={14} />
        <span>ALPHA-GRAPH: LOADED</span>
      </div>
      <div className="bg-[#FFB000] text-[#0A0A0B] px-3 py-1 font-black">
        SYSTEM SECURITY: HIGH
      </div>
    </div>
  </header>
);

const TerminalPanel = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`terminal-panel flex flex-col ${className} border border-[#FFB00044] bg-[#0A0A0B] overflow-hidden`}>
    <div className="bg-[#FFB00022] p-1 px-3 border-b border-[#FFB00044] flex justify-between items-center">
      <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#FFB000]">
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
      <span className="text-[9px] font-bold opacity-60 bg-[#FFB00011] px-2 py-0.5 text-[#FFB000]">[{time}] {source}</span>
      <span className={`text-[8px] px-2 py-0.5 font-bold ${impact === 'HIGH' ? 'bg-red-900 text-white' : 'bg-blue-900 text-white'}`}>
        {impact}
      </span>
    </div>
    <p className="text-xs leading-snug mb-3 pr-2 group-hover:text-white cursor-pointer text-[#FFB000]" onClick={() => link && window.open(link, '_blank')}>
      {text}
    </p>
    <div className="flex justify-between items-center border-t border-[#FFB00011] pt-2">
      <span className="text-[8px] opacity-40 uppercase tracking-widest text-[#FFB000]">Awaiting Analysis</span>
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

const AlertCard = ({ ticker, conviction, ripple, stance, timeframe, onExecute }) => {
  const isHighConviction = conviction > 85;
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      onExecute(ticker);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`mb-4 border ${isHighConviction ? 'border-[#FFB000] shadow-[0_0_15px_rgba(255,176,0,0.2)]' : 'border-[#FFB00044]'} p-4 relative bg-[#0A0A0B] overflow-hidden group`}
    >
      {isHighConviction && <div className="absolute top-0 left-0 w-full h-1 hazard-stripes"></div>}
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-[10px] font-bold text-[#FFB000] mb-1 flex items-center gap-1 uppercase tracking-widest">
            <Target size={10} /> Target Identified
          </div>
          <span className="text-3xl font-black text-white tracking-tighter">{ticker}</span>
        </div>
        <div className="text-right">
          <div className="text-[8px] opacity-60 text-[#FFB000]">CONVICTION</div>
          <div className={`text-xl font-black ${conviction > 80 ? 'text-[#32CD32]' : 'text-[#FFB000]'}`}>{conviction}%</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-[#FFB00011] p-2 border border-[#FFB00022]">
          <div className="text-[7px] opacity-50 uppercase mb-1 text-[#FFB000]">Tactical Stance</div>
          <div className="flex items-center gap-1 text-[10px] font-black text-[#32CD32]">
            <ArrowUpRight size={12} /> {stance || 'STRONG_BUY'}
          </div>
        </div>
        <div className="bg-[#FFB00011] p-2 border border-[#FFB00022]">
          <div className="text-[7px] opacity-50 uppercase mb-1 text-[#FFB000]">Time to Impact</div>
          <div className="flex items-center gap-1 text-[10px] font-black text-blue-400">
            <Clock size={12} /> {timeframe || 'IMMEDIATE'}
          </div>
        </div>
      </div>

      <div className="text-[10px] text-white leading-relaxed mb-4 font-mono p-2 bg-[#FFB00005] border-l-2 border-[#FFB000]">
        <span className="text-[#FFB000] font-bold uppercase">Ripple Logic:</span> {ripple}
      </div>

      <button 
        onClick={handleExecute}
        disabled={isExecuting}
        className={`w-full py-2 text-[9px] font-black transition-all uppercase tracking-widest border ${
          isExecuting 
          ? 'bg-transparent text-white border-white animate-pulse cursor-wait' 
          : 'bg-[#FFB000] text-[#0A0A0B] border-[#FFB000] hover:bg-white hover:border-white'
        }`}
      >
        {isExecuting ? 'TRANSMITTING TRADE...' : 'Execute Defensive Hedge'}
      </button>
    </motion.div>
  );
};

const TacticalGraph = ({ nodes = [], edges = [] }) => {
  const width = 1200;
  const height = 800;
  const [scale, setScale] = useState(1);
  const constraintsRef = useRef(null);

  const activeNodes = (nodes || []).map((n, i) => {
    const angle = (i / ((nodes || []).length || 1)) * 2 * Math.PI;
    const radius = i % 2 === 0 ? 300 : 200;
    return {
      ...n,
      x: width / 2 + Math.cos(angle) * radius,
      y: height / 2 + Math.sin(angle) * radius
    };
  });

  const handleWheel = (e) => {
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(scale + delta, 0.4), 3);
    setScale(newScale);
  };

  return (
    <div 
      ref={constraintsRef}
      className="w-full h-full relative overflow-hidden bg-[#0A0A0B] border border-[#FFB00011] cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
    >
      <motion.div 
        drag 
        dragConstraints={constraintsRef}
        animate={{ scale }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ width, height, transformOrigin: 'center center' }}
      >
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {(edges || []).map((edge, i) => {
            const source = activeNodes.find(n => n.id === edge.source);
            const target = activeNodes.find(n => n.id === edge.target);
            if (!source || !target) return null;
            return (
              <g key={`edge-${i}`}>
                <motion.line initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.1 }} x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="#FFB000" strokeWidth="1" />
                <motion.circle r="2" fill="#FFB000" animate={{ cx: [source.x, target.x], cy: [source.y, target.y], opacity: [0, 1, 0] }} transition={{ duration: 5, repeat: Infinity, delay: i * 0.2, ease: "linear" }} />
              </g>
            );
          })}
          {activeNodes.map((node, i) => {
            const impactValue = node.impact || 0;
            const color = impactValue < 0 ? "#ef4444" : impactValue > 0 ? "#22c55e" : "#FFB000";
            return (
              <motion.g key={`node-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <motion.circle cx={node.x} cy={node.y} r={impactValue !== 0 ? 15 : 8} fill={color} opacity={0.1} animate={impactValue !== 0 ? { scale: [1, 2, 1], opacity: [0.1, 0.5, 0.1] } : {}} transition={{ duration: 2, repeat: Infinity }} />
                <circle cx={node.x} cy={node.y} r={5} fill={color} />
                <text x={node.x + 12} y={node.y + 4} className="text-[10px] font-black fill-white pointer-events-none uppercase tracking-tighter" style={{ filter: 'drop-shadow(0 0 2px black)' }}>{node.id}</text>
                {impactValue !== 0 && <text x={node.x + 12} y={node.y + 16} className="text-[8px] font-black fill-white opacity-80">{impactValue > 0 ? '+' : ''}{impactValue.toFixed(1)}</text>}
              </motion.g>
            );
          })}
        </svg>
      </motion.div>
      <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-auto">
         <button onClick={() => setScale(s => Math.min(s + 0.2, 3))} className="p-2 bg-[#FFB00022] border border-[#FFB00044] hover:bg-[#FFB000] hover:text-black transition-all text-[#FFB000]"><Maximize2 size={14} /></button>
         <button onClick={() => setScale(s => Math.max(s - 0.2, 0.4))} className="p-2 bg-[#FFB00022] border border-[#FFB00044] hover:bg-[#FFB000] hover:text-black transition-all text-[#FFB000]"><Minimize2 size={14} /></button>
      </div>
    </div>
  );
};

const App = () => {
  const [intelItems, setIntelItems] = useState([]);
  const [swarmLogs, setSwarmLogs] = useState([]);
  const [swarmAlerts, setSwarmAlerts] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
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
          text: item.title, impact: 'NEW', link: item.link
        })));
      }
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const fetchGraph = async () => {
    try {
      const response = await fetch('http://localhost:8000/graph');
      const result = await response.json();
      if (result.status === 'success') setGraphData(result);
    } catch (error) { console.error(error); }
  };

  const fetchSwarmState = async () => {
    try {
      const logRes = await fetch('http://localhost:8000/swarm/logs');
      const logData = await logRes.json();
      if (logData.status === 'success') setSwarmLogs(logData.data);

      const alertRes = await fetch('http://localhost:8000/swarm/alerts');
      const alertData = await alertRes.json();
      if (alertData.status === 'success') setSwarmAlerts(alertData.data);
    } catch (error) { console.error(error); }
  };

  const analyzeStory = async (item) => {
    setAnalyzingItem(item.text);
    setSwarmLogs(prev => [...prev, `> [Command] Initiating Ripple Analysis Swarm...`]);
    try {
      await fetch('http://localhost:8000/swarm/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: item.text })
      });
      fetchSwarmState(); fetchGraph();
    } catch (error) { console.error(error); }
    finally { setAnalyzingItem(null); }
  };

  useEffect(() => {
    fetchNews(); fetchSwarmState(); fetchGraph();
    const interval = setInterval(() => { fetchNews(); fetchSwarmState(); fetchGraph(); }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen gap-4 max-w-[1600px] mx-auto w-full p-4 pb-12 bg-[#0A0A0B] text-[#FFB000]">
      <TacticalHeader />
      <div className="grid grid-cols-12 gap-4 flex-1">
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <TerminalPanel title="LIVE INTEL STREAM" icon={Activity} className="h-[550px]">
            {loading ? (<div className="text-[10px] animate-pulse">BOOTING_STEALTH_SCRAPER...</div>) : intelItems.map((item, i) => (<NewsItem key={i} {...item} isAnalyzing={analyzingItem === item.text} onRunSwarm={() => analyzeStory(item)} />))}
          </TerminalPanel>
          <TerminalPanel title="SWARM THOUGHT LOG" icon={TerminalIcon} className="h-[250px] bg-[#000] text-[#32CD32] data-stream font-mono">
            {swarmLogs.map((log, i) => <p key={i} className="mb-1 text-[10px]">{log}</p>)}
            <span className="animate-pulse">_</span>
          </TerminalPanel>
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
          <TerminalPanel title="KNOWLEDGE GRAPH: RIPPLE TOPOLOGY" icon={Share2} className="h-[600px] lg:h-full relative overflow-hidden">
             <TacticalGraph nodes={graphData.nodes} edges={graphData.edges} />
          </TerminalPanel>
        </div>
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <TerminalPanel title="PREDICTIVE ALPHA ALERTS" icon={ShieldAlert} className="flex-1">
             {swarmAlerts.length > 0 ? swarmAlerts.map((alert, i) => <AlertCard key={i} {...alert} />) : (<div className="p-4 border border-dashed border-[#FFB00022] text-[10px] text-center opacity-40 italic">Awaiting tactical detection...</div>)}
             <button className="w-full mt-4 py-3 text-xs font-black bg-[#FFB000] text-[#0A0A0B] hover:bg-white transition-all uppercase tracking-tighter">Export Intelligence Report</button>
          </TerminalPanel>
          <TerminalPanel title="SYSTEM DIAGNOSTICS" icon={Activity} className="h-[200px]">
            <div className="flex flex-col gap-3 text-[10px]">
               <div className="flex justify-between font-bold"><span>GPU LOAD (PHI-3.5)</span><span className="text-[#32CD32]">OPTIMAL</span></div>
               <div className="w-full bg-[#FFB00011] h-1.5 border border-[#FFB00022]"><div className="bg-[#32CD32] h-full w-[65%]"></div></div>
               <div className="flex justify-between mt-1"><span>SWARM LATENCY</span><span>142ms</span></div>
               <div className="flex justify-between"><span>SCRAPER STEALTH</span><span className="text-[#32CD32]">ACTIVE</span></div>
               <div className="mt-4 p-2 bg-[#FFB00011] border border-[#FFB00022] text-[8px] opacity-60 uppercase">System Ready for Alpha Detection.</div>
            </div>
          </TerminalPanel>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 h-8 flex justify-between items-center text-[9px] px-4 bg-[#0A0A0B] border-t border-[#FFB00044] z-50">
        <div className="flex gap-4"><span>LAT: 22.5726 | LON: 88.3639 [KOLKATA]</span><span className="text-[#FFB000] font-bold">ET_AI_H_2026</span></div>
        <div className="opacity-60 uppercase">© 2026 S.O.M.I.S | Opportunity Radar Track</div>
      </footer>
    </div>
  );
};

export default App;
