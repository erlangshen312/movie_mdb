import React, {Component} from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

export default class Appbar extends Component {
    render() {
        console.log({...this});

        return (
            <div>
                <AppBar position="static">
                    <Toolbar className="appbar-style">
                        <Typography variant="h6" color="inherit">
                            <Link to={"/"}>
                                Movie Store
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
