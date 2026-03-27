# 📉 S.O.M.I.S: Second-Order Market Impact Swarm
### "finSense: Alpha-Graph" - AI for the Indian Investor (Opportunity Radar)

**ET AI HACKATHON 2026 SUBMISSION**
*Targeting Problem Statement #6: AI for the Indian Investor*

## 🎯 The Mission
90% of Indian retail investors react to "1st-order news" and tips, often entering trades too late. **S.O.M.I.S** is a multi-agent "Signal Finder" that maps global macro events to non-obvious 2nd-order impacts in the Indian market (e.g., connecting "Middle East War" to "Indian Refiner Margins" or "Lithium Floods" to "Auto Competitors").

## 🚀 Key Features
*   **Live Stealth Ingestion:** Scrapes CNBC/Reuters in real-time using the **Scrapling Engine**.
*   **Reasoning Swarm:** 3-Agent Crew (Harvester, Architect, Ripple Agent) powered by **Phi-3.5 Mini**.
*   **Alpha-Graph:** A custom **NetworkX** knowledge graph mapping Indian supply chains (Tata Motors, Reliance, Vedanta, HUL, etc.).
*   **Tactical UI:** A React/Vite industrial terminal for real-time visualization of "Swarm Thought Logs" and "Ripple Paths."

## 🛠 Tech Stack
*   **Orchestration:** CrewAI
*   **LLM:** Phi-3.5 Mini (Local via KoboldCpp)
*   **Knowledge Graph:** NetworkX
*   **Scraping:** Scrapling (Stealth Mode)
*   **Frontend:** React, TailwindCSS, Vite
*   **Backend:** FastAPI

## 💻 Setup Instructions (Local-First Architecture)

### 1. Requirements
*   Python 3.11+
*   Node.js (for UI)
*   8GB+ VRAM GPU (Recommended for Phi-3.5)

### 2. Backend & Swarm Setup
```bash
# Clone and install dependencies
git clone https://github.com/your-repo/somis
cd somis
pip install -r requirements.txt

# Start the Tactical API
python server.py
```

### 3. LLM Setup (The "Brain")
1.  Download **KoboldCpp** and the **Phi-3.5-mini-instruct-GGUF** model.
2.  Launch the server:
    ```bash
    koboldcpp.exe --model phi-3.5-mini-instruct-Q4_K_M.gguf --port 5001
    ```

### 4. Frontend Launch
```bash
cd frontend
npm install
npm run dev
```

## 📈 Submission Documents
*   [Architecture Document](./SUBMISSION/ARCHITECTURE.md)
*   [Impact Model](./SUBMISSION/IMPACT_MODEL.md)

---
*Developed for the ET AI Hackathon 2026. Empowering the Indian Investor with Institutional-grade Intelligence.*
