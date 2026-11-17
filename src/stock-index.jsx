
import React from "react";
import { Composition, registerRoot } from "remotion";

import { DigitalCalm } from "./projects/DigitalCalm";
import { FutureFlux } from "./projects/FutureFlux";

const StockRoot = () => {
  return (
    <>
      {/* STOCK-001: Digital Calm */}
      <Composition
        id="Stock001"
        component={DigitalCalm}
        width={3840}
        height={2160}
        fps={30}
        durationInFrames={600}
      />

      {/* STOCK-002: Future Flux */}
      <Composition
        id="STOCK-002"
        component={FutureFlux}
        durationInFrames={600}
        fps={30}
        width={3840}
        height={2160}
      />
    </>
  );
};

registerRoot(StockRoot);
