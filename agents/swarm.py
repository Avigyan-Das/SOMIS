from crewai import Agent, Task, Crew, Process
from config import get_llm
from database.graph import market_graph
from tools.graph_tool import GraphTools
from tools.scraper_tool import ScraperTools
import json

# Initialize Local LLM
local_llm = get_llm()

class SomisSwarm:
    def __init__(self):
        # 1. The Harvester Agent (Data Extraction)
        self.harvester = Agent(
            role='Senior Financial Data Harvester',
            goal='Extract structured entities, tickers, and impact scores from news. Focus on Indian and Global markets.',
            backstory="""You are a specialist in corporate intelligence. You parse news into clean JSON-like entities. 
            You identify the primary company or commodity mentioned and assign a score (-1.0 to 1.0).""",
            verbose=True,
            allow_delegation=False,
            tools=[ScraperTools.fetch_article_content],
            llm=local_llm
        )

        # 2. The Knowledge Graph Architect (The Architect)
        self.architect = Agent(
            role='Knowledge Graph Architect',
            goal='Update the supply chain graph and identify immediate downstream victims or beneficiaries.',
            backstory="""You are a supply chain expert. You use tools to update node status and 
            report who is directly connected to the affected entity (1st-order impact).""",
            verbose=True,
            allow_delegation=False,
            tools=[GraphTools.update_graph_node, GraphTools.get_downstream_impact],
            llm=local_llm
        )

        # 3. The Ripple Agent (The Money Maker / Alpha Generator)
        self.ripple_agent = Agent(
            role='Second-Order Impact Analyst',
            goal='Identify non-obvious trade opportunities by tracing 2nd-order ripples.',
            backstory="""You are a master of indirect logic. If gas prices rise, you look at fertilizer makers' customers. 
            If Lithium mining halts, you look at the car makers' competitors or tire suppliers. 
            You always provide a 'Reasoning Chain' for your alpha alerts.""",
            verbose=True,
            allow_delegation=True,
            tools=[GraphTools.get_second_order_impact],
            llm=local_llm
        )

    def process_news(self, news_text):
        """Processes news items through the swarm."""
        
        # Task 1: Extraction
        extraction_task = Task(
            description=f"Extract key entities (companies, commodities) and events from this news: {news_text}. Determine an impact score from -1.0 to 1.0.",
            agent=self.harvester,
            expected_output="A structured report identifying the main affected entity and its impact score."
        )

        # Task 2: Graph Update & Impact Tracing
        update_task = Task(
            description="""Update the internal knowledge graph for the identified entity using the tools. 
            Then, identify all immediate downstream companies or sectors that will be 
            impacted by this change. Ensure the impact score is recorded correctly.""",
            agent=self.architect,
            expected_output="A summary of the graph update and a list of direct downstream impacts."
        )

        # Task 3: Ripple Analysis & Trade Alert
        ripple_task = Task(
            description="""Analyze the second-order impacts of this event. 
            Identify a company that is not directly mentioned but is linked via the 
            supply chain (e.g., if Lithium is affected, look at battery makers' customers). 
            Generate an 'Opportunity Radar Alert' with a clear reasoning chain and ticker if available.""",
            agent=self.ripple_agent,
            expected_output="A detailed Alpha Alert with a multi-step reasoning chain and a clear recommendation."
        )

        # Execute Swarm
        crew = Crew(
            agents=[self.harvester, self.architect, self.ripple_agent],
            tasks=[extraction_task, update_task, ripple_task],
            process=Process.sequential,
            verbose=True
        )

        return crew.kickoff()

# Dummy Data for Hackathon Demo
DUMMY_FEED = [
    {"news": "Major Lithium mine in Western Australia flooded, production halted for 3 months."},
    {"news": "Tata Motors secures exclusive battery supply deal with CATL for new Nano EV line."},
    {"news": "Neon Gas shortage in Ukraine disrupts semiconductor laser etching worldwide."}
]
