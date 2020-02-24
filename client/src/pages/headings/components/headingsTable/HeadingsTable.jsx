import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
    array,
    func,
    number
} from "prop-types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    IconButton,
    Typography
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons';
import moment from "moment";
import Title from "../../../../components/title";
import {
    getHeadings,
    deleteHeading
} from "../../../../actions/headings";
import { menuClick } from "../../../../actions/menu";
import { EDIT_HEADINGS_PAGE_PATH } from "../../../../constants/router";
import ListItemLink from "../../../../components/listItemLink";
import Confirm from "../../../../components/confirm";
import { DELETE_HEADING_CONFIRMATION } from "../../../../constants/notifications";
import { IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT } from "../../../../constants/common";
import SortingHeader from "../../../../components/sortingHeader";
import PageTable from "../../../../components/pageTable";


const headCells = [
    { id: 'id', numeric: true, disablePadding: true, label: 'id' },
    { id: 'heading', numeric: false, disablePadding: true, label: 'Heading' },
    { id: 'createdAt', numeric: false, disablePadding: true, label: 'Creating Date' },
];

class HeadingsTable extends PageTable {

    intervalId;

    constructor(props) {
        super(props);

        const newState = merge(
            this.state,
            {
                openConfirm: false,
                headingId: undefined,
            }
        );

        this.state = newState;
    }

    componentDidMount() {
        this.getData({
            title: "Headings",
            getAll: this.props.getAllHeadings
        });
        this.intervalId = setInterval(this.getData.bind(this), IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
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

    disagreeHandler = () => {
        this.setState({openConfirm: false});
    };

    handleChangePage = (event, newPage) => {
        const {
            props: {
                getAllHeadings,
                getSearchString,
                getFilterString
            },
            state: {
                itemsPerPage,
                orderBy,
                order
            }
        } = this;

        const search = getSearchString();
        const filter = getFilterString();
        const offset = newPage * itemsPerPage;
        this.setState({currentPage: newPage});
        getAllHeadings({
            limit: itemsPerPage,
            offset,
            search,
            orderBy,
            order,
            filter
        });
    };

    handleChangeRowsPerPage = event => {
        const {
            props: {
                getAllHeadings,
                getSearchString,
                getFilterString
            },
            state: {
                orderBy,
                order
            }
        } = this;

        const newItemsPerPage = parseInt(event.target.value, 10);
        const search = getSearchString();
        const filter = getFilterString();
        const state = {
            itemsPerPage: newItemsPerPage,
            currentPage: 0
        };
        this.setState(state);
        getAllHeadings({
            limit: newItemsPerPage,
            offset: 0,
            search,
            orderBy,
            order,
            filter
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
                order
            }
        } = this;

        return(
            <Fragment>
                <Confirm
                    key={this.state.openConfirm}
                    message={DELETE_HEADING_CONFIRMATION}
                    title="Please, confirm"
                    isOpen={this.state.openConfirm}
                    agreeHandler={this.agreeHandler}
                    disagreeHandler={this.disagreeHandler}
                />
                <Title>Headings</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <SortingHeader
                                headCells={headCells}
                                orderBy={orderBy}
                                order={order}
                                sortHandler={this.sortHandler}
                            />
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
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
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={5}
                                count={total}
                                rowsPerPage={itemsPerPage}
                                page={currentPage}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Fragment>
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
    getAllHeadings: (options = {}) => {
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
