import type { FlattenSimpleInterpolation } from "styled-components";
import { css } from "styled-components";

interface MediaQueryProps {
  [key: string]: any;
}
const breakpoints: MediaQueryProps = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
};

export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (literals: FlattenSimpleInterpolation) => css`
    @media (min-width: ${breakpoints[label]}px) {
      ${literals};
    }
  `;
  return acc;
}, {} as Record<keyof typeof breakpoints, (l: FlattenSimpleInterpolation, ...p: any[]) => FlattenSimpleInterpolation>);
