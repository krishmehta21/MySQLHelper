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
  className,
}) => {
  // Simple SQL syntax highlighting
  const highlightSql = (sql: string) => {
    if (!sql) return null;
    const keywords = [
      "SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
      "ORDER BY", "GROUP BY", "HAVING", "LIMIT", "OFFSET", "INSERT INTO", "VALUES",
      "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE",
      "AND", "OR", "NOT", "NULL", "IS", "IN", "BETWEEN", "LIKE", "AS", "ON", "DESC", "ASC"
    ];
    // Sort keywords by length to match longer phrases first
    keywords.sort((a, b) => b.length - a.length);
    // Build regex for all keywords
    const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");

    // Replace keywords with spans
    let parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    sql.replace(keywordRegex, (match, _p1, offset) => {
      if (lastIndex < offset) {
        parts.push(sql.slice(lastIndex, offset));
      }
      parts.push(
        <span key={offset} className="text-blue-400 font-medium">{match}</span>
      );
      lastIndex = offset + match.length;
      return match;
    });
    if (lastIndex < sql.length) {
      parts.push(sql.slice(lastIndex));
    }

    // Highlight numbers and strings inside the result
    parts = parts.flatMap((part, idx) => {
      if (typeof part !== "string") return part;
      const regex = /('[^']*'|"[^"]*"|\d+|\(|\))/g;
      const subparts: (string | JSX.Element)[] = [];
      let last = 0;
      let m;
      while ((m = regex.exec(part)) !== null) {
        if (last < m.index) subparts.push(part.slice(last, m.index));
        if (/^\d+$/.test(m[0])) {
          subparts.push(<span key={idx + "-n-" + m.index} className="text-yellow-400">{m[0]}</span>);
        } else if (/^['"].*['"]$/.test(m[0])) {
          subparts.push(<span key={idx + "-s-" + m.index} className="text-green-400">{m[0]}</span>);
        } else if (/^[\(\)]$/.test(m[0])) {
          subparts.push(<span key={idx + "-p-" + m.index} className="text-purple-400">{m[0]}</span>);
        } else {
          subparts.push(m[0]);
        }
        last = m.index + m[0].length;
      }
      if (last < part.length) subparts.push(part.slice(last));
      return subparts;
    });

    return parts;
  };

  return (
    <div className={cn("relative rounded-md overflow-hidden", className)}>
      <pre className="p-4 bg-slate-900 border border-slate-700 rounded-md overflow-x-auto">
        <code className="text-slate-200 text-sm font-mono">
          {highlightSql(code)}
        </code>
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