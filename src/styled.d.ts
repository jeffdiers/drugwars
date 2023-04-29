import "styled-components";
import { CSSObject } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      black: string;
      primary: string;
    };
    fonts: {
      primary: string;
    };
    fontSize: {
      regular: string;
      large: string;
    };
    borderRadius: string;
    media: Record<
      string | number,
      (l: FlattenSimpleInterpolation, ...p: any[]) => FlattenSimpleInterpolation
    >;
  }
}
