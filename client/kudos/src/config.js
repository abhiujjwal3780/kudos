import React from 'react';

import { paths, ALL_ROLES } from "./utils";

const Home = React.lazy(() => import('./pages/home/Home'));
const CreateUser = React.lazy(() => import('./pages/create_user/CreateUser'));
const Login = React.lazy(() => import('./pages/login/Login'));
const CreateOrg = React.lazy(() => import('./pages/create_org/CreateOrg'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
export const menuItems = [
    {
        key: paths.home,
        label: 'Home',
        path: paths.home,
        requiredRoles: ALL_ROLES.user,
        element: <Home />
    },
    {
        key: paths.create_org,
        label: 'Create Org',
        path: paths.create_org,
        requiredRoles: ALL_ROLES.user,
        element: <CreateOrg />
    },
    {
        key: paths.create_user,
        label: 'Create User',
        path: paths.create_user,
        requiredRoles: ALL_ROLES.user,
        element: <CreateUser />
    },
    {
        key: paths.login,
        label: 'Login',
        path: paths.login,
        requiredRoles: ALL_ROLES.user,
        element: <Login />
    },
    {
        key: paths.dashboard,
        label: 'Dashboard',
        path: paths.dashboard,
        requiredRoles: ALL_ROLES.user,
        element: <Dashboard />
    },
];

