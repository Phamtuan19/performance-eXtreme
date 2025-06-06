import { merge } from 'lodash';
import React from 'react';

import { getTheme } from '@pui/theme';
import { cn } from '@pui/core';

import { TypographyStyled } from './typography.styled';
import type { PXComponentTypography, TypographyProps } from './typography.type';

export const TYPOGRAPHY_DEFAULT_PROPS: PXComponentTypography['defaultProps'] = {
   variant: 'h1',
   strong: false,
   underline: false,
   delete: false,
   italic: false,
   color: 'default',
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => {
   const theme = getTheme();

   const PXTypography = theme.components?.PXTypography?.defaultProps;

   const {
      component,
      variant,
      className,
      children,
      sx,
      underline,
      delete: deleteProp,
      italic,
      strong,
      color,
      ...resProps
   } = merge({}, TYPOGRAPHY_DEFAULT_PROPS, PXTypography, props);

   // Placeholder for separateProps functionality
   const styleProps = { sx };
   const remainingProps = resProps;

   return (
      <TypographyStyled
         ref={ref}
         as={component || variant}
         {...remainingProps}
         className={cn('px-typography', `px-typography-${variant}`, className)}
         $styleProps={{ ...styleProps, sx, variant, underline, delete: deleteProp, italic, strong, color }}
      >
         {children}
      </TypographyStyled>
   );
});

Typography.displayName = 'PXTypography';

export default Typography;
