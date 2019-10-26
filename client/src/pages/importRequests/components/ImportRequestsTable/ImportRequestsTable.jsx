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
} from '@material-ui/core';
import Title from "../../../../components/title";

import { getImportRequests } from "../../../../actions/importRequests";

class ImportRequestsTable extends Component {

    componentDidMount() {
        this.props.getAllImportRequests();
    }

    render() {
        const {
            importRequests
        } = this.props;
        
        const list = importRequests.list.items;

        return (
            <Fragment>
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
                                <TableCell></TableCell>
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportRequestsTable);
