import { makeStyles, Theme } from '@material-ui/core/styles';


export const useContainerStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 3px 6px 0 rgba(0,0,0,.2)',
        borderRadius: 5
    },
    currentConditionsBorder: {
        border: `1px solid ${theme.borders.containers}`
    }
}));

export const useProperBackground = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    shadow: {
        boxShadow: '0 3px 6px 0 rgba(0,0,0,.2)',
        borderRadius: 5
    },
    separatorBorderRight: {
        borderRight: `1px solid ${theme.palette.divider}`
    },
    circleGraphFillSecondary: {
        fill: theme.palette.secondary.main
    },
    circleGraphStroke: {
        stroke: theme.palette.secondary.main
    },
    circleGraphFillingPrimary: {
        fill: theme.palette.primary.main
    },
    strokeFillTextPrimary: {
        stroke: theme.palette.text.primary,
        fill: theme.palette.text.primary
    },
    gaugeCircle: {
        stroke: theme.palette.primary.main,
        fill: theme.palette.background.paper
    }
}));

export const useWarningStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: '#a53636',
        color: theme.palette.error.contrastText
    }
}));
