
import React from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = "sql",
  className 
}) => {
  // Simple SQL syntax highlighting
  const highlightSql = (sql: string) => {
    // Replace SQL keywords with spans
    const keywords = [
      "SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
      "ORDER BY", "GROUP BY", "HAVING", "LIMIT", "OFFSET", "INSERT INTO", "VALUES",
      "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE",
      "AND", "OR", "NOT", "NULL", "IS", "IN", "BETWEEN", "LIKE", "AS", "ON", "DESC", "ASC"
    ];
    
    // Build a regex that matches whole words only
    const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
    
    // Apply highlighting
    return sql.replace(
      keywordRegex,
      match => `<span class="text-blue-400 font-medium">${match}</span>`
    )
    // Highlight strings
    .replace(/'([^']*)'/g, '<span class="text-green-400">\'$1\'</span>')
    .replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')
    // Highlight numbers
    .replace(/\b(\d+)\b/g, '<span class="text-yellow-400">$1</span>')
    // Highlight parentheses
    .replace(/(\(|\))/g, '<span class="text-purple-400">$1</span>');
  };

  return (
    <div className={cn("relative rounded-md overflow-hidden", className)}>
      <pre className="p-4 bg-slate-900 border border-slate-700 rounded-md overflow-x-auto">
        <code 
          className="text-slate-200 text-sm font-mono"
          dangerouslySetInnerHTML={{ __html: highlightSql(code) }}
        />
      </pre>
      <button 
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-white"
        title="Copy to clipboard"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  );
};
