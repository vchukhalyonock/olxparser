import React from "react";
import { connect } from "react-redux";
import {
    array,
    func,
    number
} from "prop-types";
import {
    IconButton,
    CircularProgress,
    Tooltip
} from '@material-ui/core';
import {
    Queue as QueueIcon,
    PauseCircleOutline as PendingIcon,
    Error as ErrorIcon,
    DoneAll as DoneIcon,
} from '@material-ui/icons';
import { merge } from "lodash";
import {
    getImportRequests,
    deleteImportRequest,
    updateImportRequestStatus
} from "../../../../actions/importRequests";
import { menuClick } from "../../../../actions/menu";
import { DELETE_IMPORT_REQUEST_CONFIRMATION } from "../../../../constants/notifications";
import { REQUEST_STATUS } from "../../../../constants/statuses";
import {
    IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT,
    HEAD_CELL_TYPE
} from "../../../../constants/common";
import {
    PageTable,
    PageTableContainer,
    PageTableContent
} from "../../../../components/pageTable";
import ImportRequestButtons from "./ImportRequestsButtons";

const headCells = [
    { id: 'email', numeric: false, disablePadding: true, label: 'Email', type: HEAD_CELL_TYPE.TEXT },
    { id: 'phone', numeric: false, disablePadding: true, label: 'Phone', type: HEAD_CELL_TYPE.TEXT },
    { id: 'olxAccountUrl', numeric: false, disablePadding: true, label: 'Account URL', type: HEAD_CELL_TYPE.LINK },
    { id: 'requestedAt', numeric: false, disablePadding: true, label: 'Date', type: HEAD_CELL_TYPE.DATE },
];

class ImportRequestsTable extends PageTable {

    constructor(props) {
        super(props);

        const newState = merge(
            this.state,
            {
                importRequestId: undefined
            }
        );

        this.state = newState;
    }


    componentDidMount() {
        this.getData({
            pageTitle: "Import Requests",
            getAll: this.props.getAll
        });
        this.intervalId = setInterval(
            this.getData.bind(
                this,
                {
                    pageTitle: "Import Requests",
                    getAll: this.props.getAll
                }),
            IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT);
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


    handleAddToQueue = (importRequestId) => {
        this.props.onAddToQueue(importRequestId);
    };

    handleAddToDone = (importRequestId) => {
        this.props.onAddToDone(importRequestId);
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
                order,
                openConfirm
            }
        } = this;

        return (
            <PageTableContainer
                openConfirm={openConfirm}
                confirmMessage={DELETE_IMPORT_REQUEST_CONFIRMATION }
                agreeHandler={this.agreeHandler}
                disagreeHandler={this.disagreeHandler}
                tableTitle="Import Requests"
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
                <PageTableContent
                    headCells={headCells}
                    data={importRequests}
                    buttonsComponent={ImportRequestButtons}
                    deleteHandler={this.handleDeleteImportRequest}
                    renderStatus={this.renderStatus}
                />
            </PageTableContainer>
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
    getAll: (options = {}) => {
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
