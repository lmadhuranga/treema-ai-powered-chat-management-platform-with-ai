from app.agents.graph import app_graph


def main():
    print("--- Customer Support AI Capabilities Demo ---")

    # Define a list of scenarios to test the graph logic across different edge cases
    test_scenarios = [
        {
            "name": "Scenario 1: HIGH PRIORITY - Urgent Refund/Delivery Issue (Negative Sentiment)",
            "message": "I've been waiting 10 days. This is absolutely unacceptable and terrible service! I want an immediate refund now.",
            "waiting_hours": 240,
        },
        # {
        #     "name": "Scenario 2: General Delivery Question (Neutral Sentiment)",
        #     "message": "Hi, I was just wondering what the standard timeframe is for delivery delays? Mine is a bit late.",
        #     "waiting_hours": 2,
        # },
        # {
        #     "name": "Scenario 3: Positive Feedback (Positive Sentiment)",
        #     "message": "The support team was amazing! Thank you for the quick response and helping me with my issue.",
        #     "waiting_hours": 0,
        # },
        # {
        #     "name": "Scenario 4: Feedback with Slight Frustration (Medium Priority)",
        #     "message": "The product is great but the shipping updates are a bit confusing. Hope you can improve this.",
        #     "waiting_hours": 26,
        # },
        # {
        #     "name": "Scenario 5: Urgent Delivery Resolution (Direct Intent)",
        #     "message": "My delivery status hasn't moved in 3 days. Can you check if there is a delay?",
        #     "waiting_hours": 72,
        # },
    ]

    for scenario in test_scenarios:
        print(f"\n{'='*60}")
        print(f"RUNNING: {scenario['name']}")
        print(f"{'='*60}")

        # Invoke the compiled LangGraph with the test data
        # This will trigger the linear flow: Intent -> Priority -> RAG -> Reply
        result = app_graph.invoke(
            {"message": scenario["message"], "waiting_hours": scenario["waiting_hours"]}
        )

        # Output the results of the state transformation
        print(f"MESSAGE: {result['message']}")
        print(f"INTENT: {result['intent']}")
        print(f"SENTIMENT: {result['sentiment']} ({result['sentiment_score']:.2f})")
        print(
            f"PRIORITY: {result['priority_level']} (Score: {result['priority_score']})"
        )
        print(f"RETRIEVED KNOWLEDGE: {result['retrieved_docs']}")
        print(f"\n--- SUGGESTED REPLIES ---")
        print(result["suggested_replies"])
        print("\n")


if __name__ == "__main__":
    main()
