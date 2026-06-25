import React from "react";

const Success = ({ success }: { success: string }) => (
  <ul className="list-group">
    <li className="list-group-item list-group-item-success" key={success}>
      🏅 - {success}
    </li>
  </ul>
);

const Warning = ({ warning }: { warning: string }) => (
  <ul className="list-group">
    <li className="list-group-item list-group-item-danger" key={warning}>
      🚫 - {warning}
    </li>
  </ul>
);

const Suggestions = ({ suggestions }: { suggestions: string[] }) => {
  const transformSuggestions = (suggestions: string[]): string[] => {
    return suggestions.map((suggestion) => {
      if (suggestion === "Ajoutez des mots moins courants.") {
        return "Ce mot de passe n'est pas suffisamment complexe.";
      }
      if (suggestion === "Capitalisez mais pas seulement la première lettre.") {
        return "Une majuscule c'est bien, mais pas seulement pour la première lettre.";
      }
      return suggestion;
    });
  };

  const transformedSuggestions = transformSuggestions(suggestions);

  return (
    <ul className="list-group">
      {transformedSuggestions.map((suggestion, index) => (
        <li className="list-group-item list-group-item-warning" key={index}>
          ツ - {suggestion}
        </li>
      ))}
    </ul>
  );
};

export { Warning };
export { Suggestions };
export { Success };
