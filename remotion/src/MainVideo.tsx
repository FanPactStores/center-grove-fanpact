import React from "react";
import {
  AbsoluteFill,
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
const CG_GOLD = "#C89A3C";

// scene durations at 30fps — synced to caption pacing (no VO)
const S1 = 450; // 15s — home hero → categories
const S2 = 390; // 13s — product grid
const S3 = 420; // 14s — 60% banner + org picker
const S4 = 300; // 10s — how it works 3-step
const S5 = 300; // 10s — community stats
const S6 = 600; // 20s — team card hero + steps + layers
const S7 = 300; // 10s — USAREC + sponsors
const S8 = 240; //  8s — footer / end card
export const TOTAL_FRAMES = S1 + S2 + S3 + S4 + S5 + S6 + S7 + S8; // 3000 = 100s

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const KenBurns: React.FC<{
  src: string;
  duration: number;
  fromScale?: number;
  toScale?: number;
  panX?: number;
  panY?: number;
  objectPosition?: string;
}> = ({
  src,
  duration,
  fromScale = 1.05,
  toScale = 1.15,
  panX = -20,
  panY = 0,
  objectPosition = "top center",
}) => {
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
  const fadeOut = interpolate(frame, [duration - outF, duration], [1, 0], {
    extrapolateLeft: "clamp",
  });
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
            borderLeft: `6px solid ${CG_GOLD}`,
            borderRadius: 8,
            padding: "30px 38px 32px",
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
              lineHeight: 1.28,
              fontWeight: 500,
              letterSpacing: -0.3,
            }}
          >
            {text}
          </div>
          <div
            style={{
              height: 3,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 999,
              marginTop: 22,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress * 100}%`,
                height: "100%",
                background: CG_GOLD,
                borderRadius: 999,
              }}
            />
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
      <div style={{ width: 10, height: 10, borderRadius: 999, background: CG_GOLD }} />
      <div style={{ fontFamily: oswald, color: "white", fontSize: 22, fontWeight: 600, letterSpacing: 3 }}>
        FANPACT · CENTER GROVE
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
}> = ({ x, y, w, h, delay = 0, label, color = CG_GOLD }) => {
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

// Two-shot crossfade helper for a scene
const CrossKen: React.FC<{
  a: string;
  b: string;
  duration: number;
  swapStart?: number;
  swapEnd?: number;
  aOpts?: Partial<React.ComponentProps<typeof KenBurns>>;
  bOpts?: Partial<React.ComponentProps<typeof KenBurns>>;
}> = ({ a, b, duration, swapStart, swapEnd, aOpts, bOpts }) => {
  const frame = useCurrentFrame();
  const start = swapStart ?? duration * 0.45;
  const end = swapEnd ?? duration * 0.65;
  const swap = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      <KenBurns src={a} duration={duration} fromScale={1.03} toScale={1.12} {...aOpts} />
      <AbsoluteFill style={{ opacity: swap }}>
        <KenBurns src={b} duration={duration} fromScale={1.04} toScale={1.14} {...bOpts} />
      </AbsoluteFill>
    </>
  );
};

// ---------------- scenes ----------------

// S1: home hero → categories
const Scene1: React.FC = () => {
  const op = useSceneOpacity(S1, 20, 20);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <CrossKen
        a={staticFile("shots/cg1_home_hero.png")}
        b={staticFile("shots/cg2_home_categories.png")}
        duration={S1}
        swapStart={S1 * 0.55}
        swapEnd={S1 * 0.75}
        aOpts={{ panY: -20 }}
        bOpts={{ panY: -40 }}
      />
      <Caption
        text="Your families already spend money every week on stuff they need anyway. Right now, that money goes to Amazon or Walmart, and your league sees none of it."
        sceneDuration={S1}
      />
    </AbsoluteFill>
  );
};

// S2: product grid
const Scene2: React.FC = () => {
  const op = useSceneOpacity(S2, 20, 20);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns
        src={staticFile("shots/cg3_shop_grid.png")}
        duration={S2}
        fromScale={1.04}
        toScale={1.16}
        panY={-40}
      />
      <Caption
        text="Your league gets its own version of that same store. Same brands, same prices. The only thing that changes is where they click buy."
        sceneDuration={S2}
      />
    </AbsoluteFill>
  );
};

// S3: 60% banner + org picker
const Scene3: React.FC = () => {
  const op = useSceneOpacity(S3, 20, 20);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <CrossKen
        a={staticFile("shots/cg4_home_60_banner.png")}
        b={staticFile("shots/cg5_home_orgs.png")}
        duration={S3}
        swapStart={S3 * 0.45}
        swapEnd={S3 * 0.65}
        aOpts={{ panY: -30 }}
        bOpts={{ panY: -30 }}
      />
      <Caption
        text="Every purchase automatically comes back, every week. Part to your league, part straight into that kid's own account."
        sceneDuration={S3}
      />
    </AbsoluteFill>
  );
};

// S4: How it works 3-step
const Scene4: React.FC = () => {
  const op = useSceneOpacity(S4, 20, 20);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns
        src={staticFile("shots/cg6_home_how.png")}
        duration={S4}
        fromScale={1.03}
        toScale={1.12}
        panY={-30}
      />
      <Caption
        text="No extra spending. No fundraiser. Just a different place to shop."
        sceneDuration={S4}
      />
    </AbsoluteFill>
  );
};

// S5: Community stats
const Scene5: React.FC = () => {
  const op = useSceneOpacity(S5, 20, 20);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns
        src={staticFile("shots/cg7_home_stats.png")}
        duration={S5}
        fromScale={1.04}
        toScale={1.14}
        panY={-20}
      />
      <Caption
        text="Real, ongoing money for your league. Every week, all season."
        sceneDuration={S5}
      />
    </AbsoluteFill>
  );
};

// S6: Team Card hero → steps → layers
const Scene6: React.FC = () => {
  const op = useSceneOpacity(S6, 20, 20);
  const frame = useCurrentFrame();
  const swap1 = interpolate(frame, [S6 * 0.32, S6 * 0.42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const swap2 = interpolate(frame, [S6 * 0.66, S6 * 0.76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <KenBurns
        src={staticFile("shots/cg8_teamcard_hero.png")}
        duration={S6}
        fromScale={1.03}
        toScale={1.1}
      />
      <AbsoluteFill style={{ opacity: swap1 }}>
        <KenBurns
          src={staticFile("shots/cg9_teamcard_steps.png")}
          duration={S6}
          fromScale={1.03}
          toScale={1.14}
          panY={-40}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: swap2 }}>
        <KenBurns
          src={staticFile("shots/cg10_teamcard_layers.png")}
          duration={S6}
          fromScale={1.03}
          toScale={1.14}
          panY={-40}
        />
      </AbsoluteFill>
      <Caption
        text="Grandparents, neighbors, anyone in the community can help too. Shop the platform, or link a card they already have."
        sceneDuration={S6}
      />
    </AbsoluteFill>
  );
};

// S7: USAREC banner + Sponsors page
const Scene7: React.FC = () => {
  const op = useSceneOpacity(S7, 20, 20);
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <CrossKen
        a={staticFile("shots/cg11_usarec.png")}
        b={staticFile("shots/cg12_sponsors.png")}
        duration={S7}
        swapStart={S7 * 0.5}
        swapEnd={S7 * 0.7}
        aOpts={{ panY: -20 }}
        bOpts={{ panY: -30 }}
      />
      <Caption
        text="Real companies pay real money to be part of something verified, not just a logo on a jersey."
        sceneDuration={S7}
      />
    </AbsoluteFill>
  );
};

// S8: End card
const Scene8: React.FC = () => {
  const op = useSceneOpacity(S8, 20, 30);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  const titleY = interpolate(s, [0, 1], [30, 0]);
  const line2 = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const line2Y = interpolate(line2, [0, 1], [30, 0]);
  const urlS = spring({ frame: frame - 60, fps, config: { damping: 200 } });
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
          background: CG_GOLD,
          borderRadius: 999,
          opacity: s,
        }}
      />
      <div
        style={{
          fontFamily: oswald,
          fontSize: 40,
          color: CG_GOLD,
          letterSpacing: 8,
          fontWeight: 600,
          marginBottom: 40,
          opacity: s,
          transform: `translateY(${titleY}px)`,
        }}
      >
        FANPACT · CENTER GROVE
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
        Nothing to buy. Nothing to install.
      </div>
      <div
        style={{
          fontFamily: oswald,
          fontSize: 88,
          color: CG_GOLD,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.05,
          marginTop: 10,
          transform: `translateY(${line2Y}px)`,
          opacity: line2,
        }}
      >
        Just shopping, in a different place.
      </div>
      <div
        style={{
          fontFamily: inter,
          fontSize: 30,
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
  const scenes: { dur: number; el: React.ReactNode }[] = [
    { dur: S1, el: <Scene1 /> },
    { dur: S2, el: <Scene2 /> },
    { dur: S3, el: <Scene3 /> },
    { dur: S4, el: <Scene4 /> },
    { dur: S5, el: <Scene5 /> },
    { dur: S6, el: <Scene6 /> },
    { dur: S7, el: <Scene7 /> },
    { dur: S8, el: <Scene8 /> },
  ];
  let from = 0;
  return (
    <AbsoluteFill style={{ background: NAVY, fontFamily: inter }}>
      {scenes.map((s, i) => {
        const seq = (
          <Sequence key={i} from={from} durationInFrames={s.dur}>
            {s.el}
            {i < scenes.length - 1 && <BrandChip />}
          </Sequence>
        );
        from += s.dur;
        return seq;
      })}
    </AbsoluteFill>
  );
};
