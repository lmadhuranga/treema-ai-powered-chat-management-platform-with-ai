async function analyzeMessage(payload) {
  try {
    const baseUrl = process.env.AI_END_URI;
    if (!baseUrl) return null;

    const response = await fetch(`${baseUrl}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.AI_API_KEY || ""
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(`Analyze request failed: ${response.status} ${body}`);
    }

    return await response.json();
  } catch (error) {
    console.warn("Analyze service error:", error.message);
    return null;
  }
}

module.exports = { analyzeMessage };
