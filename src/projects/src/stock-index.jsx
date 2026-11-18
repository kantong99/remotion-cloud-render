
import React from "react";
import { Composition, registerRoot } from "remotion";
import { DigitalCalm } from "./DigitalCalm";
import { PigeonVideo } from "./PigeonCollection";

const StockRoot = () => {
  return (
    <>
      <Composition
        id="Stock001"
        component={DigitalCalm}
        width={3840}
        height={2160}
        fps={30}
        durationInFrames={600}
      />

      <Composition id="PIGEON-001" component={PigeonVideo} defaultProps={{ variant: 1 }} width={3840} height={2160} fps={30} durationInFrames={600} />
      <Composition id="PIGEON-002" component={PigeonVideo} defaultProps={{ variant: 2 }} width={3840} height={2160} fps={30} durationInFrames={600} />
      <Composition id="PIGEON-003" component={PigeonVideo} defaultProps={{ variant: 3 }} width={3840} height={2160} fps={30} durationInFrames={600} />
      <Composition id="PIGEON-004" component={PigeonVideo} defaultProps={{ variant: 4 }} width={3840} height={2160} fps={30} durationInFrames={600} />
      <Composition id="PIGEON-005" component={PigeonVideo} defaultProps={{ variant: 5 }} width={3840} height={2160} fps={30} durationInFrames={600} />
      <Composition id="PIGEON-006" component={PigeonVideo} defaultProps={{ variant: 6 }} width={3840} height={2160} fps={30} durationInFrames={600} />
      <Composition id="PIGEON-007" component={PigeonVideo} defaultProps={{ variant: 7 }} width={3840} height={2160} fps={30} durationInFrames={600} />
      <Composition id="PIGEON-008" component={PigeonVideo} defaultProps={{ variant: 8 }} width={3840} height={2160} fps={30} durationInFrames={600} />
      <Composition id="PIGEON-009" component={PigeonVideo} defaultProps={{ variant: 9 }} width={3840} height={2160} fps={30} durationInFrames={600} />
      <Composition id="PIGEON-010" component={PigeonVideo} defaultProps={{ variant: 10 }} width={3840} height={2160} fps={30} durationInFrames={600} />
    </>
  );
};

registerRoot(StockRoot);
