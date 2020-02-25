import React from "react";
import { connect } from "react-redux";
import {
    array,
    func,
    number
} from "prop-types";
import { merge } from "lodash";
import {
    getHeadings,
    deleteHeading
} from "../../../../actions/headings";
import { menuClick } from "../../../../actions/menu";
import { DELETE_HEADING_CONFIRMATION } from "../../../../constants/notifications";
import {
    IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT,
    HEAD_CELL_TYPE
} from "../../../../constants/common";
import {
    PageTable,
    PageTableContainer,
    PageTableContent
} from "../../../../components/pageTable";
import HeadingsButtons from "./HeadingsButtons"


const headCells = [
    { id: '_id', numeric: true, disablePadding: true, label: 'id', type: HEAD_CELL_TYPE.TEXT },
    { id: 'heading', numeric: false, disablePadding: true, label: 'Heading', type: HEAD_CELL_TYPE.TEXT},
    { id: 'createdAt', numeric: false, disablePadding: true, label: 'Creating Date', typr: HEAD_CELL_TYPE.DATE },
];

class HeadingsTable extends PageTable {

    constructor(props) {
        super(props);

        const newState = merge(
            this.state,
            {
                headingId: undefined,
            }
        );

        this.state = newState;
    }

    componentDidMount() {
        this.getData({
            pageTitle: "Headings",
            getAll: this.props.getAll
        });
        this.intervalId = setInterval(
            this.getData.bind(
                this,
                {
                    pageTitle: "Headings",
                    getAll: this.props.getAll
                }
            ), IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT);
    }

    handleDeleteHeading = headingId => {
        this.setState({
            openConfirm: true,
            headingId
        })
    };

    agreeHandler = () => {
        this.props.onDeleteHeading(this.state.headingId);
        this.setState({
            openConfirm: false,
            headingId: undefined
        });
    };

    render() {
        const {
            props: {
                headings,
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

        return(
            <PageTableContainer
                openConfirm={openConfirm}
                confirmMessage={DELETE_HEADING_CONFIRMATION}
                agreeHandler={this.agreeHandler}
                disagreeHandler={this.disagreeHandler}
                tableTitle="Headings"
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
                    data={headings}
                    buttonsComponent={HeadingsButtons}
                    deleteHandler={this.handleDeleteHeading}
                />
            </PageTableContainer>
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
    },
    onCreateTitle: title => {
        dispatch(menuClick(title));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(HeadingsTable);
