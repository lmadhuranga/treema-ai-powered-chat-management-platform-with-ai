from typing import TypedDict, Optional, List


class InboxState(TypedDict):
    """
    The shared state object that passes data between nodes in the graph.
    """

    # Initial Input Fields
    message: str  # The customer's message text
    waiting_hours: int  # How long the customer has been waiting

    # Fields populated by Step 1 (Intent/Sentiment)
    intent: Optional[str]  # delivery_issue, refund_request, etc.
    sentiment: Optional[str]  # positive, negative, or neutral
    sentiment_score: Optional[float]

    # Fields populated by Step 2 (Priority)
    priority_score: Optional[int]
    priority_level: Optional[str]  # HIGH, MEDIUM, LOW

    # Fields populated by Step 3 (RAG)
    retrieved_docs: Optional[List[str]]  # Relevant documents from DB

    # Fields populated by Step 4 (Reply)
    suggested_replies: Optional[str]  # Final generated responses
