
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const DigitalCalm = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Semua gerakan menggunakan siklus sinus agar loop kembali
  // ke posisi awal pada akhir durasi.
  const phase = (frame / durationInFrames) * Math.PI * 2;

  const driftX = Math.sin(phase) * 110;
  const driftY = Math.cos(phase) * 75;
  const rotation = Math.sin(phase) * 12;
  const pulse = 1 + Math.sin(phase) * 0.045;

  const secondX = Math.cos(phase + 1.2) * 140;
  const secondY = Math.sin(phase + 1.2) * 95;

  const thirdX = Math.sin(phase + 2.4) * 90;
  const thirdY = Math.cos(phase + 2.4) * 100;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#e9edf8",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(135deg, #e9f2fa 0%, #e9e7f7 48%, #f7e9ef 100%)",
        }}
      />

      {/* Soft blue organic shape */}
      <div
        style={{
          position: "absolute",
          width: 1500,
          height: 1300,
          left: -250 + driftX,
          top: -350 + driftY,
          borderRadius: "45% 55% 62% 38% / 48% 42% 58% 52%",
          background:
            "radial-gradient(circle at 40% 40%, #b6e4ee 0%, #9fc8e8 42%, #b9b7e8 100%)",
          filter: "blur(35px)",
          opacity: 0.85,
          transform: `rotate(${rotation}deg) scale(${pulse})`,
        }}
      />

      {/* Lavender organic shape */}
      <div
        style={{
          position: "absolute",
          width: 1450,
          height: 1250,
          right: -250 + secondX,
          bottom: -350 + secondY,
          borderRadius: "58% 42% 40% 60% / 45% 58% 42% 55%",
          background:
            "radial-gradient(circle at 55% 45%, #e4c8ed 0%, #c6b8e9 48%, #a8cde9 100%)",
          filter: "blur(40px)",
          opacity: 0.82,
          transform: `rotate(${-rotation}deg) scale(${1 / pulse})`,
        }}
      />

      {/* Mint organic shape */}
      <div
        style={{
          position: "absolute",
          width: 850,
          height: 850,
          left: "38%",
          top: "35%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 40%, #d5f0e8, #a9dcd8 65%, #c6e9ee)",
          filter: "blur(45px)",
          opacity: 0.72,
          transform: `translate(${thirdX}px, ${thirdY}px) scale(${pulse})`,
        }}
      />

      {/* Main translucent circle */}
      <div
        style={{
          position: "absolute",
          width: 1050,
          height: 1050,
          left: "50%",
          top: "50%",
          marginLeft: -525,
          marginTop: -525,
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.48)",
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.38), rgba(255,255,255,0.04) 70%)",
          transform: `translate(${driftX * 0.45}px, ${driftY * 0.45}px) scale(${pulse})`,
        }}
      />

      {/* Decorative orbit rings */}
      <div
        style={{
          position: "absolute",
          width: 1600,
          height: 1600,
          left: "50%",
          top: "50%",
          marginLeft: -800,
          marginTop: -800,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.28)",
          transform: `rotate(${rotation}deg)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 1250,
          height: 1250,
          left: "50%",
          top: "50%",
          marginLeft: -625,
          marginTop: -625,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.20)",
          transform: `rotate(${-rotation}deg)`,
        }}
      />

      {/* Small geometric accents */}
      {[
        { x: "18%", y: "28%", size: 26 },
        { x: "77%", y: "23%", size: 36 },
        { x: "82%", y: "70%", size: 22 },
        { x: "24%", y: "78%", size: 30 },
        { x: "50%", y: "16%", size: 18 },
      ].map((dot, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.65)",
            transform: `translate(${Math.sin(phase + index) * 25}px, ${
              Math.cos(phase + index) * 25
            }px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
