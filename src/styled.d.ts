import "styled-components";
import { CSSObject } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      black: string;
      primary: string;
      secondary: string;
    };
    fonts: {
      primary: string;
    };
    fontSize: {
      small: string;
      regular: string;
      medium: string;
      large: string;
    };
    borderRadius: string;
    media: Record<
      string | number,
      (l: FlattenSimpleInterpolation, ...p: any[]) => FlattenSimpleInterpolation
    >;
  }
}
