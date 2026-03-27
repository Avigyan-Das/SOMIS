from agents.swarm import SomisSwarm
from database.graph import market_graph

def test_swarm_logic():
    print("Testing Swarm Logic with local graph...")
    swarm = SomisSwarm()
    
    # Test case: Lithium mine issue
    news = "Massive flooding at Albemarle lithium facility in Australia. Production halted."
    print(f"Processing News: {news}")
    
    # We can't actually run the LLM here since it requires a local server,
    # but we can verify the agent setup.
    print(f"Harvester Agent Tools: {[t.name for t in swarm.harvester.tools]}")
    print(f"Architect Agent Tools: {[t.name for t in swarm.architect.tools]}")
    print(f"Ripple Agent Tools: {[t.name for t in swarm.ripple_agent.tools]}")

    # Check if Albemarle is in the graph
    if "Albemarle" in market_graph.G:
        print("Albemarle is correctly in the graph.")
        successors = market_graph.get_successors("Albemarle")
        print(f"Directly impacted from Albemarle: {successors}")
    else:
        print("ERROR: Albemarle NOT in graph.")

if __name__ == "__main__":
    test_swarm_logic()
