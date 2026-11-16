
import React from "react";
import {
  AbsoluteFill,
  Composition,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { registerRoot } from "remotion";

const Video = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const titleY = interpolate(
    frame,
    [0, 45],
    [100, 0],
    { extrapolateRight: "clamp" }
  );

  const circleX = interpolate(
    frame,
    [0, 900],
    [-250, 1700]
  );

  const pulse = 1 + 0.04 * Math.sin(frame / 18);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #10172a 0%, #183b5b 50%, #6b2d5c 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(60,180,220,0.13)",
          left: circleX,
          top: 200,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "rgba(220,80,160,0.12)",
          right: -100,
          bottom: -150,
        }}
      />

      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${pulse})`,
          textAlign: "center",
          zIndex: 2,
          padding: 50,
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 110,
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          MY FIRST VIDEO
        </div>

        <div
          style={{
            color: "#66ddff",
            fontSize: 48,
            fontWeight: 600,
            marginTop: 35,
            letterSpacing: 8,
          }}
        >
          POWERED BY REMOTION
        </div>

        <div
          style={{
            color: "#ffffff",
            opacity: 0.8,
            fontSize: 30,
            marginTop: 55,
          }}
        >
          1920 x 1080 | FULL HD | 30 FPS
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 65,
          color: "rgba(255,255,255,0.65)",
          fontSize: 24,
          letterSpacing: 3,
        }}
      >
        CLOUD VIDEO PRODUCTION
      </div>
    </AbsoluteFill>
  );
};

const RemotionRoot = () => {
  return (
    <Composition
      id="FirstVideo"
      component={Video}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(RemotionRoot);
