import React from "react";
import {
    IconButton,
    TableCell,
    Tooltip
} from "@material-ui/core";
import {
    EDIT_IMPORT_REQUEST_PAGE_PATH,
    OFFERS_PAGE_PATH
} from "../../../../constants/router";
import ListItemLink from "../../../../components/listItemLink";
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Info as InfoIcon
} from "@material-ui/icons";
import {
    func,
    object
} from "prop-types";

const ImportRequestButtons = ({
    item,
    deleteHandler,
    renderStatus
}) => (
    <TableCell>
        <IconButton to={`${OFFERS_PAGE_PATH}/${item._id}`} component={ListItemLink}>
            <Tooltip title="Show Offers">
                <InfoIcon />
            </Tooltip>
        </IconButton>
        <IconButton to={`${EDIT_IMPORT_REQUEST_PAGE_PATH}/${item._id}`} component={ListItemLink}>
            <Tooltip title="Edit Import Request">
                <EditIcon />
            </Tooltip>
        </IconButton>
        <IconButton onClick={() => deleteHandler(item._id)}>
            <Tooltip title="Delete Import Request">
                <DeleteIcon />
            </Tooltip>
        </IconButton>
        {renderStatus(item._id, item.status, item.errorMessage)}
    </TableCell>
);

ImportRequestButtons.propTypes = {
    item: object.isRequired,
    deleteHandler: func.isRequired,
    renderStatus: func.isRequired
};

export default ImportRequestButtons;
