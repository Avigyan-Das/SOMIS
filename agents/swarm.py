from crewai import Agent, Task, Crew, Process
from config import get_llm
from database.graph import market_graph
import json

# Initialize Local LLM
local_llm = get_llm()

class SomisSwarm:
    def __init__(self):
        # 1. The Harvester Agent (Data Extraction)
        self.harvester = Agent(
            role='Senior Financial Data Harvester',
            goal='Extract structured entities and events from raw financial news.',
            backstory="""You are a specialist in parsing complex corporate filings and news. 
            You identify which companies, commodities, or sectors are affected by an event 
            and determine the sentiment impact.""",
            verbose=True,
            allow_delegation=False,
            llm=local_llm
        )

        # 2. The Graph Builder Agent (The Architect)
        self.architect = Agent(
            role='Knowledge Graph Architect',
            goal='Update the NetworkX supply chain graph with new entity states.',
            backstory="""You understand supply chain hierarchies. When a news event affects 
            a 'Node', you update its status in the system and ensure the graph reflects 
            the current reality.""",
            verbose=True,
            allow_delegation=False,
            llm=local_llm
        )

        # 3. The Ripple Agent (The Money Maker / Alpha Generator)
        self.ripple_agent = Agent(
            role='Second-Order Impact Analyst',
            goal='Trace the impact of an event through the supply chain to find alpha.',
            backstory="""You are an expert at finding non-obvious market connections. 
            If a mining company is affected, you look at the battery makers they supply 
            and the auto companies those battery makers supply, generating trade alerts.""",
            verbose=True,
            allow_delegation=True,
            llm=local_llm
        )

    def process_news(self, news_json):
        """Processes news items through the swarm."""
        
        # Task 1: Extraction
        extraction_task = Task(
            description=f"Parse this news and return JSON with keys 'entity', 'event', 'impact_score' (-1 to 1): {news_json}",
            agent=self.harvester,
            expected_output="A JSON object containing the extracted entity, event type, and impact score."
        )

        # Task 2: Graph Update
        update_task = Task(
            description="""Update the internal NetworkX graph based on the extraction. 
            Specifically, identify if the entity exists in our EV supply chain 
            (Lithium, Cobalt, Nickel, Albemarle, CATL, Tesla, Tata Motors, etc.) 
            and apply the impact score.""",
            agent=self.architect,
            expected_output="Confirmation of the graph update."
        )

        # Task 3: Ripple Analysis
        ripple_task = Task(
            description="""Traverse the graph from the affected node. 
            Identify at least one second-order impact (a company two hops away). 
            Generate an 'Opportunity Radar Alert' with a clear reasoning chain.""",
            agent=self.ripple_agent,
            expected_output="An Opportunity Radar Alert with a step-by-step reasoning chain."
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
