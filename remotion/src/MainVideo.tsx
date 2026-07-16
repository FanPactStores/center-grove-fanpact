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
const BUTLER_BLUE = "#13B5EA";

// scene durations at 30fps — tuned to VO clip lengths with breathing room
const S1 = 255; //  8.5s — Butler home hero + stats  (VO 6.9s)
const S2 = 330; // 11.0s — shop → product → cart      (VO 9.8s)
const S3 = 300; // 10.0s — sponsors grid              (VO 8.9s)
const S4 = 780; // 26.0s — Edward Jones 3-step flow   (VO 25.0s)
const S5 = 300; // 10.0s — disclaimer zoom            (VO 8.7s)
const S6 = 480; // 16.0s — FMV callout                (VO 14.6s)
const S7 = 225; //  7.5s — end card                   (VO 6.4s)
export const TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6 + S7; // 2670 = 89s

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const KenBurns: React.FC<{
  src: string;
  duration: number;
  fromScale?: number;
  toScale?: number;
  panX?: number;
  panY?: number;
  objectPosition?: string;
}> = ({ src, duration, fromScale = 1.05, toScale = 1.15, panX = -20, panY = 0, objectPosition = "top center" }) => {
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
          objectPosition,
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
              fontSize: 38,
              lineHeight: 1.28,
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
  color?: string;
}> = ({ x, y, w, h, delay = 0, label, color = GOLD }) => {
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
          border: `4px solid ${color}`,
          borderRadius: 14,
          boxShadow: `0 0 0 6px ${color}30, 0 20px 60px rgba(0,0,0,0.35)`,
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
            background: color,
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

// ---------------- scenes (collegiate — Butler only) ----------------

// S1: Butler home hero → stats
const Scene1: React.FC = () => {
  const op = useSceneOpacity(S1, 20, 20);
  const frame = useCurrentFrame();
  const swap = interpolate(frame, [S1 * 0.5, S1 * 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns src={staticFile("shots/c1_butler_home.png")} duration={S1} fromScale={1.02} toScale={1.1} />
      <AbsoluteFill style={{ opacity: swap }}>
        <KenBurns
          src={staticFile("shots/c2_butler_home_stats.png")}
          duration={S1}
          fromScale={1.04}
          toScale={1.12}
          panY={-30}
        />
      </AbsoluteFill>
      <Highlight x={355} y={425} w={790} h={135} delay={S1 * 0.55} color={BUTLER_BLUE} label="$127,450 EARNED" />
      <Caption
        text="This is the Butler FanPact storefront — where every purchase generates verified NIL support."
        sceneDuration={S1}
      />
    </AbsoluteFill>
  );
};

// S2: shop grid → product card
const Scene2: React.FC = () => {
  const op = useSceneOpacity(S2, 20, 20);
  const frame = useCurrentFrame();
  const swap = interpolate(frame, [S2 * 0.5, S2 * 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns src={staticFile("shots/c4_butler_shop_grid.png")} duration={S2} fromScale={1.03} toScale={1.12} panY={-20} />
      <AbsoluteFill style={{ opacity: swap }}>
        <KenBurns src={staticFile("shots/c5_butler_product.png")} duration={S2} fromScale={1.04} toScale={1.14} />
      </AbsoluteFill>
      <Caption
        text="Fans shop the same everyday brands they already buy — every purchase is a documented, attributable transaction."
        sceneDuration={S2}
      />
    </AbsoluteFill>
  );
};

// S3: sponsors grid
const Scene3: React.FC = () => {
  const op = useSceneOpacity(S3, 20, 20);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns src={staticFile("shots/c7_butler_sponsors_grid.png")} duration={S3} fromScale={1.03} toScale={1.12} panY={-30} />
      <Caption
        text="Enterprise partners are already here. Four premier partners are live on this one storefront alone."
        sceneDuration={S3}
      />
    </AbsoluteFill>
  );
};

// S4: Edward Jones 3-step flow
const Scene4: React.FC = () => {
  const op = useSceneOpacity(S4, 20, 20);
  const frame = useCurrentFrame();
  // Cross-dissolve from hero into the steps view mid-scene
  const swap = interpolate(frame, [90, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns src={staticFile("shots/c8_edward_jones_hero.png")} duration={S4} fromScale={1.03} toScale={1.1} />
      <AbsoluteFill style={{ opacity: swap }}>
        <KenBurns src={staticFile("shots/c9_edward_jones_steps.png")} duration={S4} fromScale={1.03} toScale={1.15} panY={-60} />
      </AbsoluteFill>
      {/* Staggered highlights over each step card */}
      <Highlight x={352} y={624} w={355} h={315} delay={210} label="STEP 1 · $75" />
      <Highlight x={782} y={624} w={355} h={315} delay={330} label="STEP 2 · $175" />
      <Highlight x={1215} y={624} w={355} h={315} delay={450} label="STEP 3 · $250" />
      <Caption
        text="Every step is a trigger event — schedule a consultation, meet an advisor, open an account. Each one verified. Each one worth a specific credit."
        sceneDuration={S4}
      />
    </AbsoluteFill>
  );
};

// S5: disclaimer zoom
const Scene5: React.FC = () => {
  const op = useSceneOpacity(S5, 20, 20);
  const frame = useCurrentFrame();
  const t = easeInOut(Math.max(0, Math.min(1, frame / S5)));
  const scale = 1.4 + t * 0.15;
  return (
    <AbsoluteFill style={{ opacity: op, background: NAVY }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("shots/c10_edward_jones_disclaimer.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 42%",
            transform: `scale(${scale})`,
            transformOrigin: "center 45%",
          }}
        />
      </AbsoluteFill>
      {/* Subtle vignette to focus the eye */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center 45%, rgba(0,0,0,0) 20%, rgba(19,41,75,0.55) 65%, rgba(19,41,75,0.9) 100%)",
        }}
      />
      <Highlight x={430} y={470} w={1060} h={130} delay={30} />
      <Caption
        text="Every credit only pays out on verified completion. That's real return on investment — not an estimate."
        sceneDuration={S5}
      />
    </AbsoluteFill>
  );
};

// S6: FMV callout — Stripe / timestamp / auditable
const Scene6: React.FC = () => {
  const op = useSceneOpacity(S6, 20, 20);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = spring({ frame: frame - 20, fps, config: { damping: 18, stiffness: 100 } });
  const badgeY = interpolate(badge, [0, 1], [40, 0]);

  const chip = (delay: number) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 20 } });
    return {
      opacity: s,
      transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px) scale(${interpolate(s, [0, 1], [0.94, 1])})`,
    };
  };

  return (
    <AbsoluteFill style={{ opacity: op, background: NAVY }}>
      {/* animated grid backdrop */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 30% 20%, #1e3a6b 0%, ${NAVY} 55%, #0a1730 100%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.08 }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 160px" }}>
        <div style={{ textAlign: "center", opacity: badge, transform: `translateY(${badgeY}px)` }}>
          <div
            style={{
              fontFamily: oswald,
              color: GOLD,
              letterSpacing: 8,
              fontSize: 26,
              fontWeight: 600,
              marginBottom: 28,
            }}
          >
            FAIR MARKET VALUE · ON RECORD
          </div>
          <div
            style={{
              fontFamily: oswald,
              color: "white",
              fontSize: 108,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
            }}
          >
            Every transaction:
          </div>
          <div
            style={{
              fontFamily: oswald,
              color: GOLD,
              fontSize: 108,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              marginTop: 6,
            }}
          >
            timestamped. priced. auditable.
          </div>
        </div>

        <div style={{ display: "flex", gap: 22, marginTop: 90 }}>
          {[
            { label: "STRIPE", delay: 90 },
            { label: "TIMESTAMP", delay: 115 },
            { label: "VERIFIED PRICE", delay: 140 },
            { label: "NIL COMPLIANCE READY", delay: 165 },
          ].map((c) => (
            <div
              key={c.label}
              style={{
                ...chip(c.delay),
                padding: "16px 26px",
                border: `2px solid ${GOLD}`,
                borderRadius: 999,
                background: "rgba(186,117,23,0.1)",
                fontFamily: oswald,
                color: "white",
                fontWeight: 600,
                letterSpacing: 3,
                fontSize: 22,
              }}
            >
              {c.label}
            </div>
          ))}
        </div>
      </AbsoluteFill>
      <Caption
        text="Every transaction runs through Stripe with a timestamp and a verified price — a fair market value record NIL compliance actually needs."
        sceneDuration={S6}
      />
    </AbsoluteFill>
  );
};

// S7: end card
const Scene7: React.FC = () => {
  const op = useSceneOpacity(S7, 20, 30);
  const frame = useCurrentFrame();
  const s = spring({ frame, fps: 30, config: { damping: 200 } });
  const titleY = interpolate(s, [0, 1], [30, 0]);
  const line2 = spring({ frame: frame - 20, fps: 30, config: { damping: 200 } });
  const line2Y = interpolate(line2, [0, 1], [30, 0]);
  const urlS = spring({ frame: frame - 60, fps: 30, config: { damping: 200 } });
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
          marginBottom: 44,
          opacity: s,
          transform: `translateY(${titleY}px)`,
        }}
      >
        FANPACT
      </div>
      <div
        style={{
          fontFamily: oswald,
          fontSize: 96,
          color: "white",
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.05,
          transform: `translateY(${titleY}px)`,
          opacity: s,
        }}
      >
        Verified commerce,
      </div>
      <div
        style={{
          fontFamily: oswald,
          fontSize: 96,
          color: GOLD,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.05,
          transform: `translateY(${line2Y}px)`,
          opacity: line2,
        }}
      >
        for every side of the transaction.
      </div>
      <div
        style={{
          fontFamily: inter,
          fontSize: 32,
          color: "rgba(255,255,255,0.75)",
          marginTop: 70,
          fontWeight: 500,
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
    { dur: S1, el: <Scene1 />, voice: "audio/b1.mp3", voiceDelay: 18 },
    { dur: S2, el: <Scene2 />, voice: "audio/b2.mp3", voiceDelay: 15 },
    { dur: S3, el: <Scene3 />, voice: "audio/b3.mp3", voiceDelay: 15 },
    { dur: S4, el: <Scene4 />, voice: "audio/b4.mp3", voiceDelay: 18 },
    { dur: S5, el: <Scene5 />, voice: "audio/b5.mp3", voiceDelay: 15 },
    { dur: S6, el: <Scene6 />, voice: "audio/b6.mp3", voiceDelay: 18 },
    { dur: S7, el: <Scene7 />, voice: "audio/b7.mp3", voiceDelay: 10 },
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
