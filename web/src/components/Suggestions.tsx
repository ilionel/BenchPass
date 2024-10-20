import React from "react";

const Warning = ({ warning }: { warning: string }) => (
  <ul>
    <li key={warning}>{warning}</li>
  </ul>
);

const Suggestions = ({ suggestions }: { suggestions: string[] }) => (
  <ul>
    {suggestions.map((suggestion, index) => (
      <li key={suggestion}>{suggestion}</li>
    ))}
  </ul>
);

export { Warning };
export { Suggestions };