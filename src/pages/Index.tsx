
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { translateNaturalLanguageToSql } from "@/services/translatorService";
import { CodeBlock } from "@/components/CodeBlock";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { toast } from "sonner";

const Index = () => {
  const [question, setQuestion] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!question.trim()) {
      toast.warning("Please enter a question to translate");
      return;
    }

    setIsLoading(true);
    try {
      const result = await translateNaturalLanguageToSql(question);
      setSqlQuery(result);
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Failed to translate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 mt-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Natural Language to SQL Translator
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Transform your questions into SQL queries using AI. Simply type your question in plain English.
          </p>
        </header>

        <Card className="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-white">Ask a question about your data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="e.g., Show me all users who signed up last month"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isLoading) {
                      handleTranslate();
                    }
                  }}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleTranslate}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner /> : "Translate"}
                </Button>
              </div>

              {sqlQuery && !isLoading && (
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-white mb-2">SQL Query:</h2>
                  <CodeBlock code={sqlQuery} language="sql" />
                </div>
              )}

              {isLoading && (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="lg" />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t border-slate-700 flex justify-center">
            <p className="text-sm text-slate-400 text-center">
              Powered by T5 NLP Model - mrm8488/t5-small-finetuned-wikiSQL
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
