import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import type { Theme } from './types';

interface PXThemeProviderProps {
   children: React.ReactNode;
   theme: Theme;
}

const ThemeProvider = (props: PXThemeProviderProps) => {
   const { theme, children } = props;

   // Development environment checks for theme validity
   if (process.env.NODE_ENV !== 'production') {
      if (typeof theme === 'function') {
         throw new Error(
            [
               'PUI: You are providing a theme function prop to the ThemeProvider component:',
               '<ThemeProvider theme={outerTheme => outerTheme} />',
               '',
               'However, no outer theme is present.',
               'Make sure a theme is already injected higher in the React tree or provide a theme object.',
            ].join('\n'),
         );
      }

      if ((typeof theme === 'object' && !theme.__createdByCreateTheme) || !theme.__createdByCreateTheme) {
         throw new Error('PUI: Invalid theme provided to ThemeProvider. Theme must be created using createTheme().');
      }
   }

   return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

// Hook to access theme in components
const useTheme = (): Theme => {
   const theme = useContext(ThemeContext) as Theme;

   if (!theme) {
      throw new Error(
         'useTheme must be used within a ThemeProvider. ' + 'Make sure your component is wrapped with ThemeProvider.',
      );
   }

   return theme;
};

export { ThemeProvider, useTheme };
