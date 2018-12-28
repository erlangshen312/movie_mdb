import React, {Component} from 'react';
import {AppBar, Toolbar, IconButton, Icon, Typography, Button} from "@material-ui/core";

export default class Appbar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu">
                            <Icon>menu</Icon>
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
