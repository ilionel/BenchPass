import React from "react";

type ColorIndex = 0 | 1 | 2 | 3 | 4 | 5;

const colors: { [key in ColorIndex]: string } = {
  0: "#e5e5e5",
  1: "#9B2C2C",
  2: "#D44949",
  3: "#DCA02D",
  4: "#387F95",
  5: "#48AE65"
};

const getColor = (power: number, index: number) => {
  if (power > index && power in colors) {
    return colors[power as ColorIndex];
  }
  return colors[0];
};

const indicatorIndexes: ColorIndex[] = [0, 1, 2, 3, 4];

const Indicators = ({ score }: { score: number }) => (
  <div className="mt-2 indicator-container">
    {indicatorIndexes.map((indicatorIndex, index) => (
      <div
        className="indicator"
        key={indicatorIndex}
        style={{ backgroundColor: getColor(score + 1, indicatorIndex) }}
      />
    ))}
  </div>
);

export { Indicators };
