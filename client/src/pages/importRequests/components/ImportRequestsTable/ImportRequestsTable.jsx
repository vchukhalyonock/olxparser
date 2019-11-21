import React,
{
    Component,
    Fragment
} from "react";
import { connect } from "react-redux";
import { object } from "prop-types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    CircularProgress,
    Typography,
    Link
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
import Title from "../../../../components/title";
import {
    getImportRequests,
    deleteImportRequest,
    updateImportRequestStatus
} from "../../../../actions/importRequests";
import {
    EDIT_IMPORT_REQUEST_PAGE_PATH,
    OFFERS_PAGE_PATH
} from "../../../../constants/router";
import ListItemLink from "../../../../components/listItemLink";
import Confirm from "../../../../components/confirm";
import { DELETE_IMPORT_REQUEST_CONFIRMATION } from "../../../../constants/notifications";
import { REQUEST_STATUS } from "../../../../constants/statuses";

class ImportRequestsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openConfirm: false,
            importRequestId: undefined
        }
    }


    componentDidMount() {
        this.props.getAllImportRequests();
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

    renderStatus(id, status) {
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
                return (
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
            importRequests
        } = this.props;

        const list = importRequests.list.items;

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
                            <TableCell>Email</TableCell>
                            <TableCell>OLX Account URL</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(item => (
                            <TableRow key={item._id}>
                                <TableCell>
                                    <Typography>
                                        {item.email}
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
                                        {item.requestedAt}
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
                                    {this.renderStatus(item._id, item.status)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fragment>
        )
    }
}

ImportRequestsTable.propTypes = {
    importRequests: object.isRequired
};

ImportRequestsTable.defaultProps = {
    importRequests: {lists: {items: []}}
};

const mapStateToProps = state => ({
    importRequests: state.importRequests
});

const mapDispatchToProps = dispatch => ({
    getAllImportRequests: () => {
        dispatch(getImportRequests());
    },
    onDeleteImportRequest: (importRequestId) => {
        dispatch(deleteImportRequest(importRequestId));
    },
    onAddToQueue: (importRequestId) => {
        dispatch(updateImportRequestStatus(importRequestId, REQUEST_STATUS.PENDING));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportRequestsTable);
