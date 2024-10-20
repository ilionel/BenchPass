import React, { useEffect, useState } from "react";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnFrPackage from "@zxcvbn-ts/language-fr";

import { Indicators } from "./components/Indicators";
import { Suggestions } from "./components/Suggestions";

import "./App.css";

const options = {
  translations: zxcvbnFrPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnFrPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options)

interface Indicator {
  score: number;
  feedback: any;
}

const App = () => {
  const [password, setPassword] = useState("");
  const [indicator, setIndicator] = useState<Indicator | null>();

  useEffect(() => {
    if ((password === null) || (password === "")) return;

    setIndicator(zxcvbn(password));
  }, [password]);

  const score = indicator ? indicator.score : -1;
  const feedback = indicator ? indicator.feedback : undefined;

  console.log("feedback", feedback);

  return (
    <div className="d-block mx-4">
      <div className="position-relative mt-3">
        <label htmlFor="password-input" className="mr-2">
          Mot de passe
        </label>
        <input
          is="password-input"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          placeholder={""}
        />
        {password !== "" && <Indicators score={score} />}
        {feedback && feedback.warning && feedback.warning.length > 0 && (
          <Suggestions suggestions={feedback.suggestions} />
        )}
      </div>
    </div>
  );
};

export default App;