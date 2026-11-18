
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

const W = 1920;
const H = 1080;
const TAU = Math.PI * 2;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
};

const skyColors = [
  ["#48B9F5", "#D5F3FF"],
  ["#E7C9E8", "#FFF0DC"],
  ["#F7A65D", "#FFE5B2"],
  ["#69B9E9", "#D9F5FF"],
  ["#F8F6F0", "#C9DCEB"],
  ["#72BDEB", "#DDF4FA"],
  ["#B8D9F0", "#FFF2D9"],
  ["#F17A43", "#382B5A"],
  ["#16B7D0", "#B7F1E8"],
  ["#E6BD83", "#312A48"],
];

const Bird = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  frame = 0,
  delay = 0,
  color = "#F4F7FA",
  style = 0,
}) => {
  const flap = Math.sin((frame + delay) * 0.32) * 43;
  const bob = Math.sin((frame + delay) * 0.09) * 7;

  return (
    <g
      transform={`translate(${x} ${y + bob}) rotate(${rotation}) scale(${scale})`}
    >
      {/* Tail */}
      <path
        d="M-52 0 L-112 -30 L-90 0 L-112 30 L-52 15 Z"
        fill={color}
        stroke="#8193A5"
        strokeWidth="2"
      />

      {/* Body */}
      <ellipse
        cx="0"
        cy="0"
        rx="65"
        ry="29"
        fill={color}
        stroke="#8193A5"
        strokeWidth="2"
      />

      {/* Neck */}
      <path
        d="M25 -14 Q35 -65 72 -57 Q90 -32 70 5"
        fill={color}
        stroke="#8193A5"
        strokeWidth="2"
      />

      {/* Head */}
      <circle
        cx="75"
        cy="-58"
        r="23"
        fill={color}
        stroke="#8193A5"
        strokeWidth="2"
      />

      {/* Beak */}
      <path
        d="M96 -59 L119 -53 L96 -47 Z"
        fill="#E9A15B"
      />

      {/* Eye */}
      <circle cx="81" cy="-64" r="4" fill="#253746"/>
      <circle cx="82" cy="-65" r="1.5" fill="white"/>

      {/* Main wing rotates at shoulder */}
      <g transform={`rotate(${flap} -12 -8)`}>
        <path
          d="M-32 -8 Q-72 -83 -25 -125 Q20 -161 64 -111 Q78 -65 35 -13 Z"
          fill={style === 7 ? "#29223E" : color}
          stroke="#7E91A5"
          strokeWidth="3"
        />

        <path
          d="M-23 -23 Q-7 -83 3 -124
             M-2 -20 Q24 -72 43 -113
             M19 -17 Q49 -59 60 -92"
          fill="none"
          stroke={style === 7 ? "#A18DBB" : "#AABAC8"}
          strokeWidth="3"
        />
      </g>

      {/* Feet */}
      <path
        d="M-5 24 L-5 39 L-18 44 M-5 39 L5 44"
        fill="none"
        stroke="#CB8B6C"
        strokeWidth="3"
      />
    </g>
  );
};

const Cloud = ({ x, y, scale = 1, opacity = 0.8 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <ellipse cx="0" cy="25" rx="105" ry="30" fill="white"/>
    <circle cx="-50" cy="0" r="42" fill="white"/>
    <circle cx="0" cy="-20" r="57" fill="white"/>
    <circle cx="60" cy="8" r="43" fill="white"/>
  </g>
);

const Background = ({ frame, variant }) => {
  const [top, bottom] = skyColors[variant - 1];

  return (
    <>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top}/>
          <stop offset="1" stopColor={bottom}/>
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill="url(#sky)"/>

      {variant !== 8 && [0, 1, 2, 3, 4].map((i) => {
        const x = ((i * 510 - frame * 1.1) % 2600 + 2600) % 2600 - 250;
        return (
          <Cloud
            key={i}
            x={x}
            y={140 + (i % 3) * 190}
            scale={0.7 + (i % 2) * 0.4}
            opacity={variant === 10 ? 0.12 : 0.6}
          />
        );
      })}

      <circle
        cx={variant === 8 ? 1450 : 1580}
        cy={variant === 8 ? 260 : 155}
        r={variant === 8 ? 130 : 85}
        fill={variant === 8 ? "#FFD18B" : "#FFF7C9"}
        opacity=".8"
      />
    </>
  );
};

