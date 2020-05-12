import React from "react";
import {
    Dashboard as DashboardIcon,
    List as ImportRequestsListIcon,
    AccountTree as HeadingsIcon,
    AddIcCall as CallcenterIRsIcon
} from '@material-ui/icons';
import {
    DASHBOARD_PATH,
    IMPORT_REQUESTS_PAGE_PATH,
    HEADINGS_PAGE_PATH,
    CALLCENTER_IMPORT_REQUESTS_PAGE_PATH
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
    },
    {
        name: 'Headings',
        path: HEADINGS_PAGE_PATH,
        icon: <HeadingsIcon />
    },
    {
        name: 'Call-center IRs',
        path: CALLCENTER_IMPORT_REQUESTS_PAGE_PATH,
        icon: <CallcenterIRsIcon />
    }
];