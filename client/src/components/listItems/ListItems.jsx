import React from 'react';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

import {
    Dashboard as DashboardIcon,
    ShoppingCart as ShoppingCartIcon,
    People as PeopleIcon,
    BarChart as BarChartIcon,
    Layers as LayersIcon,
} from '@material-ui/icons';
import { getMainMenuItems } from '../../utils/menuUtils';

const menuItems = getMainMenuItems();

export const mainListItems = (
    <div>
        {menuItems.map(item => (
            <ListItem button>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
            </ListItem>
        ))}
    </div>
);
