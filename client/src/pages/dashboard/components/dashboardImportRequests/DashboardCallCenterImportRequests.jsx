import React, { Component } from "react";
import { connect } from "react-redux";
import {
    func,
    number, object,
    string
} from "prop-types";
import { getCallCenterDashboardImportRequests } from "../../../../actions/callCenterImportRequests";
import DashboardTable, { HEADER_TYPES } from "../../../../components/dashboardTable";

const header = [
    { name: 'Session Id', type: HEADER_TYPES.DEFAULT, id: 'sessionId' },
    { name: 'OLX URL', type: HEADER_TYPES.LINK, id: 'olxUrl' },
    { name: '', type: HEADER_TYPES.INFO, id: 'errorMessage' }
];

class DashboardCallCenterImportRequests extends Component {

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

DashboardCallCenterImportRequests.propTypes = {
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

DashboardCallCenterImportRequests.defaultProps = {
    importRequests: {}
};


const mapStateToProps = state => ({
    importRequests: state.dashboard.list
});

const mapDispatchToProps = dispatch => ({
    onGetImportRequests: (options = {}, type) => {
        dispatch(getCallCenterDashboardImportRequests(options, type));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCallCenterImportRequests);
