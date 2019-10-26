import React from "react";
import {
    Dashboard as DashboardIcon,
    List as ImportRequestsListIcon,
} from '@material-ui/icons';
import {
    DASHBOARD_PATH,
    IMPORT_REQUESTS_PAGE_PATH
} from "./router";



export const MAIN_MENU_ITEMS = [
    {
        name: 'Dashboard',
        path: DASHBOARD_PATH,
        icon: <DashboardIcon />
    },
    {
        name: 'Import Requests',
        path: IMPORT_REQUESTS_PAGE_PATH,
        icon: <ImportRequestsListIcon />
    }
];