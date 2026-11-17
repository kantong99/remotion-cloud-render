
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// ==================================================
// FUTURE FLUX — STOCK-002
// Premium metallic orbital motion graphics
// 3840x2160 output | 30 FPS | 20 seconds
// ==================================================

const FRAMES = 600;
const TAU = Math.PI * 2;

const COLORS = {
  background: "#090D24",
  gold: "#FFD477",
  cyan: "#43E7F0",
  purple: "#A56CFF",
  pink: "#FF58B8",
  white: "#FFFFFF",
};

const ORBITS = [
  {
    rx: 550,
    ry: 225,
    speed: 2,
    direction: 1,
    color: COLORS.gold,
    width: 15,
  },
  {
    rx: 455,
    ry: 315,
    speed: 3,
    direction: -1,
    color: COLORS.cyan,
    width: 12,
  },
  {
    rx: 660,
    ry: 390,
    speed: 1,
    direction: 1,
    color: COLORS.purple,
    width: 10,
  },
  {
    rx: 335,
    ry: 150,
    speed: 4,
    direction: -1,
    color: COLORS.pink,
    width: 9,
  },
];

const SPHERES = [
  { radius: 430, size: 35, speed: 2, phase: 0, color: COLORS.gold },
  { radius: 530, size: 24, speed: -3, phase: 60, color: COLORS.cyan },
  { radius: 310, size: 28, speed: 4, phase: 130, color: COLORS.pink },
  { radius: 600, size: 20, speed: -2, phase: 210, color: COLORS.purple },
  { radius: 370, size: 18, speed: 3, phase: 280, color: COLORS.white },
  { radius: 490, size: 26, speed: -1, phase: 320, color: COLORS.gold },
];

const RIBBONS = [
  {
    path: "M 120 430 C 400 60 750 950 1040 430 S 1570 170 1800 600",
    speed: 2,
    width: 100,
    color: "goldGradient",
  },
  {
    path: "M 100 700 C 450 1050 750 100 1080 600 S 1550 980 1840 350",
    speed: -2,
    width: 80,
    color: "cyanGradient",
  },
  {
    path: "M 250 100 C 550 700 950 100 1250 400 S 1500 750 1780 100",
    speed: 3,
    width: 65,
    color: "purpleGradient",
  },
];

const RotatingSphere = ({ x, y, size, color, frame }) => {
  const rotation = (frame / FRAMES) * 360 * 2;

  return (
    <g transform={`translate(${x} ${y})`}>
      <circle
        r={size * 1.7}
        fill={color}
        opacity="0.12"
      />

      <circle
        r={size}
        fill="url(#metalSphere)"
        stroke={color}
        strokeWidth="2"
      />

      {/* Fixed sphere center, rotating highlight */}
      <g transform={`rotate(${rotation})`}>
        <ellipse
          cx={-size * 0.28}
          cy={-size * 0.30}
          rx={size * 0.42}
          ry={size * 0.17}
          fill="#FFFFFF"
          opacity="0.8"
        />
        <path
          d={`M ${-size * 0.65} ${size * 0.35}
              Q 0 ${size * 0.95} ${size * 0.65} ${size * 0.25}`}
          fill="none"
          stroke={color}
          strokeWidth="3"
          opacity="0.9"
        />
      </g>
    </g>
  );
};

