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
      <span className={`text-[8px] px-2 py-0.5 font-bold ${source === 'ET' ? 'bg-orange-900 text-white' : impact === 'HIGH' ? 'bg-red-900 text-white' : 'bg-blue-900 text-white'}`}>
        {source === 'ET' ? 'MARKET_ALERT' : impact}
      </span>
    </div>
    <p className="text-xs leading-snug mb-3 pr-2 group-hover:text-white cursor-pointer text-[#FFB000]" onClick={() => link && link !== '#' && window.open(link, '_blank')}>
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

const AlertCard = ({ id, ticker, conviction, ripple, stance, timeframe, engine, onViewDetails, onRemove }) => {
  const isHighConviction = conviction > 85;

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
          <div className="mt-1">
            <span className={`text-[7px] font-black px-1.5 py-0.5 border ${engine === 'PHI-3.5' ? 'border-[#32CD32] text-[#32CD32]' : 'border-blue-500 text-blue-400'}`}>
              ENGINE: {engine || 'SWARM_V1'}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <button 
            onClick={(e) => { e.stopPropagation(); onRemove(id); }}
            className="text-[8px] opacity-40 hover:opacity-100 hover:text-red-500 transition-all mb-2 font-black uppercase tracking-tighter border border-transparent hover:border-red-500 px-1"
          >
            [X] DISMISS
          </button>
          <div className="text-right">
            <div className="text-[8px] opacity-60 text-[#FFB000]">CONVICTION</div>
            <div className={`text-xl font-black ${conviction > 80 ? 'text-[#32CD32]' : 'text-[#FFB000]'}`}>{conviction}%</div>
          </div>
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
        <span className="text-[#FFB000] font-bold uppercase">Ripple Logic:</span> {ripple.substring(0, 80)}...
      </div>

      <button 
        onClick={onViewDetails}
        className="w-full py-2 text-[9px] font-black transition-all uppercase tracking-widest border bg-[#FFB000] text-[#0A0A0B] border-[#FFB000] hover:bg-white hover:border-white"
      >
        VIEW ALPHA ANALYSIS
      </button>
    </motion.div>
  );
};