// 001 - Freedom in the Sky
const Scene1 = ({ frame }) => (
  <>
    {Array.from({ length: 16 }).map((_, i) => {
      const x = ((i * 210 + frame * (2.5 + i % 3)) % 2350) - 200;
      const y = 250 + Math.sin(frame * .035 + i) * 100 + (i % 4) * 90;

      return (
        <Bird
          key={i}
          x={x}
          y={y}
          scale={.45 + (i % 4) * .13}
          frame={frame}
          delay={i * 9}
          rotation={Math.sin(frame * .02 + i) * 10}
        />
      );
    })}
  </>
);

// 002 - Love on the Wire
const Scene2 = ({ frame }) => (
  <>
    <path d="M0 620 Q960 605 1920 620" stroke="#303944" strokeWidth="9" fill="none"/>
    <path d="M0 626 Q960 612 1920 626" stroke="#BAC1CA" strokeWidth="2" fill="none"/>

    <Bird x={800} y={560 + Math.sin(frame * .07) * 4}
      scale={1.15} frame={frame} color="#E9EDF3"/>

    <Bird x={1070} y={560 + Math.sin(frame * .07 + 1) * 4}
      scale={-1.15} frame={frame} color="#FFFFFF"/>

    {[0, 1, 2, 3, 4].map((i) => (
      <text
        key={i}
        x={930 + Math.sin(frame * .04 + i) * 100}
        y={450 - ((frame * 1.5 + i * 90) % 170)}
        fontSize="40"
        fill="#EA829D"
        opacity=".65"
      >♥</text>
    ))}
  </>
);

// 003 - Morning City Flight
const Scene3 = ({ frame }) => (
  <>
    {Array.from({ length: 10 }).map((_, i) => (
      <rect
        key={i}
        x={i * 210}
        y={570 + (i % 3) * 45}
        width="180"
        height={510 - (i % 3) * 45}
        fill={i % 2 ? "#A9B8C5" : "#8496A7"}
      />
    ))}

    {Array.from({ length: 8 }).map((_, i) => (
      <Bird
        key={i}
        x={((i * 250 + frame * 3) % 2300) - 200}
        y={440 + Math.sin(frame * .05 + i) * 90}
        scale={.55 + (i % 3) * .15}
        frame={frame}
        delay={i * 13}
      />
    ))}
  </>
);

// 004 - The Message Carrier
const Scene4 = ({ frame }) => {
  const x = frame * 4 - 200;
  const y = 420 + Math.sin(frame * .07) * 35;
  const release = frame >= 200;
  const paperY = release
    ? Math.min(850, y + 100 + (frame - 200) * 5)
    : y + 90;

  return (
    <>
      <Bird x={x} y={y} frame={frame} scale={1.2}/>

      <g transform={`translate(${release ? x : x + 80} ${paperY}) rotate(${release ? (frame - 200) * 3 : -8})`}>
        <rect x="-65" y="-42" width="130" height="84"
          rx="8" fill="#FFF0C6" stroke="#A77D47" strokeWidth="3"/>
        <text x="0" y="7" textAnchor="middle"
          fontSize="21" fontWeight="bold" fill="#68451D">
          MESSAGE
        </text>
      </g>
    </>
  );
};

// 005 - Wedding Doves
const Scene5 = ({ frame }) => (
  <>
    <g opacity=".5">
      <path d="M200 180 Q960 900 1700 180" fill="none"
        stroke="#FFF8E8" strokeWidth="5" strokeDasharray="14 18"/>
    </g>
    <Bird x={750 + frame * .7} y={480 + Math.sin(frame * .05) * 30}
      frame={frame} scale={1.2} color="#FFFFFF"/>
    <Bird x={1020 + frame * .7} y={500 + Math.sin(frame * .05 + 1) * 30}
      frame={frame} scale={1.15} color="#F7FAFF"/>
  </>
);

