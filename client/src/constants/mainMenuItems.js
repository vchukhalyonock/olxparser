import React from "react";
import {
    Dashboard as DashboardIcon,
    List as ImportRequestsListIcon,
} from '@material-ui/icons';



export const MAIN_MENU_ITEMS = [
    {
        name: 'Dashboard',
        path: '/',
        icon: <DashboardIcon />
    },
    {
        name: 'Import Requests',
        path: '/import-requests',
        icon: <ImportRequestsListIcon />
    }
];