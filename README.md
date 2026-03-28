# 📉 S.O.M.I.S: Second-Order Market Impact Swarm
### "finSense: Alpha-Graph" - AI for the Indian Investor (Opportunity Radar)

**ET AI HACKATHON 2026 SUBMISSION**
*Targeting Problem Statement #6: AI for the Indian Investor*

## 🎯 Project Overview
S.O.M.I.S is a multi-agent autonomous system designed to identify non-obvious trading opportunities for Indian investors. By tracing "Ripple Effects" through a deep knowledge graph, the system connects global macro-economic shifts to specific NSE/BSE tickers before the market fully prices in the information.

---

## 🛠 Tech Stack
- **Orchestration:** CrewAI
- **Brain:** Phi-3.5-Mini (3.8B) running locally via **KoboldCpp**
- **Data Ingestion:** **Scrapling** (Stealth Mode)
- **Knowledge Layer:** NetworkX (Directed Graph)
- **UI:** React + Vite (Industrial Tactical Terminal)

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- Python 3.13+
- Node.js & npm
- KoboldCpp (for local LLM inference)

### 2. Launching "The Brain" (KoboldCpp)
1. Run `koboldcpp.exe` with the **Phi-3.5-Mini-Instruct** GGUF model.
2. Ensure the **Port** is set to `5001`.
3. Check **"Use API"** and launch.

### 3. Automated System Launch
Simply run the root batch file:
```bash
./LAUNCH_SOMIS.bat
```
*This will automatically start the Backend, Frontend, and open your browser to the Tactical Terminal (http://localhost:5173).*

---

## 🤖 The Swarm: Agent Roles
1.  **Harvester:** Stealthily scraps ET, CNBC, and Reuters to find high-signal news.
2.  **Architect:** Maps news events onto the Supply Chain graph.
3.  **Ripple Analyst:** Traces 2nd-order connections to generate high-conviction Alpha alerts.

---

## 📄 Submission Documents
*   [Architecture Document](./SUBMISSION/ARCHITECTURE.md)
*   [Impact Model](./SUBMISSION/IMPACT_MODEL.md)

---
*Developed for the ET AI Hackathon 2026. Empowering the Indian Investor with Institutional-grade Intelligence.*
