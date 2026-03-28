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

## 🚀 Quick Start & Demo (For Judges)

### 1. Zero-Setup Cloud Demo (Recommended)
The fastest way to experience the **S.O.M.I.S** swarm is via Google Colab. This automatically sets up the local LLM environment on Google's hardware.
- Open **[SOMIS_JUDGE_LAUNCHER.ipynb](./SOMIS_JUDGE_LAUNCHER.ipynb)** in this repository.
- Click the **"Open in Colab"** badge at the top.
- Select `Runtime` -> `Run all`.

---

### 2. Manual Local Setup
If you prefer to run the system on your own hardware (Requires 16GB RAM + GPU recommended):

#### **A. Launch "The Brain" (KoboldCpp)**
1. Download `koboldcpp.exe` and the **Phi-3.5-Mini-Instruct** GGUF model.
2. Launch the model on **Port 5001** with the `--api` flag enabled.
3. Ensure the model is fully loaded before starting the backend.

#### **B. Start Backend (Command Center)**
```bash
python server.py
```

#### **C. Start Frontend (Tactical Terminal)**
```bash
cd frontend
npm install
npm run dev
```
*The dashboard will be available at http://localhost:5173.*

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
