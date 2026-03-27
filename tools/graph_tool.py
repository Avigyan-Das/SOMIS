from crewai.tools import tool
from database.graph import market_graph

class GraphTools:
    @tool("update_graph_node")
    def update_graph_node(entity: str, event_type: str, impact_score: float) -> str:
        """
        Updates a node in the knowledge graph with new event data.
        :param entity: The name of the entity (e.g., 'Lithium', 'Tesla', 'CATL').
        :param event_type: Description of the event (e.g., 'Mine Flooding', 'Supply Deal').
        :param impact_score: A float between -1.0 (negative) and 1.0 (positive).
        :return: Success or failure message.
        """
        success = market_graph.add_event(entity, event_type, impact_score)
        if success:
            return f"Successfully updated node '{entity}' with event '{event_type}' and impact {impact_score}."
        else:
            return f"Entity '{entity}' not found in the graph. Update failed."

    @tool("get_downstream_impact")
    def get_downstream_impact(entity: str) -> str:
        """
        Finds all companies or commodities that are downstream from the affected entity.
        :param entity: The name of the entity to trace from.
        :return: A list of downstream entities.
        """
        successors = market_graph.get_successors(entity)
        if successors:
            return f"Entities downstream from '{entity}': {', '.join(successors)}."
        else:
            return f"No downstream entities found for '{entity}'."

    @tool("get_second_order_impact")
    def get_second_order_impact(entity: str) -> str:
        """
        Specifically traces two hops away to find non-obvious ripple effects.
        :param entity: The name of the starting entity.
        :return: A description of second-order impacts.
        """
        first_order = market_graph.get_successors(entity)
        second_order = []
        for node in first_order:
            second_order.extend(market_graph.get_successors(node))
        
        # Remove duplicates and the original entity if it somehow circles back
        second_order = list(set(second_order) - {entity})
        
        if second_order:
            return f"Second-order impacts from '{entity}': {', '.join(second_order)}."
        else:
            return f"No second-order impacts found for '{entity}'."
