import React from "react";
import {
    IconButton,
    TableCell,
    Tooltip
} from "@material-ui/core";
import { EDIT_HEADINGS_PAGE_PATH } from "../../../../constants/router";
import ListItemLink from "../../../../components/listItemLink";
import {
    Delete as DeleteIcon,
    Edit as EditIcon
} from "@material-ui/icons";
import {
    func,
    object
} from "prop-types";

const HeadingsButtons = ({ item, deleteHandler }) => (
    <TableCell>
        <IconButton to={`${EDIT_HEADINGS_PAGE_PATH}/${item._id}`} component={ListItemLink}>
            <Tooltip title="Edit heading">
                <EditIcon />
            </Tooltip>
        </IconButton>
        <IconButton onClick={() => deleteHandler(item._id)}>
            <Tooltip title="Delete heading">
                <DeleteIcon />
            </Tooltip>
        </IconButton>
    </TableCell>
);

HeadingsButtons.propTypes = {
    item: object.isRequired,
    deleteHandler: func.isRequired
};


export default HeadingsButtons;
