import React from "react";

const Suggestions = ({ suggestions }: { suggestions: string[] }) => (
  <ul>
    {suggestions.map((suggestion, index) => (
      <li key={suggestion}>{suggestion}</li>
    ))}
  </ul>
);

export { Suggestions };
