import React from "react";
import Dashboard from "../screens/dashboard";
import Detail from "../screens/detail";

export const routes = [
    {path: "/", component: Dashboard, exact: true, params: {}},
    {path: "/detail/:id", component: Detail, exact: true, params: {}},
];