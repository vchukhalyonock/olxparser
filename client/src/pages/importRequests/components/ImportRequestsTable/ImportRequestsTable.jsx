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
    IconButton
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';
import Title from "../../../../components/title";
import {
    getImportRequests,
    deleteImportRequest
} from "../../../../actions/importRequests";
import { EDIT_IMPORT_REQUEST_PAGE_PATH } from "../../../../constants/router";
import ListItemLink from "../../../../components/listItemLink";
import Confirm from "../../../../components/confirm";
import {DELETE_IMPORT_REQUEST_CONFIRMATION} from "../../../../constants/notifications";

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
                            <TableCell>Date</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>OLX Account URL</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(item => (
                            <TableRow key={item._id}>
                                <TableCell>{item.requestedAt}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.olxAccountUrl}</TableCell>
                                <TableCell>
                                    <IconButton to={`${EDIT_IMPORT_REQUEST_PAGE_PATH}/${item._id}`} component={ListItemLink}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => this.handleDeleteImportRequest(item._id)}>
                                        <DeleteIcon />
                                    </IconButton>
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportRequestsTable);
