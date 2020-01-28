import React from "react";
import {
    TableCell,
    TableSortLabel
} from "@material-ui/core";
import {
    string,
    array,
    func
} from "prop-types";

const SortingHeader = (props) => {

    const {
        headCells,
        orderBy,
        order,
        sortHandler
    } = props;

    return headCells
        .map(headCell => (
                <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={() => sortHandler(headCell.id)}
                    >
                        {headCell.label}
                    </TableSortLabel>
                </TableCell>
            ));
};

SortingHeader.propTypes = {
    headCells: array.isRequired,
    orderBy: string.isRequired,
    order: string.isRequired,
    sortHandler: func.isRequired
};

export default SortingHeader;