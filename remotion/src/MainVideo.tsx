import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";

const { fontFamily: inter } = loadInter("normal", { weights: ["400", "500", "600", "700"] });
const { fontFamily: oswald } = loadOswald("normal", { weights: ["500", "600", "700"] });

const NAVY = "#13294B";
const GOLD = "#BA7517";
const CREAM = "#F5EFE4";

// scene durations at 30fps — tuned to VO clip lengths with breathing room
const S1 = 210; //  7.0s — home
const S2 = 270; //  9.0s — CG landing
const S3 = 300; // 10.0s — designation picker
const S4 = 360; // 12.0s — shop + product
const S5 = 300; // 10.0s — 60% strip
const S6 = 300; // 10.0s — team card
const S7 = 210; //  7.0s — end card
export const TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6 + S7; // 1950 = 65s

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const KenBurns: React.FC<{
  src: string;
  duration: number;
  fromScale?: number;
  toScale?: number;
  panX?: number;
  panY?: number;
}> = ({ src, duration, fromScale = 1.05, toScale = 1.15, panX = -20, panY = 0 }) => {
  const frame = useCurrentFrame();
  const t = easeInOut(Math.max(0, Math.min(1, frame / duration)));
  const scale = fromScale + (toScale - fromScale) * t;
  const x = panX * t;
  const y = panY * t;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: NAVY }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
          transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          transformOrigin: "center",
        }}
      />
    </AbsoluteFill>
  );
};

const useSceneOpacity = (duration: number, inF = 15, outF = 15) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, inF], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [duration - outF, duration], [1, 0], { extrapolateLeft: "clamp" });
  return Math.min(fadeIn, fadeOut);
};

const Caption: React.FC<{ text: string; sceneDuration: number }> = ({ text, sceneDuration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const y = interpolate(s, [0, 1], [40, 0]);
  const op = interpolate(s, [0, 1], [0, 1]);
  const progress = Math.max(0, Math.min(1, frame / sceneDuration));

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", pointerEvents: "none" }}>
      <div style={{ width: "100%", padding: "0 120px 90px", transform: `translateY(${y}px)`, opacity: op }}>
        <div
          style={{
            background: "rgba(19, 41, 75, 0.94)",
            borderLeft: `6px solid ${GOLD}`,
            borderRadius: 8,
            padding: "28px 36px 30px",
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            maxWidth: 1500,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontFamily: inter,
              color: "white",
              fontSize: 40,
              lineHeight: 1.25,
              fontWeight: 500,
              letterSpacing: -0.3,
            }}
          >
            {text}
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 999, marginTop: 22, overflow: "hidden" }}>
            <div style={{ width: `${progress * 100}%`, height: "100%", background: GOLD, borderRadius: 999 }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const BrandChip: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 60,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 18px",
        background: "rgba(19, 41, 75, 0.9)",
        borderRadius: 999,
        border: `1px solid rgba(255,255,255,0.15)`,
      }}
    >
      <div style={{ width: 10, height: 10, borderRadius: 999, background: GOLD }} />
      <div style={{ fontFamily: oswald, color: "white", fontSize: 22, fontWeight: 600, letterSpacing: 3 }}>
        FANPACT
      </div>
    </div>
  </AbsoluteFill>
);

