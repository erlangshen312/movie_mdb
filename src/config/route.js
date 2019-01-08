import Dashboard from "../screens/dashboard";
import Detail from "../screens/detail";
import Search from "../component/search";

export const routes = [
    {path: "/", component: Dashboard, exact: true, params: {}},
    {path: "/page/:page", component: Dashboard, exact: true, params: {}},
    {path: "/search", component: Search, exact: true, params: {}},
    {path: "/detail/:id", component: Detail, exact: true, params: {}},
];