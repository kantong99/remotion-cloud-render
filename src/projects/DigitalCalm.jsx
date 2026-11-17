
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const elements = [
  { x: 12, y: 22, s: 150, color: "#62D7D1", shape: "circle" },
  { x: 26, y: 72, s: 105, color: "#F6A6C9", shape: "circle" },
  { x: 42, y: 17, s: 95, color: "#A9A0F4", shape: "pill" },
  { x: 58, y: 80, s: 175, color: "#F5C66C", shape: "circle" },
  { x: 78, y: 25, s: 125, color: "#74C7ED", shape: "circle" },
  { x: 90, y: 63, s: 90, color: "#E99AC8", shape: "pill" },
  { x: 17, y: 48, s: 65, color: "#B8A5F4", shape: "circle" },
  { x: 35, y: 42, s: 120, color: "#8ADCC8", shape: "pill" },
  { x: 67, y: 43, s: 75, color: "#F7B7A6", shape: "circle" },
  { x: 84, y: 84, s: 145, color: "#A8B9F5", shape: "circle" },
  { x: 49, y: 55, s: 55, color: "#F4D88D", shape: "circle" },
  { x: 7, y: 85, s: 110, color: "#8DCBE9", shape: "pill" },
  { x: 94, y: 12, s: 80, color: "#D9A7ED", shape: "circle" },
  { x: 30, y: 12, s: 65, color: "#F6A5A5", shape: "circle" },
  { x: 73, y: 67, s: 115, color: "#80D6C2", shape: "pill" },
  { x: 54, y: 31, s: 70, color: "#D5A7F0", shape: "circle" },
];

export const DigitalCalm = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Three complete motion cycles in 20 seconds.
  const phase = (frame / durationInFrames) * Math.PI * 6;

  const wave = Math.sin(phase);
  const wave2 = Math.cos(phase);

  const blobX = Math.sin(phase) * 280;
  const blobY = Math.cos(phase) * 210;
  const rotation = Math.sin(phase) * 28;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #DDECF8, #DCD5F5 48%, #F5DCEB)",
      }}
    >
      {/* Background light */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.65), transparent 65%)",
        }}
      />

      {/* Large moving blue shape */}
      <div
        style={{
          position: "absolute",
          width: 1450,
          height: 1350,
          left: -300 + blobX,
          top: -400 + blobY,
          borderRadius: "42% 58% 55% 45%",
          background:
            "linear-gradient(135deg, #6FCFE1, #8C9CEB)",
          opacity: 0.88,
          transform: `rotate(${rotation}deg)`,
          filter: "blur(18px)",
        }}
      />

      {/* Pink moving shape */}
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 1200,
          right: -300 - blobX,
          bottom: -400 - blobY,
          borderRadius: "55% 45% 35% 65%",
          background:
            "linear-gradient(135deg, #F5A9D0, #C7A5EC)",
          opacity: 0.88,
          transform: `rotate(${-rotation}deg)`,
          filter: "blur(20px)",
        }}
      />

      {/* Green central shape */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: "38%",
          top: "30%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #A8E9D4, #72CFC9)",
          opacity: 0.76,
          transform: `
            translate(
              ${Math.sin(phase + 1) * 240}px,
              ${Math.cos(phase + 1) * 180}px
            )
            scale(${1 + wave * 0.12})
          `,
        }}
      />

      {/* Moving geometric elements */}
      {elements.map((item, index) => {
        const angle = phase + index * 0.83;

        const x = Math.sin(angle) * (170 + index * 9);
        const y = Math.cos(angle * 1.2) * (130 + index * 6);

        const scale =
          1 + Math.sin(angle * 1.5) * 0.22;

        const rotate = Math.cos(angle) * 55;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: item.s,
              height: item.shape === "pill"
                ? item.s * 1.7
                : item.s,
              borderRadius: item.shape === "pill"
                ? "50%"
                : "50%",
              background: item.color,
              opacity: 0.9,
              boxShadow:
                "0 25px 60px rgba(70,70,120,0.13)",
              transform: `
                translate(${x}px, ${y}px)
                rotate(${rotate}deg)
                scale(${scale})
              `,
            }}
          />
        );
      })}

      {/* Large orbit rings */}
      <div
        style={{
          position: "absolute",
          width: 1700,
          height: 1700,
          left: "50%",
          top: "50%",
          marginLeft: -850,
          marginTop: -850,
          borderRadius: "50%",
          border: "7px solid rgba(255,255,255,0.48)",
          transform: `rotate(${rotation}deg) scale(${
            1 + wave * 0.035
          })`,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 1150,
          height: 1150,
          left: "50%",
          top: "50%",
          marginLeft: -575,
          marginTop: -575,
          borderRadius: "50%",
          border: "5px solid rgba(255,255,255,0.55)",
          transform: `rotate(${-rotation * 1.5}deg)`,
        }}
      />

      {/* Small floating particles */}
      {Array.from({ length: 30 }).map((_, index) => {
        const angle = phase + index * 0.65;
        const size = 12 + (index % 5) * 9;

        return (
          <div
            key={`particle-${index}`}
            style={{
              position: "absolute",
              left: `${(index * 37 + 11) % 100}%`,
              top: `${(index * 23 + 9) % 100}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              transform: `
                translate(
                  ${Math.sin(angle) * 95}px,
                  ${Math.cos(angle) * 85}px
                )
                scale(${1 + Math.sin(angle) * 0.4})
              `,
            }}
          />
        );
      })}

      {/* Central translucent glass circle */}
      <div
        style={{
          position: "absolute",
          width: 650,
          height: 650,
          left: "50%",
          top: "50%",
          marginLeft: -325,
          marginTop: -325,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.38), rgba(255,255,255,0.04))",
          border: "5px solid rgba(255,255,255,0.6)",
          transform: `
            translate(${blobX * 0.35}px, ${blobY * 0.35}px)
            scale(${1 + wave2 * 0.08})
          `,
        }}
      />
    </AbsoluteFill>
  );
};