const Highlight: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  delay?: number;
  label?: string;
}> = ({ x, y, w, h, delay = 0, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 120 } });
  const op = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 1], [0.9, 1]);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          height: h,
          border: `4px solid ${GOLD}`,
          borderRadius: 14,
          boxShadow: `0 0 0 6px rgba(186,117,23,0.18), 0 20px 60px rgba(0,0,0,0.35)`,
          opacity: op,
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      />
      {label && (
        <div
          style={{
            position: "absolute",
            left: x,
            top: y - 60,
            padding: "8px 16px",
            background: GOLD,
            color: NAVY,
            fontFamily: oswald,
            fontWeight: 700,
            letterSpacing: 2,
            fontSize: 22,
            borderRadius: 6,
            opacity: op,
            transform: `translateY(${(1 - scale) * 20}px)`,
          }}
        >
          {label}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------------- scenes (youth path only, Center Grove) ----------------

const Scene1: React.FC = () => {
  const op = useSceneOpacity(S1, 20, 20);
  const frame = useCurrentFrame();
  // Cross-dissolve homepage hero → youth-selector view around mid-scene
  const swap = interpolate(frame, [S1 * 0.55, S1 * 0.75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns src={staticFile("shots/01_home_hero.png")} duration={S1} fromScale={1.02} toScale={1.1} />
      <AbsoluteFill style={{ opacity: swap }}>
        <KenBurns src={staticFile("shots/03_home_youth.png")} duration={S1} fromScale={1.04} toScale={1.12} />
      </AbsoluteFill>
      <Caption text="Your league's own branded storefront." sceneDuration={S1} />
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const op = useSceneOpacity(S2, 20, 20);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns src={staticFile("shots/05_center_grove.png")} duration={S2} fromScale={1.05} toScale={1.15} panX={-20} />
      <Caption
        text="Every family picks their program — like Center Grove — and shops the purchases they already make."
        sceneDuration={S2}
      />
    </AbsoluteFill>
  );
};

const Scene3: React.FC = () => {
  const op = useSceneOpacity(S3, 20, 20);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns src={staticFile("shots/07_cg_orgs.png")} duration={S3} fromScale={1.04} toScale={1.14} panY={-30} />
      <Highlight x={260} y={620} w={860} h={430} delay={45} label="DESIGNATE A TEAM" />
      <Caption
        text="Designate exactly where it goes — a team, a club, or one specific athlete."
        sceneDuration={S3}
      />
    </AbsoluteFill>
  );
};

const Scene4: React.FC = () => {
  const op = useSceneOpacity(S4, 20, 20);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns src={staticFile("shots/09_cg_shop.png")} duration={S4} fromScale={1.05} toScale={1.18} panY={-40} />
      <Highlight x={1360} y={480} w={340} h={520} delay={60} label="+ CONTRIBUTION" />
      <Caption
        text="Groceries, pet supplies, home goods — the same brands, just through this storefront."
        sceneDuration={S4}
      />
    </AbsoluteFill>
  );
};

const Scene5: React.FC = () => {
  const op = useSceneOpacity(S5, 20, 20);
  const frame = useCurrentFrame();
  const bigNum = spring({ frame: frame - 30, fps: 30, config: { damping: 12, stiffness: 100 } });
  const numScale = interpolate(bigNum, [0, 1], [0.7, 1]);
  const numOp = interpolate(bigNum, [0, 1], [0, 1]);
  return (
    <AbsoluteFill style={{ opacity: op, background: CREAM }}>
      <KenBurns src={staticFile("shots/10_home_how.png")} duration={S5} fromScale={1.02} toScale={1.1} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(245,239,228,0.2) 0%, rgba(245,239,228,0.85) 55%, rgba(245,239,228,0.98) 100%)",
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", transform: `scale(${numScale})`, opacity: numOp }}>
          <div
            style={{
              fontFamily: oswald,
              fontSize: 380,
              fontWeight: 700,
              color: NAVY,
              lineHeight: 0.9,
              letterSpacing: -6,
            }}
          >
            60<span style={{ color: GOLD }}>%</span>
          </div>
          <div
            style={{
              fontFamily: inter,
              fontSize: 32,
              color: NAVY,
              marginTop: 12,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            of net earnings — routed weekly, verified through Stripe
          </div>
        </div>
      </AbsoluteFill>
      <Caption
        text="60% of net earnings routes automatically every week — no fundraiser required."
        sceneDuration={S5}
      />
    </AbsoluteFill>
  );
};

const Scene6: React.FC = () => {
  const op = useSceneOpacity(S6, 20, 20);
  const frame = useCurrentFrame();
  const tap = Math.sin((frame / 30) * Math.PI * 1.4) * 0.5 + 0.5;
  const tapScale = 1 + tap * 0.5;
  const tapOp = 0.6 - tap * 0.6;
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns src={staticFile("shots/11_home_card.png")} duration={S6} fromScale={1.05} toScale={1.15} panX={40} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-end", paddingRight: 320 }}>
        <div style={{ position: "relative", width: 260, height: 260 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `4px solid ${GOLD}`,
              transform: `scale(${tapScale})`,
              opacity: tapOp,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 60,
              borderRadius: "50%",
              border: `3px solid ${GOLD}`,
              transform: `scale(${1 + tap * 0.3})`,
              opacity: tapOp * 0.7,
            }}
          />
        </div>
      </AbsoluteFill>
      <Caption
        text="The FanPact Team Card — grandparents and neighbors tap to support that same player, anywhere."
        sceneDuration={S6}
      />
    </AbsoluteFill>
  );
};

const Scene7: React.FC = () => {
  const op = useSceneOpacity(S7, 20, 30);
  const frame = useCurrentFrame();
  const s = spring({ frame, fps: 30, config: { damping: 200 } });
  const titleY = interpolate(s, [0, 1], [30, 0]);
  const line2 = spring({ frame: frame - 20, fps: 30, config: { damping: 200 } });
  const line2Y = interpolate(line2, [0, 1], [30, 0]);
  const line3 = spring({ frame: frame - 40, fps: 30, config: { damping: 200 } });
  const line3Y = interpolate(line3, [0, 1], [30, 0]);
  const urlS = spring({ frame: frame - 70, fps: 30, config: { damping: 200 } });
  return (
    <AbsoluteFill
      style={{
        opacity: op,
        background: `radial-gradient(ellipse at center, #1a3663 0%, ${NAVY} 60%, #0a1730 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 60,
          height: 4,
          background: GOLD,
          borderRadius: 999,
          opacity: s,
        }}
      />
      <div
        style={{
          fontFamily: oswald,
          fontSize: 42,
          color: GOLD,
          letterSpacing: 8,
          fontWeight: 600,
          marginBottom: 40,
          opacity: s,
          transform: `translateY(${titleY}px)`,
        }}
      >
        FANPACT
      </div>
      <div
        style={{
          fontFamily: oswald,
          fontSize: 88,
          color: "white",
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.05,
          transform: `translateY(${titleY}px)`,
          opacity: s,
        }}
      >
        No extra cost.
      </div>
      <div
        style={{
          fontFamily: oswald,
          fontSize: 88,
          color: "white",
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.05,
          transform: `translateY(${line2Y}px)`,
          opacity: line2,
        }}
      >
        No behavior change.
      </div>
      <div
        style={{
          fontFamily: inter,
          fontSize: 40,
          color: "rgba(255,255,255,0.9)",
          marginTop: 36,
          fontWeight: 400,
          opacity: line3,
          transform: `translateY(${line3Y}px)`,
        }}
      >
        Just a different place to shop.
      </div>
      <div
        style={{
          fontFamily: inter,
          fontSize: 32,
          color: GOLD,
          marginTop: 70,
          fontWeight: 600,
          letterSpacing: 4,
          opacity: urlS,
          transform: `translateY(${interpolate(urlS, [0, 1], [20, 0])}px)`,
        }}
      >
        FANPACT.COM
      </div>
    </AbsoluteFill>
  );
};

// ---------------- root composition ----------------

export const MainVideo: React.FC = () => {
  const scenes: { dur: number; el: React.ReactNode; voice: string; voiceDelay?: number }[] = [
    { dur: S1, el: <Scene1 />, voice: "audio/vo1.mp3", voiceDelay: 18 },
    { dur: S2, el: <Scene2 />, voice: "audio/vo2.mp3", voiceDelay: 15 },
    { dur: S3, el: <Scene3 />, voice: "audio/vo3.mp3", voiceDelay: 15 },
    { dur: S4, el: <Scene4 />, voice: "audio/vo4.mp3", voiceDelay: 15 },
    { dur: S5, el: <Scene5 />, voice: "audio/vo5.mp3", voiceDelay: 15 },
    { dur: S6, el: <Scene6 />, voice: "audio/vo6.mp3", voiceDelay: 15 },
    { dur: S7, el: <Scene7 />, voice: "audio/vo7.mp3", voiceDelay: 10 },
  ];
  let from = 0;
  return (
    <AbsoluteFill style={{ background: NAVY, fontFamily: inter }}>
      {scenes.map((s, i) => {
        const seq = (
          <Sequence key={i} from={from} durationInFrames={s.dur}>
            {s.el}
            {i < scenes.length - 1 && <BrandChip />}
            <Sequence from={s.voiceDelay ?? 0}>
              <Audio src={staticFile(s.voice)} volume={1} />
            </Sequence>
          </Sequence>
        );
        from += s.dur;
        return seq;
      })}
    </AbsoluteFill>
  );
};
