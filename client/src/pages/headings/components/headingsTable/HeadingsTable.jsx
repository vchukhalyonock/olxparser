import React from "react";
import { connect } from "react-redux";
import {
    array,
    func,
    number
} from "prop-types";
import { merge } from "lodash";
import {
    TableCell,
    TableRow,
    IconButton,
    Typography
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons';
import moment from "moment";
import {
    getHeadings,
    deleteHeading
} from "../../../../actions/headings";
import { menuClick } from "../../../../actions/menu";
import { EDIT_HEADINGS_PAGE_PATH } from "../../../../constants/router";
import ListItemLink from "../../../../components/listItemLink";
import { DELETE_HEADING_CONFIRMATION } from "../../../../constants/notifications";
import { IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT } from "../../../../constants/common";
import { PageTable, PageTableContainer } from "../../../../components/pageTable";


const headCells = [
    { id: 'id', numeric: true, disablePadding: true, label: 'id' },
    { id: 'heading', numeric: false, disablePadding: true, label: 'Heading' },
    { id: 'createdAt', numeric: false, disablePadding: true, label: 'Creating Date' },
];

class HeadingsTable extends PageTable {

    constructor(props) {
        super(props);

        const newState = merge(
            this.state,
            {
                headingId: undefined,
            }
        );

        this.state = newState;
    }

    componentDidMount() {
        this.getData({
            pageTitle: "Headings",
            getAll: this.props.getAll
        });
        this.intervalId = setInterval(
            this.getData.bind(
                this,
                {
                    pageTitle: "Headings",
                    getAll: this.props.getAll
                }
            ), IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT);
    }

    handleDeleteHeading = headingId => {
        this.setState({
            openConfirm: true,
            headingId
        })
    };

    agreeHandler = () => {
        this.props.onDeleteHeading(this.state.headingId);
        this.setState({
            openConfirm: false,
            headingId: undefined
        });
    };

    render() {
        const {
            props: {
                headings,
                total
            },
            state: {
                itemsPerPage,
                currentPage,
                orderBy,
                order,
                openConfirm
            }
        } = this;

        return(
            <PageTableContainer
                openConfirm={openConfirm}
                confirmMessage={DELETE_HEADING_CONFIRMATION}
                agreeHandler={this.agreeHandler}
                disagreeHandler={this.disagreeHandler}
                tableTitle="Headings"
                headCells={headCells}
                orderBy={orderBy}
                order={order}
                sortHandler={this.sortHandler}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                total={total}
                >
                        {headings.map(item => (
                            <TableRow key={item._id}>
                                <TableCell>
                                    <Typography>
                                        {item._id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {item.heading}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {moment(item.createdAt).format( "DD-MM-YYYY HH:mm")}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton to={`${EDIT_HEADINGS_PAGE_PATH}/${item._id}`} component={ListItemLink}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => this.handleDeleteHeading(item._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
            </PageTableContainer>
        );
    }
}

HeadingsTable.propTypes = {
    headings: array.isRequired,
    total: number.isRequired,
    getSearchString: func.isRequired,
    getFilterString: func.isRequired
};

HeadingsTable.defaultProps = {
    headings: [],
    total: 0
};

const mapStateToProps = state => ({
   headings: state.headings.list.items,
   total: state.headings.list.total
});

const mapDispatchToProps = dispatch => ({
    getAll: (options = {}) => {
        dispatch(getHeadings(options))
    },
    onDeleteHeading: headingId => {
        dispatch(deleteHeading(headingId));
    },
    onCreateTitle: title => {
        dispatch(menuClick(title));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(HeadingsTable);
