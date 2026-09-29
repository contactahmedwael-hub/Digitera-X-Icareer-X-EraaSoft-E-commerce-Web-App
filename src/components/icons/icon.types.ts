import type { SVGProps } from "react";

/**
 * Every icon in this project is hand-drawn SVG — no icon library.
 * Icons inherit colour from `currentColor` and size from the `size` prop.
 */
export type IconProps = Omit<SVGProps<SVGSVGElement>, "width" | "height"> & {
  size?: number;
};

export const iconDefaults = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
