import { useEffect, useState } from "react";
import { ZxcvbnFactory, type FeedbackType } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnFrPackage from "@zxcvbn-ts/language-fr";

import { Indicators } from "./components/Indicators";
import { Warning, Suggestions, Success } from "./components/Suggestions";
import { getAdjustedScore } from "./score";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// zxcvbn-ts v4 replaced the `zxcvbn`/`zxcvbnOptions` singletons with a factory
// instance you configure once at module load.
const zxcvbn = new ZxcvbnFactory({
  translations: zxcvbnFrPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  useLevenshteinDistance: true,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnFrPackage.dictionary,
  },
});

interface Indicator {
  score: number;
  feedback: FeedbackType;
}

const App = () => {
  document.title = "Password Benchmarker!";
  const [password, setPassword] = useState("");
  const [indicator, setIndicator] = useState<Indicator | null>();

  useEffect(() => {
    if (password === null || password === "") return;
    const result = zxcvbn.check(password);
    const adjustedScore = getAdjustedScore(password, result.score);

    setIndicator({
      score: adjustedScore,
      feedback: result.feedback,
    });
  }, [password]);

  const score = indicator ? indicator.score : -1;
  const feedback = indicator ? indicator.feedback : undefined;

  return (
    <div className="d-flex align-items-center light-blue-gradient">
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card rounded-0 shadow">
              <div className="card-body">
                <div className="d-block mx-6">
                  <div className="position-relative mt-3">
                    <h3>Evaluez la robustesse de votre mot de passe</h3>
                    <h5>Un mot de passe ne protège vraiment que s'il ne peut pas être deviné.</h5>
                    <label htmlFor="password-input" className="mr-2"></label>
                    <form>
                      <div className="form-group full-width-input">
                        <ul className="list-group">
                          <li className="list-group-item list-group-item-info">
                            <div>
                              En 2018, un mode de passe simple comme "Lionel123!" demandait 30
                              minutes pour être piraté.
                            </div>
                            <div>
                              <b>Aujourd'hui il ne faut plus que 2 secondes !</b>
                            </div>
                          </li>
                        </ul>
                        <label htmlFor="password-input" className="mr-2 mt-3">
                          Mot de passe
                        </label>
                        <input
                          className="form-control full-width-input"
                          id="password-input"
                          type="password"
                          onChange={(event) => setPassword(event.target.value)}
                          value={password}
                          placeholder={""}
                          size={65}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                            }
                          }}
                        />
                        <div></div>
                        {password !== "" && <Indicators score={score} />}
                        {feedback && feedback.warning && <Warning warning={feedback.warning} />}
                        {password !== "" &&
                          feedback &&
                          feedback.suggestions &&
                          feedback.suggestions.length > 0 && (
                            <Suggestions suggestions={feedback.suggestions} />
                          )}
                        {password !== "" && score === 4 && (
                          <Success success={"Félicitation ce mot de passe a l'air robuste!"} />
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
