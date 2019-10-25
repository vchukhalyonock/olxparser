import React from "react";
import MenuItem from "./components/MenuItem";
import { getMainMenuItems } from '../../utils/menuUtils';

const menuItems = getMainMenuItems();

export default () => (<div>
    {menuItems.map(item => (
        <MenuItem key={item.name} item={item}/>
    ))}
</div>);