// 006 - Fountain Dance
const Scene6 = ({ frame }) => (
  <>
    <ellipse cx="960" cy="850" rx="370" ry="95" fill="#8BC9D9"/>
    <ellipse cx="960" cy="810" rx="290" ry="65" fill="#D7F5F9"/>
    <rect x="905" y="510" width="110" height="300" rx="20" fill="#8B9EAE"/>
    <ellipse cx="960" cy="520" rx="170" ry="42" fill="#B9D8E3"/>
    {Array.from({ length: 10 }).map((_, i) => (
      <Bird
        key={i}
        x={960 + Math.cos(frame * .035 + i * TAU / 10) * 410}
        y={550 + Math.sin(frame * .035 + i * TAU / 10) * 220}
        frame={frame}
        scale={.55}
        delay={i * 10}
      />
    ))}
  </>
);

// 007 - Window Visitor
const Scene7 = ({ frame }) => {
  const x = frame < 230 ? 1700 - frame * 4 : 780;
  const y = frame < 230 ? 450 + Math.sin(frame * .1) * 20 : 650;

  return (
    <>
      <rect x="80" y="100" width="1760" height="800"
        fill="#FFF4DD" stroke="#8C684B" strokeWidth="35"/>
      <path d="M960 100 V900 M80 500 H1840"
        stroke="#8C684B" strokeWidth="22"/>
      <rect x="110" y="130" width="820" height="350"
        fill="#B9DDF2" opacity=".7"/>
      <rect x="990" y="130" width="820" height="350"
        fill="#B9DDF2" opacity=".7"/>
      <Bird x={x} y={y} frame={frame} scale={1.05}/>
    </>
  );
};

// 008 - Sunset Migration
const Scene8 = ({ frame }) => (
  <>
    {Array.from({ length: 20 }).map((_, i) => (
      <Bird
        key={i}
        x={((i * 125 + frame * (2 + i % 3)) % 2500) - 250}
        y={280 + Math.abs(i - 10) * 24 + Math.sin(frame * .04 + i) * 20}
        frame={frame}
        scale={.35 + (i % 3) * .12}
        delay={i * 7}
        color="#30243E"
        style={8}
      />
    ))}
  </>
);

// 009 - Ocean Breeze
const Scene9 = ({ frame }) => (
  <>
    <path d="M0 700 Q480 630 960 700 T1920 700 V1080 H0Z"
      fill="#138CB0"/>
    <path d="M0 770 Q480 700 960 770 T1920 770"
      stroke="#B9FFF0" strokeWidth="15" fill="none"/>
    <path d="M0 870 Q480 800 960 870 T1920 870"
      stroke="#79D8DD" strokeWidth="10" fill="none"/>
    {Array.from({ length: 9 }).map((_, i) => (
      <Bird
        key={i}
        x={((i * 250 + frame * 3) % 2400) - 250}
        y={250 + (i % 4) * 100 + Math.sin(frame * .05 + i) * 40}
        frame={frame}
        scale={.55 + (i % 3) * .12}
        delay={i * 11}
      />
    ))}
  </>
);

// 010 - Wings of Elegance
const Scene10 = ({ frame }) => {
  const x = 950 + Math.sin(frame * .015) * 180;
  const y = 540 + Math.sin(frame * .04) * 45;
  const scale = 2.4 + Math.sin(frame * .02) * .1;

  return (
    <>
      <ellipse cx="960" cy="540" rx="720" ry="500"
        fill="#FFE3B0" opacity=".12"/>
      <Bird
        x={x}
        y={y}
        scale={scale}
        frame={frame}
        color="#FFFFFF"
      />
    </>
  );
};

const scenes = {
  1: Scene1,
  2: Scene2,
  3: Scene3,
  4: Scene4,
  5: Scene5,
  6: Scene6,
  7: Scene7,
  8: Scene8,
  9: Scene9,
  10: Scene10,
};

export const PigeonVideo = ({ variant = 1 }) => {
  const frame = useCurrentFrame();
  const Scene = scenes[variant] || Scene1;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
        <Background frame={frame} variant={variant}/>
        <Scene frame={frame}/>
      </svg>
    </AbsoluteFill>
  );
};
