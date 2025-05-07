
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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="relative max-w-4xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>
        
        <header className="text-center mb-12 mt-16 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-purple-100 mb-6">
            Natural Language to SQL Translator
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Transform your questions into SQL queries. Simply type your question in plain English.
          </p>
        </header>

        <Card className="relative backdrop-blur-lg bg-black/50 border border-white/10 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none"></div>
          
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-indigo-400"></div>
              <div className="h-3 w-3 rounded-full bg-purple-400"></div>
              <div className="h-3 w-3 rounded-full bg-pink-400"></div>
            </div>
            <CardTitle className="text-xl text-white mt-3 flex items-center">
              <span className="mr-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
                Ask a question about your data
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="space-y-6">
              <div className="relative">
                <Input
                  placeholder="e.g., How many Students in School Table?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-white placeholder:text-slate-400 h-12 rounded-lg focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all shadow-lg"
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
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner className="mr-2" /> : null}
                  <span>{isLoading ? "Translating..." : "Translate"}</span>
                </Button>
              </div>

              {sqlQuery && !isLoading && (
                <div className="mt-8 animate-fade-in">
                  <div className="flex items-center mb-3">
                    <div className="h-1 w-1.5 bg-indigo-400 rounded-full mr-2"></div>
                    <div className="h-1 w-3 bg-purple-400 rounded-full mr-2"></div>
                    <h2 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
                      Generated SQL Query:
                    </h2>
                  </div>
                  <div className="animate-pulse-glow rounded-xl">
                    <CodeBlock code={sqlQuery} language="sql" className="shadow-xl" />
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="mb-4">
                    <LoadingSpinner size="lg" className="text-indigo-400" />
                  </div>
                  <p className="text-slate-400 text-sm animate-pulse">
                    Translating your query...
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-white/5 flex justify-center">
            <p className="text-sm text-slate-400 text-center flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"></span>
              Project made by: Vandita Maloo
            </p>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-6 text-slate-500 text-sm">
          Enter your query in natural language and watch the AI transform it into SQL
        </div>
      </div>
    </div>
  );
};

export default Index;
