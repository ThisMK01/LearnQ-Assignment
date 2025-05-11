import React from "react";
import Katex from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";

interface MathRendererProps {
  text: string;
}

function MathRenderer({ text }: MathRendererProps) {
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/);

  return (
    <span style={{ display: "inline" }}>
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          const latex = part.slice(2, -2).trim();
          return (
            <span key={index} style={{ display: "inline" }}>
              <Katex math={latex} block={false} />
            </span>
          );
        } else if (part.startsWith("$") && part.endsWith("$")) {
          const latex = part.slice(1, -1).trim();
          return (
            <span key={index} style={{ display: "inline" }}>
              <Katex math={latex} block={false} />
            </span>
          );
        } else {
          return <span key={index}>{part}</span>;
        }
      })}
    </span>
  );
}

export default MathRenderer;
