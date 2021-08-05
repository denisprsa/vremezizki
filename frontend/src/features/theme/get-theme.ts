import { unstable_createMuiStrictModeTheme as createMuiTheme, Theme } from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    borders: {
      containers: React.CSSProperties['color'],
    }
  }
  interface ThemeOptions {
    borders: {
      containers: React.CSSProperties['color']
    }
  }
}

export function getTheme(isDark: boolean): Theme {
  if (isDark) {
    return createMuiTheme({
      borders: {
        containers: 'transparent'
      },
      typography: {
        fontFamily: '"PT Sans", sans-serif'
      },
      palette: {
        type: 'dark',
        primary: {
          main: blue[500]
        },
        secondary: {
          main: grey[300]
        }
      },
            
    });
  }
  return createMuiTheme({
    borders: {
      containers: '#c6d2e1'
    },
    typography: {
      fontFamily: '"PT Sans", sans-serif'
    },
    palette: {
      type: 'light',
      primary: {
        main: blue[500]
      },
      secondary: {
        main: grey[400]
      }
    }
  });
}
