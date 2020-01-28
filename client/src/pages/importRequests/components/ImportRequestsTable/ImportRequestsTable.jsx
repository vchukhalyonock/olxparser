import React,
{
    Component,
    Fragment
} from "react";
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
    Tooltip,
    TableSortLabel
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

const headCells = [
    { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
    { id: 'phone', numeric: false, disablePadding: true, label: 'Phone' },
    { id: 'olxAccountUrl', numeric: false, disablePadding: true, label: 'Account URL' },
    { id: 'createdAt', numeric: false, disablePadding: true, label: 'Date' },
];

class ImportRequestsTable extends Component {

    intervalId;
    order;
    orderBy;

    constructor(props) {
        super(props);
        this.state = {
            openConfirm: false,
            importRequestId: undefined,
            currentPage: 0,
            itemsPerPage: 10,
            previousSearch: '',
            orderBy: '',
            order: ''
        }
    }

    getData = () => {
        this.props.onCreateTitle('Import Requests');
        const {
            props: {
                getAllImportRequests,
                getSearchString
            },
            state: {
                itemsPerPage,
                currentPage,
                previousSearch,
                orderBy,
                order
            }
        } = this;

        const search = getSearchString();
        let offset;
        if(previousSearch !== search.toLowerCase()) {
            offset = 0;
            this.setState({previousSearch: search.toLowerCase()});
        } else {
            offset = currentPage * itemsPerPage;
        }

        getAllImportRequests({
            limit: itemsPerPage,
            offset,
            search,
            orderBy,
            order
        });
    };

    componentDidMount() {
        this.getData();
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

    handleChangePage = (event, newPage) => {
        const {
            props: {
                getAllImportRequests,
                getSearchString
            },
            state: {
                itemsPerPage,
                orderBy,
                order
            }
        } = this;

        const search = getSearchString();
        const offset = newPage * itemsPerPage;
        this.setState({currentPage: newPage});
        getAllImportRequests({
            limit: itemsPerPage,
            offset,
            search,
            orderBy,
            order
        });
    };

    handleChangeRowsPerPage = event => {
        const {
            props: {
                getAllImportRequests,
                getSearchString
            },
            state: {
                orderBy,
                order
            }
        } = this;

        const newItemsPerPage = parseInt(event.target.value, 10);
        const search = getSearchString();
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
            order
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
                    <IconButton onClick={() => {}}>
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

    sortHandler = (id) => {
        const {
            orderBy,
            order
        } = this.state;

        let newOrderBy, newOrder;
        if (orderBy !== id) {
            newOrderBy = id;
            newOrder = 'asc';
        } else {
            newOrderBy = orderBy;
            newOrder = order === 'asc' ? 'desc' : 'asc';
        }

        this.setState({orderBy: newOrderBy, order: newOrder});
    };

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
                            {headCells.map(headCell => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={() => this.sortHandler(headCell.id)}
                                    >
                                        {headCell.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
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
    getSearchString: func.isRequired
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
    onCreateTitle: title => {
        dispatch(menuClick(title));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportRequestsTable);
