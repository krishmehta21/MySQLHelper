
import { pipeline } from '@huggingface/transformers';

let textGenerator: any = null;

export const initializeModel = async () => {
  if (!textGenerator) {
    try {
      console.log('Loading Hugging Face model...');
      textGenerator = await pipeline(
        'text2text-generation',
        'Salesforce/codet5-small-nmt-py-en',
        { device: 'webgpu' }
      );
      console.log('Model loaded successfully!');
    } catch (error) {
      console.warn('WebGPU not available, falling back to CPU...');
      textGenerator = await pipeline(
        'text2text-generation',
        'Salesforce/codet5-small-nmt-py-en'
      );
      console.log('Model loaded on CPU!');
    }
  }
  return textGenerator;
};

export const translateToSQL = async (question: string): Promise<string> => {
  try {
    const generator = await initializeModel();
    
    const prompt = `Translate this natural language question to SQL: "${question}"`;
    
    const result = await generator(prompt, {
      max_new_tokens: 100,
      temperature: 0.3,
    });
    
    return result[0].generated_text || 'Unable to generate SQL query';
  } catch (error) {
    console.error('Error generating SQL:', error);
    throw new Error('Failed to generate SQL query');
  }
};
