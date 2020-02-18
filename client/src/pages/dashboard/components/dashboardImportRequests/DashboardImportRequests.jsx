import React, { Component } from "react";
import { connect } from "react-redux";
import {
    func,
    number, object,
    string
} from "prop-types";
import { getDashboardImportRequests } from "../../../../actions/importRequests";
import DashboardTable, { HEADER_TYPES } from "../../../../components/dashboardTable";

const header = [
    { name: 'Email', type: HEADER_TYPES.DEFAULT, id: 'email' },
    { name: 'Account URL', type: HEADER_TYPES.LINK, id: 'olxAccountUrl' },
    { name: '', type: HEADER_TYPES.INFO, id: 'errorMessage' }
];

class DashboardImportRequests extends Component {

    constructor(props) {
        super(props);
        const {
            onGetImportRequests,
            filter,
            limit,
            offset,
            order,
            orderBy,
            type
        } = this.props;

        onGetImportRequests({
            filter,
            limit,
            offset,
            order,
            orderBy
        }, type);
    }

    render() {
        const {
            importRequests,
            title,
            type
        }  = this.props;

        const data = (importRequests[type] && importRequests[type].items)
            ? importRequests[type].items
            : [];

        return (
            <DashboardTable
                data={data}
                title={title}
                header={header}
            />
        )
    }
}

DashboardImportRequests.propTypes = {
    importRequests: object.isRequired,
    filter: string.isRequired,
    limit: number.isRequired,
    offset: number.isRequired,
    order: string.isRequired,
    orderBy: string.isRequired,
    onGetImportRequests: func,
    title: string.isRequired,
    type: string.isRequired
};

DashboardImportRequests.defaultProps = {
    importRequests: {}
};


const mapStateToProps = state => ({
    importRequests: state.dashboard.list
});

const mapDispatchToProps = dispatch => ({
    onGetImportRequests: (options = {}, type) => {
        dispatch(getDashboardImportRequests(options, type));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardImportRequests);
