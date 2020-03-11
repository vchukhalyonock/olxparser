import React from "react";
import {
    IconButton,
    TableCell,
    Tooltip
} from "@material-ui/core";
import {
    EDIT_OFFERS_PAGE_PATH,
    OFFER_DETAILS_PATH
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

const OffersButtons = ({
    item,
    deleteHandler
}) => (
    <TableCell>
        <IconButton to={`${OFFER_DETAILS_PATH}/${item._id}`} component={ListItemLink}>
            <Tooltip title="Offer details">
                <InfoIcon />
            </Tooltip>
        </IconButton>
        <IconButton to={`${EDIT_OFFERS_PAGE_PATH}/${item._id}`} component={ListItemLink}>
            <Tooltip title="Edit offer">
                <EditIcon />
            </Tooltip>
        </IconButton>
        <IconButton onClick={() => deleteHandler(item._id)}>
            <Tooltip title="Delete offer">
                <DeleteIcon />
            </Tooltip>
        </IconButton>
    </TableCell>
);

OffersButtons.propTypes = {
    item: object.isRequired,
    deleteHandler: func.isRequired
};

export default OffersButtons;
