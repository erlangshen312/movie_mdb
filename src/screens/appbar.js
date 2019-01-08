import React, {Component} from 'react';
import {AppBar, Toolbar, IconButton, Icon, Typography, InputBase, Button} from "@material-ui/core";
import Search from "../component/search";

export default class Appbar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar className="appbar-style">
                        <Typography variant="h6" color="inherit">
                            Movie Store
                        </Typography>
                        <div>
                            <Button href="/" color="inherit">
                                Main
                            </Button>
                            <Button href="/about" color="inherit">
                                About
                            </Button>
                        </div>
                        <div className="appbar-search">
                            <Search/>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
