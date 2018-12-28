import React, {Component} from 'react';
import Dashboard from "./screens/dashboard";
import Appbar from "./screens/appbar";
import {Grid} from "@material-ui/core";

class App extends Component {
    render() {
        return (
            <div>
                <Appbar/>
                <div>
                    <Dashboard/>
                </div>
            </div>
        );
    }
}

export default App;
