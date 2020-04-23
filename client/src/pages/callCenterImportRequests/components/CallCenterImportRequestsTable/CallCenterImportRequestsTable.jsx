import React, { Component } from "react";
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
import {
    getImportRequests,
    deleteImportRequest,
    updateImportRequestStatus
} from "../../../../actions/callCenterImportRequests";
import { DELETE_CALLCENTER_IMPORT_REQUEST_CONFIRMATION } from "../../../../constants/notifications";
import { CALLCENTER_REQUEST_STATUS } from "../../../../constants/statuses";
import {
    HEAD_CELL_TYPE
} from "../../../../constants/common";
import {
    PageTable
} from "../../../../components/pageTable";
import { CallCenterImportRequestButtons } from "./index";

const headCells = [
    { id: 'sessionId', numeric: false, disablePadding: true, label: 'Session Id', type: HEAD_CELL_TYPE.TEXT },
    { id: 'olxUrl', numeric: false, disablePadding: true, label: 'OLX URL', type: HEAD_CELL_TYPE.LINK },
    { id: 'requestedAt', numeric: false, disablePadding: true, label: 'Date', type: HEAD_CELL_TYPE.DATE },
];

class CallCenterImportRequestsTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            importRequestId: undefined
        };
    }


    handleDeleteImportRequest = (importRequestId) => {
        this.setState({
            importRequestId: importRequestId
        });
    };

    agreeHandler = () => {
        this.props.onDeleteImportRequest(this.state.importRequestId);
        this.setState({
            importRequestId: undefined
        });
    };


    handleAddToQueue = (importRequestId) => {
        this.props.onAddToQueue(importRequestId);
    };

    handleAddToDone = (importRequestId) => {
        this.props.onAddToDone(importRequestId);
    };


    renderStatus = (id, status, errorMessage) => {
        switch (status) {
            case CALLCENTER_REQUEST_STATUS.NEW:
                return (
                    <IconButton onClick={() => this.handleAddToQueue(id)}>
                        <Tooltip title="Add to queue">
                            <QueueIcon />
                        </Tooltip>
                    </IconButton>
                );

            case CALLCENTER_REQUEST_STATUS.DONE:
                return (
                    <IconButton onClick={() => this.handleAddToQueue(id)}>
                        <Tooltip title="Add to queue">
                            <DoneIcon />
                        </Tooltip>
                    </IconButton>
                );

            case CALLCENTER_REQUEST_STATUS.IN_PROGRESS:
                return (
                    <IconButton >
                        <CircularProgress size="30px"/>
                    </IconButton>
                );

            case CALLCENTER_REQUEST_STATUS.PENDING:
                return (
                    <IconButton onClick={() => this.handleAddToDone(id)}>
                        <Tooltip title="Remove from queue">
                            <PendingIcon />
                        </Tooltip>
                    </IconButton>
                );

            case CALLCENTER_REQUEST_STATUS.ERROR:
                return (
                    <IconButton onClick={() => this.handleAddToQueue(id)}>
                        <Tooltip title={errorMessage + " Click add to queue"|| "Add to queue"}>
                            <ErrorIcon />
                        </Tooltip>
                    </IconButton>
                );

            default:
                return (
                    <IconButton onClick={() => this.handleAddToQueue(id)}>
                        <Tooltip title="Add to queue">
                            <QueueIcon />
                        </Tooltip>
                    </IconButton>
                );
        }
    };

    render() {
        const {
            importRequests,
            total,
            getAll,
            getFilterString,
            getSearchString
        } = this.props;

        return (
            <PageTable
                getAll={getAll}
                confirmMessage={DELETE_CALLCENTER_IMPORT_REQUEST_CONFIRMATION}
                agreeHandler={this.agreeHandler}
                tableTitle="Import Requests"
                headCells={headCells}
                total={total}
                data={importRequests}
                pageTitle="Import Requests"
                getFilterString={getFilterString}
                getSearchString={getSearchString}
                renderStatus={this.renderStatus}
                buttonsComponent={CallCenterImportRequestButtons}
                itemDeleteHandler={this.handleDeleteImportRequest}
            />
        )
    }
}

CallCenterImportRequestsTable.propTypes = {
    importRequests: array.isRequired,
    total: number.isRequired,
    getSearchString: func.isRequired,
    getFilterString: func.isRequired
};

CallCenterImportRequestsTable.defaultProps = {
    importRequests: [],
    total: 0
};

const mapStateToProps = state => ({
    importRequests: state.callcenterImportRequests.list.items,
    total: state.callcenterImportRequests.list.total
});

const mapDispatchToProps = dispatch => ({
    getAll: (options = {}) => {
        dispatch(getImportRequests(options));
    },
    onDeleteImportRequest: (importRequestId) => {
        dispatch(deleteImportRequest(importRequestId));
    },
    onAddToQueue: (importRequestId) => {
        dispatch(updateImportRequestStatus(importRequestId, CALLCENTER_REQUEST_STATUS.PENDING));
    },
    onAddToDone: (importRequestId) => {
        dispatch(updateImportRequestStatus(importRequestId, CALLCENTER_REQUEST_STATUS.DONE));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CallCenterImportRequestsTable);
