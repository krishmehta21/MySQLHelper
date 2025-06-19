
import { translateToSQL } from './huggingFaceService';

export const translateNaturalLanguageToSql = async (question: string): Promise<string> => {
  try {
    console.log('Translating question:', question);
    const result = await translateToSQL(question);
    console.log('Translation result:', result);
    return result;
  } catch (error) {
    console.error("Error translating:", error);
    throw error;
  }
};
