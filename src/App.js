import React, {Component} from 'react';
import Appbar from "./screens/appbar";
import {Grid} from "@material-ui/core";
import {Route, Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {routes} from "./config/route";

class App extends Component {
    render() {
        const AppRoute = ({component: Component, ...rest}) => {
            return <Route {...rest} render={(props) => {
                return <div>
                    <main>
                        <Component {...props} {...rest}/>
                    </main>
                </div>;
            }}/>
        };
        return (
            <div>
                <Appbar/>
                <Grid className="container app-body">
                    <Router history={createBrowserHistory()}>
                        <div>
                            {
                                routes && routes.map((route, index) => (
                                    <AppRoute key={index} path={route.path} exact={route.exact} {...this}
                                              component={route.component} params={route.params}/>

                                ))
                            }
                        </div>
                    </Router>
                </Grid>
            </div>
        );
    }
}

export default App;
