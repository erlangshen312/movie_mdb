import {createMuiTheme} from "@material-ui/core";

const breakpoints = createMuiTheme({typography: {useNextVariants: true}}).breakpoints;

const overrides = {
    MuiIconButton: {
        root: {
            padding: 8,
        }
    },
    MuiBadge: {
        badge: {
            width: 18,
            height: 18,
            lineHeight: '1'
        }
    },
    MuiListItemIcon: {
        root: {
            marginRight: 10
        }
    },
    MuiTypography: {
        h6: {
            lineHeight: "1.45rem"
        }
    },
    MuiList: {
        padding: {
            paddingTop: 0,
            paddingBottom: 0
        }
    },
    MuiListItem: {
        root: {
            paddingTop: 7,
            paddingBottom: 7
        }
    },
    MuiCard: {
        root: {
            position: 'relative'
        }
    },
    MuiCardContent: {
        root: {
            [breakpoints.up("sm")]: {
                paddingLeft: 16,
                paddingRight: 16
            },
            wordBreak: "break-word"
        }
    },
    MuiCardActionArea: {
        root: {
            '&:hover': {
                textDecoration: 'none'
            }
        }
    },
};

export default overrides;
