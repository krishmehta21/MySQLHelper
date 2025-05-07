
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to translate");
    }

    const data = await response.json();
    return data.sql_query;
  } catch (error) {
    console.error("Error translating:", error);
    throw error;
  }
};
