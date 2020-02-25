import React, { Component } from "react";
import { connect } from "react-redux";
import {
    array,
    func,
    number
} from "prop-types";
import {
    getHeadings,
    deleteHeading
} from "../../../../actions/headings";
import { DELETE_HEADING_CONFIRMATION } from "../../../../constants/notifications";
import {
    HEAD_CELL_TYPE
} from "../../../../constants/common";
import {
    PageTable,
} from "../../../../components/pageTable";
import {HeadingsButtons} from "./index";


const headCells = [
    { id: '_id', numeric: true, disablePadding: true, label: 'id', type: HEAD_CELL_TYPE.TEXT },
    { id: 'heading', numeric: false, disablePadding: true, label: 'Heading', type: HEAD_CELL_TYPE.TEXT},
    { id: 'createdAt', numeric: false, disablePadding: true, label: 'Creating Date', typr: HEAD_CELL_TYPE.DATE },
];

class HeadingsTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            headingId: undefined
        };
    }

    handleDeleteHeading = headingId => {
        this.setState({
            headingId
        })
    };

    agreeHandler = () => {
        this.props.onDeleteHeading(this.state.headingId);
        this.setState({
            headingId: undefined
        });
    };

    render() {
        const {
            headings,
            total,
            getAll,
            getFilterString,
            getSearchString
        } = this.props;

        return(
            <PageTable
                getAll={getAll}
                confirmMessage={DELETE_HEADING_CONFIRMATION}
                agreeHandler={this.agreeHandler}
                tableTitle="Headings"
                headCells={headCells}
                total={total}
                data={headings}
                pageTitle="Headings"
                getFilterString={getFilterString}
                getSearchString={getSearchString}
                buttonsComponent={HeadingsButtons}
            />
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
    getAll: (options = {}) => {
        dispatch(getHeadings(options))
    },
    onDeleteHeading: headingId => {
        dispatch(deleteHeading(headingId));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(HeadingsTable);
