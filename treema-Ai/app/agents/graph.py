from langgraph.graph import StateGraph, END
from app.agents.state import InboxState
from app.agents.nodes import (
    intent_sentiment_node,
    priority_node,
    rag_node,
    suggested_reply_node,
)


def create_graph():
    # 1. Initialize the StateGraph with our custom State definition
    graph = StateGraph(InboxState)

    # 2. Register all processing nodes (functions) into the graph
    graph.add_node("intent_sentiment", intent_sentiment_node)  # Analyzes text
    graph.add_node("priority", priority_node)  # Calculates priority score
    graph.add_node("rag", rag_node)  # Retrieves relevant docs
    graph.add_node("suggested_reply", suggested_reply_node)  # Generates AI response

    # 3. Define the entry point (where the process starts)
    graph.set_entry_point("intent_sentiment")

    # 4. Define the linear execution path (Edges)
    graph.add_edge("intent_sentiment", "priority")
    graph.add_edge("priority", "rag")
    graph.add_edge("rag", "suggested_reply")

    # 5. Define the exit point
    graph.add_edge("suggested_reply", END)

    # 6. Compile the graph into an executable application
    return graph.compile()


app_graph = create_graph()