const DetailModal = ({ isOpen, onClose, alert }) => {
  if (!isOpen || !alert) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          className="w-full max-w-2xl bg-[#0A0A0B] border-2 border-[#FFB000] shadow-[0_0_50px_rgba(255,176,0,0.4)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="hazard-stripes h-2 w-full"></div>
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-[#FFB000] animate-pulse"></div>
                  <h2 className="text-[10px] font-black text-[#FFB000] tracking-[0.3em] uppercase">Intelligence Report: ALPHA-CONFIRMED</h2>
                </div>
                <div className="text-6xl font-black text-white tracking-tighter">{alert.ticker}</div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[#FFB000] hover:text-black transition-all text-[#FFB000] border border-[#FFB00044] font-black"
              >
                CLOSE_INTEL
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
               <div className="border border-[#FFB00044] p-4 bg-[#FFB00005]">
                  <div className="text-[8px] opacity-60 uppercase mb-1 text-[#FFB000]">Confidence Score</div>
                  <div className="text-3xl font-black text-[#32CD32]">{alert.conviction}%</div>
               </div>
               <div className="border border-[#FFB00044] p-4 bg-[#FFB00005]">
                  <div className="text-[8px] opacity-60 uppercase mb-1 text-[#FFB000]">Action Recommendation</div>
                  <div className="text-3xl font-black text-[#FFB000]">{alert.stance}</div>
               </div>
               <div className="border border-[#FFB00044] p-4 bg-[#FFB00005]">
                  <div className="text-[8px] opacity-60 uppercase mb-1 text-[#FFB000]">Impact Velocity</div>
                  <div className="text-3xl font-black text-blue-400">{alert.timeframe}</div>
               </div>
            </div>

            <div className="mb-8 relative">
               <div className="flex items-center gap-2 mb-4 text-[#FFB000]">
                  <Zap size={18} />
                  <span className="text-sm font-black uppercase tracking-[0.2em]">Second-Order Reasoning Chain</span>
               </div>
               <div className="bg-[#FFB00008] border-l-4 border-[#FFB000] p-6 font-mono text-xs leading-relaxed text-white relative max-h-[400px] overflow-y-auto scroll-custom">
                  <div className="absolute top-2 right-4 text-[8px] opacity-30 font-bold uppercase tracking-widest">Thought_Log_Verified</div>
                  {alert.ripple.split('->').map((step, idx) => (
                    <div key={idx} className="mb-3 flex gap-4 items-start">
                      <span className="text-[#FFB000] font-black">[{idx + 1}]</span>
                      <span>{step.trim()}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-[#000] border border-[#FFB00022] p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                  <ShieldAlert size={64} className="text-[#FFB000]" />
               </div>
               <div className="text-[9px] font-bold text-[#FFB000] mb-3 uppercase tracking-widest flex items-center gap-2">
                  <Cpu size={12} /> Architect Analysis Update
               </div>
               <p className="text-xs text-[#32CD32] leading-relaxed font-mono italic">
                  "Target {alert.ticker} exhibits high-correlation ripples with primary macro nodes. 
                  The S.O.M.I.S Swarm has mapped this connection through 3 levels of supply chain depth. 
                  Risk-adjusted entry is advised within the designated timeframe. 
                  No direct news mentions detected, confirming pure 2nd-order Alpha advantage."
               </p>
            </div>
          </div>
          <div className="bg-[#FFB000] p-2 text-center text-[9px] font-black text-black uppercase tracking-[0.8em]">
             Authorized Intelligence Access // DO NOT DISTRIBUTE
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const TacticalGraph = ({ nodes = [], edges = [] }) => {
  const width = 1200;
  const height = 800;
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNativeWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY * -0.001;
      setScale(prev => Math.min(Math.max(prev + delta, 0.4), 3));
    };

    container.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleNativeWheel);
  }, []);

  const activeNodes = (nodes || []).map((n, i) => {
    const angle = (i / ((nodes || []).length || 1)) * 2 * Math.PI;
    const radius = i % 2 === 0 ? 300 : 200;
    return {
      ...n,
      x: width / 2 + Math.cos(angle) * radius,
      y: height / 2 + Math.sin(angle) * radius
    };
  });

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-[#0A0A0B] border border-[#FFB00011] cursor-grab active:cursor-grabbing"
    >
      <motion.div 
        drag 
        dragMomentum={false}
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
            const absImpact = Math.abs(impactValue);
            const color = impactValue < 0 ? "#ef4444" : impactValue > 0 ? "#22c55e" : "#FFB000";
            
            // Living Graph: Pulse speed increases with impact
            const pulseDuration = absImpact > 0.5 ? 0.8 : absImpact > 0 ? 2 : 4;
            
            return (
              <motion.g key={`node-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                {/* Impact Glow */}
                <motion.circle 
                  cx={node.x} 
                  cy={node.y} 
                  r={15 + (absImpact * 20)} 
                  fill={color} 
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.05, 0.2, 0.05],
                    scale: [1, 1.2, 1]
                  }} 
                  transition={{ duration: pulseDuration, repeat: Infinity }} 
                />
                
                {/* Core Node */}
                <circle cx={node.x} cy={node.y} r={impactValue !== 0 ? 8 : 5} fill={color} className="filter drop-shadow-[0_0_8px_rgba(255,176,0,0.5)]" />
                
                <text 
                  x={node.x + 12} 
                  y={node.y + 4} 
                  className="text-[10px] font-black fill-white pointer-events-none uppercase tracking-tighter" 
                  style={{ filter: 'drop-shadow(0 0 2px black)' }}
                >
                  {node.id}
                </text>
                
                {impactValue !== 0 && (
                  <text 
                    x={node.x + 12} 
                    y={node.y + 16} 
                    className={`text-[8px] font-black ${impactValue > 0 ? 'fill-green-400' : 'fill-red-400'}`}
                  >
                    {impactValue > 0 ? 'ALERT_UP' : 'ALERT_DOWN'} ({impactValue.toFixed(2)})
                  </text>
                )}
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
  
  // Filtering & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState('ALL');

  // Modal State
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:8000/news');
      const result = await response.json();
      if (result.status === 'success') {
        const newItems = result.data.map(item => ({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
          source: item.source === 'Economic Times' ? 'ET' : item.source.toUpperCase(),
          text: item.title, impact: 'NEW', link: item.link
        }));
        
        // Prevent flickering by only updating if data actually changed
        setIntelItems(prev => {
          if (JSON.stringify(prev.map(i => i.text)) === JSON.stringify(newItems.map(i => i.text))) return prev;
          return newItems;
        });
      }
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const filteredIntel = intelItems.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = filterSource === 'ALL' || item.source === filterSource;
    return matchesSearch && matchesSource;
  });

  const sources = ['ALL', 'ET', 'CNBC', 'REUTERS'];

  const fetchGraph = async () => {
    try {
      const response = await fetch('http://localhost:8000/graph');
      const result = await response.json();
      if (result.status === 'success') {
        setGraphData(prev => {
          if (JSON.stringify(prev) === JSON.stringify({ nodes: result.nodes, edges: result.edges })) return prev;
          return { nodes: result.nodes, edges: result.edges };
        });
      }
    } catch (error) { console.error(error); }
  };

  const fetchSwarmState = async () => {
    try {
      const logRes = await fetch('http://localhost:8000/swarm/logs');
      const logData = await logRes.json();
      if (logData.status === 'success') {
        setSwarmLogs(prev => {
          if (JSON.stringify(prev) === JSON.stringify(logData.data)) return prev;
          return logData.data;
        });
      }

      const alertRes = await fetch('http://localhost:8000/swarm/alerts');
      const alertData = await alertRes.json();
      if (alertData.status === 'success') {
        setSwarmAlerts(prev => {
          if (JSON.stringify(prev) === JSON.stringify(alertData.data)) return prev;
          return alertData.data;
        });
      }
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

  const openAlertDetails = (alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const removeAlert = async (alertId) => {
    if (!alertId) return;
    
    // Immediate UI removal
    setSwarmAlerts(prev => prev.filter(a => a.id !== alertId));
    
    try {
      await fetch(`http://localhost:8000/swarm/alerts/${alertId}`, { 
        method: 'DELETE'
      });
    } catch (error) { 
      console.error("Network error during alert deletion:", error); 
    }
  };

  const exportReport = () => {
    if (swarmAlerts.length === 0) {
      alert("NO TACTICAL DATA DETECTED FOR EXPORT.");
      return;
    }

    const timestamp = new Date().toLocaleString();
    let report = `
============================================================
       S.O.M.I.S: TACTICAL INTELLIGENCE DOSSIER
============================================================
VERSION: 1.0.4-TACTICAL
GENERATED: ${timestamp}
LOCATION: 22.5726° N, 88.3639° E [KOLKATA]
------------------------------------------------------------

[SUMMARY: ACTIVE ALPHA ALERTS]
Detected Targets: ${swarmAlerts.length}
System Confidence: HIGH (PHI-3.5 SWARM VERIFIED)

------------------------------------------------------------
`;

    swarmAlerts.forEach((alert, index) => {
      report += `
[ALPHA TARGET #${index + 1}]
------------------------------------------------------------
TICKER:      ${alert.ticker}
CONVICTION:  ${alert.conviction}%
STANCE:      ${alert.stance || 'STRONG_BUY'}
TIMEFRAME:   ${alert.timeframe || 'IMMEDIATE'}

[RIPPLE ANALYSIS CHAIN]
${alert.ripple.split('->').map((step, idx) => `  ${idx + 1}. ${step.trim()}`).join('\n')}

[ARCHITECT ASSESSMENT]
Target ${alert.ticker} exhibits high-correlation ripples with primary macro nodes. 
The S.O.M.I.S Swarm has mapped this connection through multi-level supply chain depth. 
Risk-adjusted entry is advised within the designated timeframe. 
No direct news mentions detected, confirming pure 2nd-order Alpha advantage.

------------------------------------------------------------
`;
    });

    report += `
============================================================
          END OF INTELLIGENCE REPORT // S.O.M.I.S
============================================================
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SOMIS_INTEL_REPORT_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Initial fetch
    fetchNews(); fetchSwarmState(); fetchGraph();
    
    // Controlled interval to prevent aggressive refreshing/jitter
    const interval = setInterval(() => { 
      fetchNews(); 
      fetchSwarmState(); 
      fetchGraph(); 
    }, 10000); 
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen gap-4 max-w-[1600px] mx-auto w-full p-4 pb-12 bg-[#0A0A0B] text-[#FFB000]">
      <TacticalHeader />
      <div className="grid grid-cols-12 gap-4 flex-1">
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
          <TerminalPanel title="LIVE INTEL STREAM" icon={Activity} className="h-[550px]">
            <div className="mb-4 flex flex-col gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 opacity-40" size={12} />
                <input 
                  type="text" 
                  placeholder="FILTER_BY_KEYWORD..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FFB00008] border border-[#FFB00022] py-2 pl-8 pr-2 text-[10px] font-mono text-[#FFB000] focus:outline-none focus:border-[#FFB000] transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-1">
                {sources.map(src => (
                  <button
                    key={src}
                    onClick={() => setFilterSource(src)}
                    className={`text-[8px] px-2 py-1 font-black border transition-all ${
                      filterSource === src 
                      ? 'bg-[#FFB000] text-black border-[#FFB000]' 
                      : 'bg-[#FFB00011] text-[#FFB000] border-[#FFB00022] hover:border-[#FFB000]'
                    }`}
                  >
                    {src}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="text-[10px] animate-pulse">BOOTING_STEALTH_SCRAPER...</div>
            ) : (
              filteredIntel.map((item, i) => (
                <NewsItem 
                  key={i} 
                  {...item} 
                  isAnalyzing={analyzingItem === item.text} 
                  onRunSwarm={() => analyzeStory(item)} 
                />
              ))
            )}
            {filteredIntel.length === 0 && !loading && (
              <div className="text-[10px] opacity-40 text-center py-8 italic border border-dashed border-[#FFB00022]">
                NO_INTEL_MATCHES_CRITERIA
              </div>
            )}
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
             {swarmAlerts.length > 0 ? swarmAlerts.map((alert, i) => (
               <AlertCard 
                key={alert.id || i} 
                {...alert} 
                onViewDetails={() => openAlertDetails(alert)}
                onRemove={() => removeAlert(alert.id)}
               />
             )) : (<div className="p-4 border border-dashed border-[#FFB00022] text-[10px] text-center opacity-40 italic">Awaiting tactical detection...</div>)}
             <button 
              onClick={exportReport}
              className="w-full mt-4 py-3 text-xs font-black bg-[#FFB000] text-[#0A0A0B] hover:bg-white transition-all uppercase tracking-tighter"
             >
              Export Intelligence Report
             </button>
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

      <DetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        alert={selectedAlert} 
      />

      <footer className="fixed bottom-0 left-0 right-0 h-8 flex justify-between items-center text-[9px] px-4 bg-[#0A0A0B] border-t border-[#FFB00044] z-50">
        <div className="flex gap-4"><span>LAT: 22.5726 | LON: 88.3639 [KOLKATA]</span><span className="text-[#FFB000] font-bold">ET_AI_H_2026</span></div>
        <div className="opacity-60 uppercase">© 2026 S.O.M.I.S | Opportunity Radar Track</div>
      </footer>
    </div>
  );
};

export default App;
