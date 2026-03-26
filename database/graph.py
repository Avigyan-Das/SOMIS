import networkx as nx
import matplotlib.pyplot as plt
import os

class AlphaGraph:
    def __init__(self):
        self.G = nx.DiGraph()
        self._initialize_base_supply_chain()

    def _initialize_base_supply_chain(self):
        """Pre-built static NetworkX base graph mapping a basic EV supply chain."""
        # Commodities
        self.G.add_node("Lithium", type="Commodity", impact=0.0)
        self.G.add_node("Cobalt", type="Commodity", impact=0.0)
        self.G.add_node("Nickel", type="Commodity", impact=0.0)
        self.G.add_node("Neon Gas", type="Commodity", impact=0.0)

        # Suppliers / Processors
        self.G.add_node("Albemarle", type="Company", sector="Mining")
        self.G.add_node("Ganfeng Lithium", type="Company", sector="Mining")
        self.G.add_node("TSMC", type="Company", sector="Semiconductors")

        # Battery Makers
        self.G.add_node("CATL", type="Company", sector="Batteries")
        self.G.add_node("Panasonic", type="Company", sector="Batteries")
        self.G.add_node("LG Energy", type="Company", sector="Batteries")

        # Auto Manufacturers
        self.G.add_node("Tesla", type="Company", ticker="TSLA", sector="Auto")
        self.G.add_node("Tata Motors", type="Company", ticker="TATAMOTORS", sector="Auto")
        self.G.add_node("NIO", type="Company", ticker="NIO", sector="Auto")

        # Define Relationships
        relationships = [
            ("Lithium", "Albemarle", "EXTRACTED_BY"),
            ("Lithium", "Ganfeng Lithium", "EXTRACTED_BY"),
            ("Albemarle", "CATL", "SUPPLIES_TO"),
            ("Ganfeng Lithium", "Tesla", "SUPPLIES_TO"),
            ("CATL", "Tesla", "SUPPLIES_TO"),
            ("CATL", "Tata Motors", "SUPPLIES_TO"),
            ("Panasonic", "Tesla", "SUPPLIES_TO"),
            ("LG Energy", "NIO", "SUPPLIES_TO"),
            ("Neon Gas", "TSMC", "REQUIRED_BY"),
            ("TSMC", "Tesla", "SUPPLIES_TO"),
            ("TSMC", "NIO", "SUPPLIES_TO")
        ]

        for u, v, rel in relationships:
            self.G.add_edge(u, v, relationship=rel)

    def add_event(self, entity, event_type, impact_score):
        """Update node with new event data."""
        if entity in self.G:
            self.G.nodes[entity]['impact'] = impact_score
            self.G.nodes[entity]['last_event'] = event_type
            return True
        return False

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
