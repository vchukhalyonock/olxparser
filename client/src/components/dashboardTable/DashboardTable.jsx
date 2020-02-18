import React, { Fragment } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Link,
    Tooltip,
} from '@material-ui/core';
import {
    Error as ErrorIcon,
} from '@material-ui/icons';
import Title from "../title";
import {
    array,
    string
} from "prop-types";
import { REQUEST_STATUS } from "../../constants/statuses";

export const HEADER_TYPES = {
    DEFAULT: 'DEFAULT',
    LINK: 'LINK',
    INFO: 'INFO'
};

export default function DashboardTable({
    title,
    header,
    data
}) {
    return (
        <Fragment>
            <Title>{title}</Title>
            <Table>
                <TableHead>
                    <TableRow>
                        {header.map((item, index) => (
                            <TableCell key={index}>
                                {item.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item,index) => (
                        <TableRow key={index}>
                            {header.map(({ type, id }, headIndex) => (
                                <TableCell key={headIndex}>
                                    <Typography>
                                        {type === HEADER_TYPES.LINK && (
                                            <Link href={item[id]} target='_blank'>
                                                {item[id]}
                                            </Link>
                                        )}
                                        {type === HEADER_TYPES.DEFAULT && item[id]}
                                        {(type === HEADER_TYPES.INFO && item.status === REQUEST_STATUS.ERROR)&& (
                                            <Tooltip title={item[id]}>
                                                <ErrorIcon />
                                            </Tooltip>
                                        )}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    );
};

DashboardTable.propTypes = {
    title: string.isRequired,
    header: array.isRequired,
    data: array.isRequired
};
