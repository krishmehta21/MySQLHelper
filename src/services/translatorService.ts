const API_URL = "http://localhost:5000";

export const translateNaturalLanguageToSql = async (question: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to translate");
    }

    return data.sql_query;
  } catch (error) {
    console.error("Error translating:", error);
    throw error;
  }
};