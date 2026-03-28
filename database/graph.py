import networkx as nx
import matplotlib.pyplot as plt
import os

class AlphaGraph:
    def __init__(self):
        self.G = nx.DiGraph()
        self._initialize_base_supply_chain()

    def _initialize_base_supply_chain(self):
        # ... (keep existing base nodes and relationships)
        # Adding a few initial nodes
        self.add_node("Lithium", "Commodity")
        self.add_node("Tata Motors", "Company", ticker="TATAMOTORS")
        self.add_node("Reliance Industries", "Company", ticker="RELIANCE")
        self.add_node("Crude Oil", "Commodity")
        self.add_edge("Crude Oil", "Reliance Industries", "REFINED_BY")
        self.add_edge("Lithium", "Tata Motors", "BATTERY_INPUT")

    def add_node(self, name, ntype, ticker=None, sector=None):
        """Dynamically add or update a node."""
        if name not in self.G:
            self.G.add_node(name, type=ntype, impact=0.0, ticker=ticker, sector=sector, created_at=os.times()[4])
            return f"Node '{name}' created."
        return f"Node '{name}' already exists."

    def add_edge(self, source, target, relationship):
        """Dynamically create a supply chain link."""
        if source not in self.G: self.add_node(source, "Entity")
        if target not in self.G: self.add_node(target, "Entity")
        self.G.add_edge(source, target, relationship=relationship)
        return f"Link created: {source} -> {target} ({relationship})"

    def decay_impacts(self):
        """Simulate the fading of news impact over time (The 'Life' Factor)."""
        for n in self.G.nodes():
            current_impact = self.G.nodes[n].get('impact', 0.0)
            if abs(current_impact) > 0.01:
                # Decay by 5% each cycle
                self.G.nodes[n]['impact'] = current_impact * 0.95
            else:
                self.G.nodes[n]['impact'] = 0.0

    def add_event(self, entity, event_type, impact_score):
        """Update node with new event data and inject 'energy'."""
        if entity not in self.G:
            # Autonomous Discovery!
            self.add_node(entity, "Company")
        
        self.G.nodes[entity]['impact'] = impact_score
        self.G.nodes[entity]['last_event'] = event_type
        return True

    def get_successors(self, node):
        """Get all entities impacted downstream."""
        if node in self.G:
            return list(self.G.successors(node))
        return []

    def save_graph_image(self, path="graph.png"):
        """Utility for hackathon demo to visualize the graph."""
        plt.figure(figsize=(12, 8))
        pos = nx.spring_layout(self.G)
        nx.draw(self.G, pos, with_labels=True, node_color='lightblue', 
                node_size=2000, font_size=10, font_weight='bold', arrows=True)
        plt.title("S.O.M.I.S Knowledge Graph - EV Supply Chain")
        plt.savefig(path)
        plt.close()

# Singleton instance for the demo
market_graph = AlphaGraph()
