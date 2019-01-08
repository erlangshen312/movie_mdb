import React, {Component} from 'react';
import Appbar from "./screens/appbar";
import {Grid} from "@material-ui/core";
import {Route, Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {routes} from "./config/route";


const history = createBrowserHistory();

history.listen((location) => {
    if (location.action === 'POP') {
        return;
    }
    if (location.pathname !== "/") window.scrollTo(0, 0);
});

class App extends Component {
    render() {
        const AppRoute = ({component: Component, ...rest}) => {
            return <Route {...rest} render={(props) => {
                return <div>
                    <Appbar/>
                    <Grid className="container app-body">
                        <main>
                            <Component {...props} {...rest}/>
                        </main>
                    </Grid>
                </div>;
            }}/>
        };
        return <Router history={history}>
            <div>
                {
                    routes && routes.map((route, index) => (
                        <AppRoute key={index}
                                  path={route.path}
                                  exact={route.exact}
                                  {...this}
                                  component={route.component}
                                  params={route.params}
                        />
                    ))
                }
            </div>
        </Router>;
    }
}

export default App;
