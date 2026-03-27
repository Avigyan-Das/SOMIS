# S.O.M.I.S Architecture: AI for the Indian Investor (Opportunity Radar)

## 1. Executive Summary
**S.O.M.I.S (Second-Order Market Impact Swarm)** is a multi-agent system designed to identify non-obvious trading opportunities for the Indian retail investor. By mapping global macro events and corporate news through a deep supply chain knowledge graph, the system surfaces "2nd-Order Alpha" that traditional news summarizers miss.

## 2. Agent Roles & Coordination (CrewAI Framework)
The system employs a 3-tier "Ripple Reasoning" swarm:
1.  **The Harvester (Senior Data Specialist):** Scrapes real-time headlines (CNBC/Reuters) using the **Scrapling Stealth Engine**. It extracts structured entities, tickers, and assigns an initial impact score.
2.  **The Architect (Knowledge Graph Specialist):** Uses **NetworkX** to update the internal supply chain graph. It identifies 1st-order downstream impacts (e.g., if Lithium is mentioned, it identifies Battery makers).
3.  **The Ripple Agent (Alpha Generator):** Traces 2nd-order connections (e.g., if Lithium is scarce, it identifies Tire manufacturers or Auto competitors). It generates a "Reasoning Chain" and ticker recommendation.

## 3. Tool Integrations & Knowledge Graph
*   **Scrapling:** A high-performance, stealth-mode scraping engine for fetching real-time intel without being blocked.
*   **NetworkX:** An in-memory directed graph mapping the **Indian EV and Agri-FMCG supply chains** (e.g., Tata Motors, Reliance, HUL).
*   **KoboldCpp (Local LLM):** Powers the entire reasoning process via **Phi-3.5 Mini**. This ensures 100% data privacy and zero API costs for the end-user.

## 4. Error Handling & Reliability
*   **Heuristic Fallback Engine:** If the Local LLM experiences high latency or connection issues, the system automatically triggers a keyword-based "Heuristic Ripple" to provide instant, rule-based feedback.
*   **Self-Correction:** The Harvester agent is instructed to fetch the full article content if a headline is too ambiguous for entity extraction.

## 5. Deployment Model
*   **Frontend:** React/Vite "Industrial Tactical Terminal" for high-density data visualization.
*   **Backend:** FastAPI bridge connecting the Python Swarm to the UI.
*   **Local-First:** Optimized for consumer hardware (RTX 3060+) using quantized GGUF models.

---
*Created for ET AI Hackathon 2026 | Submission #6: AI for the Indian Investor*
