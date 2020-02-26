import React from "react";
import {
    Checkbox,
    Link,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";
import {
    array,
    func
} from "prop-types";
import { HEAD_CELL_TYPE } from "../../constants/common";
import moment from "moment";

const PageTableContent = props => {
    const {
        data,
        isSelected,
        headCells,
        checkBoxHandler,
        buttonsComponent
    } = props;

    return data.map((item, index) => {
        const isItemSelected = isSelected && isSelected(item._id);

        return (
            <TableRow key={index}>
                {headCells.map((cell, index) => (<TableCell
                        key={index}
                        padding={cell.type === HEAD_CELL_TYPE.CHECKBOX ? "checkbox" : "default"}
                    >
                        {cell.type === HEAD_CELL_TYPE.CHECKBOX && (
                            <Checkbox
                                checked={isItemSelected}
                                onChange={() => checkBoxHandler(item[cell.id])}
                            />)}
                        {cell.type === HEAD_CELL_TYPE.LINK && (
                            <Typography>
                                <Link href={item[cell.id]} target='_blank'>
                                    {item[cell.id]}
                                </Link>
                            </Typography>)}

                        {cell.type === HEAD_CELL_TYPE.TEXT && (
                            <Typography>
                                {item[cell.id]}
                            </Typography>)}


                        {cell.type === HEAD_CELL_TYPE.DATE && (
                            <Typography>
                                {moment(item[cell.id]).format("DD-MM-YYYY HH:mm")}
                            </Typography>
                        )}

                        {cell.type === HEAD_CELL_TYPE.IMAGE
                        && item.srcImages
                        && item.srcImages.length > 0
                        && <img src={item.srcImages[0]} width="50px" alt={item.title}/>
                        }
                    </TableCell>)
                )}
                {buttonsComponent(
                    {
                        item,
                        ...props
                    })}
            </TableRow>
        );
    });
}

PageTableContent.propTypes = {
    data: array.isRequired,
    isSelected: func,
    headCells: array.isRequired,
    checkBoxHandler: func,
    buttonsComponent: func
};


export default PageTableContent;
