
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

const W = 1920;
const H = 1080;
const TAU = Math.PI * 2;

const ribbons = [
  {
    d: "M -250 250 C 180 -180 520 105 800 430 S 1400 850 2170 220",
    color: "rainbow1",
    speed: 1.0,
    x: 0,
    y: -65,
    angle: -12,
  },
  {
    d: "M -180 850 C 260 1080 490 560 810 350 S 1460 -100 2100 570",
    color: "rainbow2",
    speed: -1.1,
    x: 20,
    y: 45,
    angle: 15,
  },
  {
    d: "M 100 -180 C 420 250 780 80 1050 450 S 1500 1000 2000 900",
    color: "rainbow3",
    speed: 0.8,
    x: -25,
    y: 20,
    angle: -9,
  },
  {
    d: "M 200 1200 C 520 760 450 300 900 170 S 1580 300 1950 -150",
    color: "rainbow4",
    speed: -0.9,
    x: 15,
    y: -35,
    angle: 11,
  },
  {
    d: "M -200 450 C 300 100 680 1050 1100 680 S 1570 200 2150 450",
    color: "rainbow5",
    speed: 1.2,
    x: 0,
    y: 55,
    angle: -7,
  },
];

const spheres = [
  { x: 230, y: 520, r: 78, speed: 1.0, phase: 0.0 },
  { x: 1480, y: 190, r: 85, speed: 1.2, phase: 1.0 },
  { x: 900, y: 350, r: 62, speed: 0.9, phase: 2.0 },
  { x: 930, y: 830, r: 55, speed: 1.4, phase: 3.0 },
  { x: 700, y: 1040, r: 70, speed: 1.1, phase: 4.0 },
  { x: 1740, y: 750, r: 48, speed: 1.3, phase: 5.0 },
];

export const DigitalCalm = () => {
  const frame = useCurrentFrame();

  // Two complete motion cycles in 20 seconds.
  const t = (frame / 600) * TAU * 2;

  const pulse = Math.sin(t);
  const pulse2 = Math.cos(t);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#6415EF",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute" }}
      >
        <defs>
          <linearGradient id="rainbow1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF315E"/>
            <stop offset="25%" stopColor="#FFB52E"/>
            <stop offset="50%" stopColor="#B7F34A"/>
            <stop offset="75%" stopColor="#35DCEB"/>
            <stop offset="100%" stopColor="#A44DFF"/>
          </linearGradient>

          <linearGradient id="rainbow2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF4EB8"/>
            <stop offset="30%" stopColor="#8D5BFF"/>
            <stop offset="60%" stopColor="#38D9F2"/>
            <stop offset="100%" stopColor="#8BFF72"/>
          </linearGradient>

          <linearGradient id="rainbow3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7C32"/>
            <stop offset="35%" stopColor="#FFDA49"/>
            <stop offset="65%" stopColor="#E64BC6"/>
            <stop offset="100%" stopColor="#694CFF"/>
          </linearGradient>

          <linearGradient id="rainbow4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38E8A0"/>
            <stop offset="35%" stopColor="#55D7FF"/>
            <stop offset="70%" stopColor="#A66AFF"/>
            <stop offset="100%" stopColor="#FF4F9B"/>
          </linearGradient>

          <linearGradient id="rainbow5" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F7FF55"/>
            <stop offset="35%" stopColor="#60EF91"/>
            <stop offset="70%" stopColor="#3DC9FF"/>
            <stop offset="100%" stopColor="#FF54BD"/>
          </linearGradient>

          <radialGradient id="glassSphere" cx="32%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#FFFFFF"/>
            <stop offset="18%" stopColor="#FFFFC8"/>
            <stop offset="42%" stopColor="#B7F7A5"/>
            <stop offset="68%" stopColor="#54D8EE"/>
            <stop offset="88%" stopColor="#A65BEF"/>
            <stop offset="100%" stopColor="#3922B8"/>
          </radialGradient>

          <radialGradient id="sphereGlow">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Deep purple background */}
        <rect width={W} height={H} fill="#6415EF"/>

        <circle
          cx="960"
          cy="540"
          r="760"
          fill="#A026F5"
          opacity="0.32"
        />

        {/* Moving luminous ribbons */}
        {ribbons.map((r, i) => {
          const phase = t * r.speed + i * 1.1;
          const dx = Math.sin(phase) * 115;
          const dy = Math.cos(phase) * 90;
          const rot = Math.sin(phase) * 12 + r.angle;

          const transform =
            `translate(${dx + r.x} ${dy + r.y}) ` +
            `rotate(${rot} 960 540)`;

          return (
            <g key={i} transform={transform}>
              {/* Main translucent ribbon */}
              <path
                d={r.d}
                fill="none"
                stroke={`url(#${r.color})`}
                strokeWidth="155"
                strokeLinecap="round"
                opacity="0.76"
              />

              {/* Inner glass highlight */}
              <path
                d={r.d}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="42"
                strokeLinecap="round"
                opacity="0.18"
              />

              {/* Bright central reflection */}
              <path
                d={r.d}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="9"
                strokeLinecap="round"
                opacity="0.48"
              />

              {/* Colored inner edge */}
              <path
                d={r.d}
                fill="none"
                stroke={`url(#${r.color})`}
                strokeWidth="20"
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>
          );
        })}

        {/* Orbiting spheres */}
        {spheres.map((s, i) => {
          const angle = t * s.speed + s.phase;

          const x = s.x + Math.sin(angle) * 115;
          const y = s.y + Math.cos(angle) * 75;
          const scale = 1 + Math.sin(angle * 1.5) * 0.10;
          const radius = s.r * scale;

          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill="url(#glassSphere)"
                opacity="0.96"
              />

              <ellipse
                cx={x - radius * 0.25}
                cy={y - radius * 0.35}
                rx={radius * 0.30}
                ry={radius * 0.15}
                fill="white"
                opacity="0.58"
                transform={`rotate(-35 ${x} ${y})`}
              />

              <circle
                cx={x}
                cy={y}
                r={radius * 1.65}
                fill="url(#sphereGlow)"
                opacity="0.24"
              />
            </g>
          );
        })}

        {/* Moving orbit rings */}
        {[390, 560, 730].map((radius, i) => (
          <ellipse
            key={i}
            cx="960"
            cy="540"
            rx={radius}
            ry={radius * 0.42}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={i === 0 ? 5 : 3}
            opacity={0.17 + i * 0.045}
            transform={
              `rotate(${i * 48 + pulse * 12} 960 540)`
            }
          />
        ))}

        {/* Small moving light particles */}
        {Array.from({ length: 45 }).map((_, i) => {
          const angle = t * (0.7 + (i % 5) * 0.12) + i * 1.7;
          const x = (i * 173 + 80) % W;
          const y = (i * 97 + 40) % H;
          const moveX = Math.sin(angle) * 42;
          const moveY = Math.cos(angle) * 35;
          const size = 3 + (i % 5) * 2;

          return (
            <circle
              key={i}
              cx={x + moveX}
              cy={y + moveY}
              r={size}
              fill="#FFFFFF"
              opacity={0.35 + Math.sin(angle) * 0.2}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
