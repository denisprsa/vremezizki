import { createMuiTheme } from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';

export function getTheme(isDark: boolean) {
    if (isDark) {
        return createMuiTheme({
            typography: {
                fontFamily: '"Open Sans", sans-serif'
            },
            palette: {
                type: 'dark',
                primary: {
                    main: blue[900]
                },
                secondary: {
                    main: grey[300]
                }
            },
            
        });
    } 
    return createMuiTheme({
        typography: {
            fontFamily: '"Open Sans", sans-serif'
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
