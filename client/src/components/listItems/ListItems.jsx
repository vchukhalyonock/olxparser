import React from 'react';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

import { getMainMenuItems } from '../../utils/menuUtils';

const menuItems = getMainMenuItems();

export const mainListItems = (
    <div>
        {menuItems.map(item => (
            <ListItem key={item.name} button>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
            </ListItem>
        ))}
    </div>
);