export const FutureFlux = () => {
  const frame = useCurrentFrame();

  // Exact periodic rotation.
  // All rotational values return to their initial position
  // after 600 frames.

  const cycle = frame / FRAMES;

  const centerX = 960;
  const centerY = 540;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
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
          {/* Gold metallic gradient */}
          <linearGradient
            id="goldGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFF9CF" />
            <stop offset="20%" stopColor="#DCA63D" />
            <stop offset="42%" stopColor="#FFF0A0" />
            <stop offset="65%" stopColor="#9B6623" />
            <stop offset="85%" stopColor="#FFE6A0" />
            <stop offset="100%" stopColor="#B87927" />
          </linearGradient>

          {/* Cyan metallic gradient */}
          <linearGradient
            id="cyanGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#3AE8FF" />
            <stop offset="50%" stopColor="#126DAD" />
            <stop offset="75%" stopColor="#A8FFFF" />
            <stop offset="100%" stopColor="#197D9D" />
          </linearGradient>

          {/* Purple metallic gradient */}
          <linearGradient
            id="purpleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F5C7FF" />
            <stop offset="40%" stopColor="#9149FF" />
            <stop offset="70%" stopColor="#42217D" />
            <stop offset="100%" stopColor="#D9A6FF" />
          </linearGradient>

          {/* Sphere surface */}
          <radialGradient
            id="metalSphere"
            cx="30%"
            cy="25%"
            r="75%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="18%" stopColor="#FFF1BD" />
            <stop offset="38%" stopColor="#B3D8E8" />
            <stop offset="65%" stopColor="#5267A9" />
            <stop offset="85%" stopColor="#272A66" />
            <stop offset="100%" stopColor="#11162E" />
          </radialGradient>

          {/* Background illumination */}
          <radialGradient id="backgroundGlow">
            <stop offset="0%" stopColor="#51408B" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#242050" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#090D24" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect
          width="1920"
          height="1080"
          fill={COLORS.background}
        />

        <ellipse
          cx={centerX}
          cy={centerY}
          rx="850"
          ry="500"
          fill="url(#backgroundGlow)"
        />

        {/* =====================================
            SECTION 1: STABLE ORBITAL RINGS
        ===================================== */}

        {ORBITS.map((orbit, index) => {
          const angle =
            cycle * 360 * orbit.speed * orbit.direction;

          return (
            <g
              key={`orbit-${index}`}
              transform={`rotate(${angle} ${centerX} ${centerY})`}
            >
              {/* Outer ring */}
              <ellipse
                cx={centerX}
                cy={centerY}
                rx={orbit.rx}
                ry={orbit.ry}
                fill="none"
                stroke={orbit.color}
                strokeWidth={orbit.width}
                opacity="0.45"
              />

              {/* Fine inner line */}
              <ellipse
                cx={centerX}
                cy={centerY}
                rx={orbit.rx}
                ry={orbit.ry}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3"
                opacity="0.85"
              />

              {/* Metallic reflection */}
              <ellipse
                cx={centerX}
                cy={centerY}
                rx={orbit.rx - 14}
                ry={orbit.ry - 9}
                fill="none"
                stroke={orbit.color}
                strokeWidth="3"
                opacity="0.7"
                strokeDasharray="40 18 120 30"
              />

              {/* Orbital marker */}
              <circle
                cx={centerX + orbit.rx}
                cy={centerY}
                r="12"
                fill="#FFFFFF"
              />
            </g>
          );
        })}

        {/* =====================================
            SECTION 2: ROTATING METALLIC RIBBONS
        ===================================== */}

        {RIBBONS.map((ribbon, index) => {
          const angle = cycle * 360 * ribbon.speed;

          return (
            <g
              key={`ribbon-${index}`}
              transform={`rotate(${angle} ${centerX} ${centerY})`}
            >
              {/* Wide metallic body */}
              <path
                d={ribbon.path}
                fill="none"
                stroke={`url(#${ribbon.color})`}
                strokeWidth={ribbon.width}
                strokeLinecap="round"
                opacity="0.65"
              />

              {/* Glass highlight */}
              <path
                d={ribbon.path}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={ribbon.width * 0.20}
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* Fine reflection */}
              <path
                d={ribbon.path}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>
          );
        })}

        {/* =====================================
            SECTION 3: SPHERES ON CIRCULAR ORBITS
        ===================================== */}

        {SPHERES.map((sphere, index) => {
          const angle =
            (cycle * 360 * sphere.speed + sphere.phase) *
            Math.PI / 180;

          const x =
            centerX + Math.cos(angle) * sphere.radius;

          const y =
            centerY + Math.sin(angle) * sphere.radius * 0.55;

          return (
            <RotatingSphere
              key={`sphere-${index}`}
              x={x}
              y={y}
              size={sphere.size}
              color={sphere.color}
              frame={frame}
            />
          );
        })}

        {/* =====================================
            SECTION 4: ROTATING PARTICLE SYSTEM
        ===================================== */}

        <g
          transform={`rotate(${cycle * 360 * 3} ${centerX} ${centerY})`}
        >
          {Array.from({ length: 48 }).map((_, index) => {
            const angle = (index / 48) * TAU;
            const radius = 350 + (index % 4) * 85;

            const x = centerX + Math.cos(angle) * radius;
            const y =
              centerY + Math.sin(angle) * radius * 0.55;

            return (
              <g key={`particle-${index}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={index % 3 === 0 ? 5 : 3}
                  fill={
                    index % 2 === 0
                      ? COLORS.gold
                      : COLORS.cyan
                  }
                  opacity="0.85"
                />
              </g>
            );
          })}
        </g>

        {/* =====================================
            SECTION 5: CENTRAL ENERGY CORE
        ===================================== */}

        <g>
          <circle
            cx={centerX}
            cy={centerY}
            r="125"
            fill="none"
            stroke={COLORS.gold}
            strokeWidth="4"
            opacity="0.6"
          />

          <circle
            cx={centerX}
            cy={centerY}
            r="95"
            fill="url(#metalSphere)"
            stroke="#FFFFFF"
            strokeWidth="3"
          />

          <g
            transform={`rotate(${-cycle * 360 * 4} ${centerX} ${centerY})`}
          >
            <ellipse
              cx={centerX}
              cy={centerY}
              rx="145"
              ry="48"
              fill="none"
              stroke={COLORS.cyan}
              strokeWidth="9"
              opacity="0.85"
            />

            <ellipse
              cx={centerX}
              cy={centerY}
              rx="145"
              ry="48"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              opacity="0.9"
            />
          </g>
        </g>

        {/* =====================================
            SECTION 6: OUTER ROTATING FRAME
        ===================================== */}

        <g
          transform={`rotate(${cycle * 360} ${centerX} ${centerY})`}
        >
          <ellipse
            cx={centerX}
            cy={centerY}
            rx="880"
            ry="490"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            opacity="0.35"
            strokeDasharray="5 18"
          />

          <circle
            cx={centerX + 880}
            cy={centerY}
            r="13"
            fill={COLORS.gold}
          />

          <circle
            cx={centerX - 880}
            cy={centerY}
            r="13"
            fill={COLORS.cyan}
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
