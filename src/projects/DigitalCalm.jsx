
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =====================================
// SETTINGS - EDIT BAGIAN INI
// =====================================

const STYLE = "geometry";
// Pilihan: "rainbow", "neon", "geometry"

const DURATION = 600;
const SPEED = 3;
const BACKGROUND = "#5410D9";

// =====================================
// ANIMATION ENGINE
// =====================================

const TAU = Math.PI * 2;

export const DigitalCalm = () => {
  const frame = useCurrentFrame();

  // Seamless motion cycle
  const t = (frame / DURATION) * TAU * SPEED;

  const sin = Math.sin;
  const cos = Math.cos;

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF315E"/>
            <stop offset="25%" stopColor="#FFD52E"/>
            <stop offset="50%" stopColor="#42EF9B"/>
            <stop offset="75%" stopColor="#27CFFF"/>
            <stop offset="100%" stopColor="#B34CFF"/>
          </linearGradient>

          <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF"/>
            <stop offset="50%" stopColor="#FF00C8"/>
            <stop offset="100%" stopColor="#8A35FF"/>
          </linearGradient>

          <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF6A5"/>
            <stop offset="50%" stopColor="#FF9A35"/>
            <stop offset="100%" stopColor="#FF37A8"/>
          </linearGradient>

          <radialGradient id="glass">
            <stop offset="0%" stopColor="#FFFFFF"/>
            <stop offset="30%" stopColor="#B6F5FF"/>
            <stop offset="70%" stopColor="#A15BFF"/>
            <stop offset="100%" stopColor="#3710A8"/>
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="12"/>
          </filter>
        </defs>

        {/* BACKGROUND LIGHT */}
        <circle
          cx={960 + sin(t) * 150}
          cy={540 + cos(t) * 100}
          r="450"
          fill="#B34CFF"
          opacity="0.3"
        />

        {/* =================================
            DESIGN 01 - RAINBOW FLUID
        ================================= */}

        {STYLE === "rainbow" && (
          <g>
            {[
              "M-200 250 C300 -150 600 850 1050 400 S1650 100 2100 400",
              "M-200 850 C250 1100 550 250 1000 500 S1600 1000 2100 600",
              "M100 -200 C500 350 800 100 1200 450 S1650 1000 2000 900",
              "M200 1200 C500 700 500 200 1000 180 S1600 500 2000 -100",
              "M-100 500 C400 100 700 1050 1100 650 S1600 200 2100 450",
            ].map((path, i) => {
              const phase = t + i * 1.25;
              const x = sin(phase) * 110;
              const y = cos(phase) * 90;
              const rotation = sin(phase) * 15;

              return (
                <g
                  key={i}
                  transform={`translate(${x} ${y}) rotate(${rotation} 960 540)`}
                >
                  <path
                    d={path}
                    fill="none"
                    stroke="url(#rainbow)"
                    strokeWidth="145"
                    strokeLinecap="round"
                    opacity="0.82"
                  />

                  <path
                    d={path}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="35"
                    strokeLinecap="round"
                    opacity="0.35"
                  />

                  <path
                    d={path}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="7"
                    strokeLinecap="round"
                    opacity="0.65"
                  />
                </g>
              );
            })}

            {Array.from({ length: 8 }).map((_, i) => {
              const a = t + i * TAU / 8;
              const x = 960 + cos(a) * 650;
              const y = 540 + sin(a) * 350;

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={35 + sin(a) * 10}
                  fill="url(#glass)"
                />
              );
            })}
          </g>
        )}

        {/* =================================
            DESIGN 02 - NEON ENERGY
        ================================= */}

        {STYLE === "neon" && (
          <g>
            {Array.from({ length: 12 }).map((_, i) => {
              const a = t + i * 0.4;
              const rotation = a * 25;
              const rx = 250 + i * 55;
              const ry = 130 + i * 30;

              return (
                <ellipse
                  key={i}
                  cx={960 + sin(a) * 100}
                  cy={540 + cos(a) * 70}
                  rx={rx}
                  ry={ry}
                  fill="none"
                  stroke="url(#neon)"
                  strokeWidth={12 - (i % 4)}
                  opacity="0.85"
                  transform={`rotate(${rotation} 960 540)`}
                />
              );
            })}

            {Array.from({ length: 24 }).map((_, i) => {
              const a = t * 1.4 + i * TAU / 24;
              const x = 960 + cos(a) * (300 + i * 20);
              const y = 540 + sin(a) * (180 + i * 9);

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={12 + (i % 5) * 5}
                  fill="#FFFFFF"
                  opacity="0.85"
                />
              );
            })}

            <circle
              cx={960}
              cy={540}
              r={160 + sin(t * 2) * 35}
              fill="none"
              stroke="url(#neon)"
              strokeWidth="35"
              filter="url(#glow)"
              opacity="0.9"
            />

            <circle
              cx={960}
              cy={540}
              r={130 + cos(t * 2) * 25}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="8"
              opacity="0.8"
            />
          </g>
        )}

        {/* =================================
            DESIGN 03 - GEOMETRIC EXPLOSION
        ================================= */}

        {STYLE === "geometry" && (
          <g>
            {Array.from({ length: 36 }).map((_, i) => {
              const a = t + i * TAU / 36;
              const orbit = 150 + (i % 6) * 95;

              const x = 960 + cos(a) * orbit;
              const y = 540 + sin(a) * orbit * 0.55;

              const size = 35 + (i % 5) * 18;
              const rotation = a * 55;

              return (
                <g
                  key={i}
                  transform={`translate(${x} ${y}) rotate(${rotation})`}
                >
                  {i % 3 === 0 ? (
                    <circle
                      r={size}
                      fill="url(#glass)"
                    />
                  ) : i % 3 === 1 ? (
                    <rect
                      x={-size}
                      y={-size}
                      width={size * 2}
                      height={size * 2}
                      rx="10"
                      fill="url(#rainbow)"
                      opacity="0.9"
                    />
                  ) : (
                    <polygon
                      points={`0,${-size} ${size},${size} ${-size},${size}`}
                      fill="url(#gold)"
                    />
                  )}
                </g>
              );
            })}

            {Array.from({ length: 8 }).map((_, i) => {
              const a = t + i * TAU / 8;

              return (
                <ellipse
                  key={i}
                  cx={960}
                  cy={540}
                  rx={300 + i * 75}
                  ry={150 + i * 35}
                  fill="none"
                  stroke="url(#rainbow)"
                  strokeWidth="9"
                  opacity="0.8"
                  transform={`rotate(${a * 40} 960 540)`}
                />
              );
            })}
          </g>
        )}

        {/* COMMON MOVING PARTICLES */}

        {Array.from({ length: 55 }).map((_, i) => {
          const a = t + i * 1.7;
          const x = (i * 179 + 90) % 1920;
          const y = (i * 103 + 40) % 1080;

          return (
            <circle
              key={i}
              cx={x + sin(a) * 35}
              cy={y + cos(a) * 35}
              r={3 + (i % 5) * 2}
              fill="#FFFFFF"
              opacity="0.7"
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
