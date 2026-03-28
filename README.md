# 📉 S.O.M.I.S: Second-Order Market Impact Swarm
### "finSense: Alpha-Graph" - AI for the Indian Investor

**ET AI HACKATHON 2026 SUBMISSION**  
**Problem Statement #6:** AI for the Indian Investor (Opportunity Radar)

---

## 🎯 Project Overview
S.O.M.I.S is a multi-agent autonomous system designed to identify non-obvious trading opportunities for Indian investors. Unlike standard summarizers, S.O.M.I.S is a **Signal-Finder**. By tracing "Ripple Effects" through a deep supply chain knowledge graph, the system connects global macro-economic shifts to specific NSE/BSE tickers before the information is priced in.

### **Key Innovation: Forward-Link Reasoning**
The system doesn't just ask "What happened?"; it asks "Who is connected to this event that the market hasn't noticed yet?"

---

## 🛠 Technical Stack
- **Orchestration:** CrewAI (Specialized Agent Swarm)
- **The Brain:** Phi-3.5-Mini (3.8B) locally via **KoboldCpp** (Privacy-First)
- **Cloud Fallback:** Groq/Llama-3.3 (High-speed resilient evaluation)
- **Ingestion:** **Scrapling** (Stealth-mode scraper for ET, CNBC, Reuters)
- **Knowledge Layer:** NetworkX (Directed Dependency Graph)
- **UI/UX:** React + Vite + Framer Motion (Tactical Command Terminal)

---

## 🚀 Setup & Installation Guide

### **Option 1: Resilient Cloud Mode (Recommended for Judges)**
The system is configured with a seamless fallback to Groq Cloud if the local model is offline.
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Avigyan-Das/SOMIS.git
   cd somis
   ```
2. **Configure environment:**
   Create a `.env` file in the root `somis/` directory and add your key:
   ```env
   GROQ_API_KEY=your_key_here
   ```
3. **Run the Backend:**
   ```bash
   pip install -r requirements.txt
   python server.py
   ```
4. **Run the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
*The dashboard will auto-detect the Groq key and switch to high-speed cloud reasoning.*

### **Option 2: Local-First Setup (Production Mode)**
1. Launch **KoboldCpp** on **Port 5001** with the **Phi-3.5-Mini** GGUF model and `--api` flag.
2. Follow the "Run Backend/Frontend" steps above. The system will prioritize the local brain for 100% data privacy.

---

## 🤖 The Swarm: Agentic Roles
1. **Harvester Agent:** Extracts entities, tickers, and market impact scores from the live news stream.
2. **Graph Architect:** Maps news onto the NetworkX supply chain graph to identify 1st-order connections.
3. **Ripple Analyst:** Traces downstream dependencies to identify the "hidden" 2nd-order Alpha targets.

---

## 📄 Official Submission Documents
As required by the ET AI Hackathon guidelines:
- **[Architecture Document](./SUBMISSION/ARCHITECTURE.md):** Deep-dive into agent roles, tool integrations, and error-handling.
- **[Impact Model](./SUBMISSION/IMPACT_MODEL.md):** Quantified math on time-savings (97% reduction) and Alpha capture potential.

---

## 📈 Build Process & Commit History
The repository history reflects a disciplined **Research -> Strategy -> Execution** cycle:
- **Phase 1:** Real-world data ingestion via Scrapling.
- **Phase 2:** Multi-agent swarm implementation via CrewAI.
- **Phase 3:** Knowledge Graph integration (NetworkX).
- **Phase 4:** Resiliency polish (Cloud fallback, UI jitter elimination, permanent dismissal).

---
*Developed for the ET AI Hackathon 2026. Empowering the Indian Investor with Institutional-grade Intelligence.*
