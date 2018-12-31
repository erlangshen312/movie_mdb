import React, {Component} from 'react';
import {AppBar, Toolbar, IconButton, Icon, Typography, InputBase} from "@material-ui/core";
import {
    URL_LIST,
    URL_SEARCH,
    URL_DETAIL,
    URL_PERSON,
    URL_CAST,
    URL_VIDEO,
    API_KEY,
    API_KEY_ALT,
    LANG_EN
} from '../const';

export default class Appbar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar className="appbar-style">
                        <Typography variant="h6" color="inherit">
                            Movie Store
                        </Typography>
                        <div className="appbar-search">
                            <InputBase
                                placeholder="Search…"
                            />
                            <IconButton>
                                <Icon>search</Icon>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
