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
    CircularProgress,
    Typography,
    Link,
    Tooltip
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Queue as QueueIcon,
    PauseCircleOutline as PendingIcon,
    Error as ErrorIcon,
    DoneAll as DoneIcon,
    Info as InfoIcon
} from '@material-ui/icons';
import moment from "moment";
import { merge } from "lodash";
import Title from "../../../../components/title";
import {
    getImportRequests,
    deleteImportRequest,
    updateImportRequestStatus
} from "../../../../actions/importRequests";
import { menuClick } from "../../../../actions/menu";
import {
    EDIT_IMPORT_REQUEST_PAGE_PATH,
    OFFERS_PAGE_PATH
} from "../../../../constants/router";
import ListItemLink from "../../../../components/listItemLink";
import Confirm from "../../../../components/confirm";
import { DELETE_IMPORT_REQUEST_CONFIRMATION } from "../../../../constants/notifications";
import { REQUEST_STATUS } from "../../../../constants/statuses";
import { IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT } from "../../../../constants/common";
import SortingHeader from "../../../../components/sortingHeader";
import PageTable from "../../../../components/pageTable";

const headCells = [
    { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
    { id: 'phone', numeric: false, disablePadding: true, label: 'Phone' },
    { id: 'olxAccountUrl', numeric: false, disablePadding: true, label: 'Account URL' },
    { id: 'requestedAt', numeric: false, disablePadding: true, label: 'Date' },
];

class ImportRequestsTable extends PageTable {

    intervalId;

    constructor(props) {
        super(props);

        const newState = merge(
            this.state,
            {
                openConfirm: false,
                importRequestId: undefined
            }
        );

        this.state = newState;
    }


    componentDidMount() {
        this.getData({
            title: "Import Requests",
            getAll: this.props.getAllImportRequests
        });
        this.intervalId = setInterval(this.getData.bind(this), IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    handleDeleteImportRequest = (importRequestId) => {
        this.setState({
            openConfirm: true,
            importRequestId: importRequestId
        });
    };

    agreeHandler = () => {
        this.props.onDeleteImportRequest(this.state.importRequestId);
        this.setState({
            openConfirm: false,
            importRequestId: undefined
        });
    };

    disagreeHandler = () => {
        this.setState({openConfirm: false});
    };


    handleAddToQueue = (importRequestId) => {
        this.props.onAddToQueue(importRequestId);
    };

    handleAddToDone = (importRequestId) => {
        this.props.onAddToDone(importRequestId);
    };

    handleChangePage = (event, newPage) => {
        const {
            props: {
                getAllImportRequests,
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
        const offset = newPage * itemsPerPage;
        const filter = getFilterString();
        this.setState({currentPage: newPage});
        getAllImportRequests({
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
                getAllImportRequests,
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
        getAllImportRequests({
            limit: newItemsPerPage,
            offset: 0,
            search,
            orderBy,
            order,
            filter
        });
    };

    renderStatus(id, status, errorMessage) {
        switch (status) {
            case REQUEST_STATUS.NEW:
                return (
                    <IconButton onClick={() => this.handleAddToQueue(id)}>
                        <QueueIcon />
                    </IconButton>
                );

            case REQUEST_STATUS.DONE:
                return (
                    <IconButton onClick={() => this.handleAddToQueue(id)}>
                        <DoneIcon />
                    </IconButton>
                );

            case REQUEST_STATUS.IN_PROGRESS:
                return (
                    <IconButton >
                        <CircularProgress size="30px"/>
                    </IconButton>
                );

            case REQUEST_STATUS.PENDING:
                return (
                    <IconButton onClick={() => this.handleAddToDone(id)}>
                        <PendingIcon />
                    </IconButton>
                );

            case REQUEST_STATUS.ERROR:
                return errorMessage
                    ? (
                        <Tooltip title={errorMessage}>
                            <IconButton onClick={() => this.handleAddToQueue(id)}>
                                <ErrorIcon />
                            </IconButton>
                        </Tooltip>
                    )
                    : (
                        <IconButton onClick={() => this.handleAddToQueue(id)}>
                            <ErrorIcon />
                        </IconButton>
                    );

            default:
                return (
                    <IconButton onClick={() => this.handleAddToQueue(id)}>
                        <QueueIcon />
                    </IconButton>
                );
        }
    }

    render() {
        const {
            props: {
                importRequests,
                total
            },
            state: {
                itemsPerPage,
                currentPage,
                orderBy,
                order
            }
        } = this;

        return (
            <Fragment>
                <Confirm
                    key={this.state.openConfirm}
                    message={DELETE_IMPORT_REQUEST_CONFIRMATION}
                    title="Please, confirm"
                    isOpen={this.state.openConfirm}
                    agreeHandler={this.agreeHandler}
                    disagreeHandler={this.disagreeHandler}
                />
                <Title>Import Requests</Title>
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
                        {importRequests.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <Typography>
                                            {item.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {item.phone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <Link href={item.olxAccountUrl} target='_blank'>
                                                {item.olxAccountUrl}
                                            </Link>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {moment(item.requestedAt).format( "DD-MM-YYYY HH:mm")}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton to={`${OFFERS_PAGE_PATH}/${item._id}`} component={ListItemLink}>
                                            <InfoIcon />
                                        </IconButton>
                                        <IconButton to={`${EDIT_IMPORT_REQUEST_PAGE_PATH}/${item._id}`} component={ListItemLink}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => this.handleDeleteImportRequest(item._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        {this.renderStatus(item._id, item.status, item.errorMessage)}
                                    </TableCell>
                                </TableRow>
                            )
                        )}
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
        )
    }
}

ImportRequestsTable.propTypes = {
    importRequests: array.isRequired,
    total: number.isRequired,
    getSearchString: func.isRequired,
    getFilterString: func.isRequired
};

ImportRequestsTable.defaultProps = {
    importRequests: [],
    total: 0
};

const mapStateToProps = state => ({
    importRequests: state.importRequests.list.items,
    total: state.importRequests.list.total
});

const mapDispatchToProps = dispatch => ({
    getAllImportRequests: (options = {}) => {
        dispatch(getImportRequests(options));
    },
    onDeleteImportRequest: (importRequestId) => {
        dispatch(deleteImportRequest(importRequestId));
    },
    onAddToQueue: (importRequestId) => {
        dispatch(updateImportRequestStatus(importRequestId, REQUEST_STATUS.PENDING));
    },
    onAddToDone: (importRequestId) => {
        dispatch(updateImportRequestStatus(importRequestId, REQUEST_STATUS.DONE));
    },
    onCreateTitle: title => {
        dispatch(menuClick(title));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportRequestsTable);
