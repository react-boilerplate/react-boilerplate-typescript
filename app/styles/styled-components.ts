import * as styledComponents from 'styled-components';

// theme.ts
// your theme variables
export interface IThemeInterface {
  primary: string;
  componentBackground: string;
  componentBackgroundSecondary: string;
}

export const theme = {
  default: {
    primary: '#fff',
    componentBackground: '#fff',
    componentBackgroundSecondary: '#fff',
  },
};
const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
