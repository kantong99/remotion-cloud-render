
import React from "react";
import { Composition, registerRoot } from "remotion";
import { DigitalCalm } from "./projects/DigitalCalm";
import { FutureFlux } from "../FutureFlux";

const StockRoot = () => (
  <Composition
    id="Stock001"
    component={DigitalCalm}
    width={3840}
    height={2160}
    fps={30}
    durationInFrames={600}
  />
);

registerRoot(StockRoot);
