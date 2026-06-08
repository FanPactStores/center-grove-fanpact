import logoAsset from "@/assets/fanpact-logo.png.asset.json";

/**
 * FanPact pennant logo. The source PNG has an off-white background, so any
 * placement on a dark surface must use `pill` to keep the logo's background
 * blending into a white rounded container.
 */
export function FanPactLogo({
  height = 32,
  pill = false,
  pillPadding = "px-2 py-1",
  className = "",
  alt = "FanPact",
}: {
  height?: number;
  pill?: boolean;
  pillPadding?: string;
  className?: string;
  alt?: string;
}) {
  const img = (
    <img
      src={logoAsset.url}
      alt={alt}
      height={height}
      style={{ height, width: "auto" }}
      className={pill ? "block" : className}
    />
  );
  if (!pill) return img;
  return (
    <span
      className={`inline-flex items-center rounded-md bg-white ${pillPadding} ${className}`}
    >
      {img}
    </span>
  );
}
