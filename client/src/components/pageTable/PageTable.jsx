import React, { Component } from "react";
import { connect } from "react-redux";
import {
    array, bool,
    func,
    number, object,
    string
} from "prop-types";
import {
    PageTableContainer,
    PageTableContent
} from "./index";
import { IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT } from "../../constants/common";
import { menuClick } from "../../actions/menu";

class PageTable extends Component {

    intervalId;

    constructor(props) {
        super(props);
        this.state = {
            openConfirm: false,
            currentPage: 0,
            itemsPerPage: 10,
            previousSearch: '',
            orderBy: '',
            order: ''
        }
    }

    componentDidMount() {

        const {
            pageTitle,
            getAll
        } = this.props;

        this.getData({
            pageTitle,
            getAll
        });
        this.intervalId = setInterval(
            this.getData.bind(
                this,
                {
                    pageTitle,
                    getAll
                }
            ), IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    disagreeHandler = () => {
        this.setState({openConfirm: false});
    };

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

    getData = ({
        pageTitle,
        getAll
               }) => {
        this.props.onCreateTitle(pageTitle);
        const {
            props: {
                getSearchString,
                getFilterString,
                queryParams
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
        const filter = getFilterString();
        let offset;
        if(previousSearch !== search.toLowerCase()) {
            offset = 0;
            this.setState({
                previousSearch: search.toLowerCase(),
                orderBy: '',
                order: ''
            });
        } else {
            offset = currentPage * itemsPerPage;
        }

        getAll({
            limit: itemsPerPage,
            offset,
            search,
            orderBy,
            order,
            filter,
            ...queryParams
        });
    };

    handleChangePage = (event, newPage) => {
        const {
            props: {
                getAll,
                getSearchString,
                getFilterString,
                queryParams
            },
            state: {
                itemsPerPage,
                orderBy,
                order
            }
        } = this;

        const search = getSearchString();
        const offset = newPage * itemsPerPage;
        const filter = getFilterString();
        this.setState({currentPage: newPage});
        getAll({
            limit: itemsPerPage,
            offset,
            search,
            orderBy,
            order,
            filter,
            ...queryParams
        });
    };

    handleChangeRowsPerPage = (event) => {
        const {
            props: {
                getAll,
                getSearchString,
                getFilterString,
                queryParams
            },
            state: {
                orderBy,
                order
            }
        } = this;

        const newItemsPerPage = parseInt(event.target.value, 10);
        const search = getSearchString();
        const filter = getFilterString();
        const state = {
            itemsPerPage: newItemsPerPage,
            currentPage: 0
        };
        this.setState(state);
        getAll({
            limit: newItemsPerPage,
            offset: 0,
            search,
            orderBy,
            order,
            filter,
            ...queryParams
        });
    };

    handleDeleteItem = itemId => {
        this.setState({openConfirm: true});
        this.props.itemDeleteHandler(itemId);
    };

    deleteAgreeHandler = () => {
        this.setState({openConfirm: false});
        this.props.agreeHandler();
    };

    render() {
        const {
            props: {
                confirmMessage,
                tableTitle,
                headCells,
                total,
                data,
                renderStatus,
                allIds,
                allCheckboxSelectedHandler,
                checkBoxHandler,
                currentPageSelectedNums,
                isItemSelected,
                buttonsComponent,
                isTotalCheckbox
            },
            state: {
                openConfirm,
                orderBy,
                order,
                itemsPerPage,
                currentPage
            }
        } = this;

        return(
            <PageTableContainer
                openConfirm={openConfirm}
                confirmMessage={confirmMessage}
                agreeHandler={this.deleteAgreeHandler}
                disagreeHandler={this.disagreeHandler}
                tableTitle={tableTitle}
                headCells={headCells}
                orderBy={orderBy}
                order={order}
                sortHandler={this.sortHandler}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                total={total}
                allIds={allIds}
                allCheckboxSelectedHandler={allCheckboxSelectedHandler}
                currentPageSelectedNums={currentPageSelectedNums}
                isTotalCheckbox={isTotalCheckbox}
            >
                <PageTableContent
                    headCells={headCells}
                    data={data}
                    buttonsComponent={buttonsComponent}
                    deleteHandler={this.handleDeleteItem}
                    renderStatus={renderStatus}
                    checkBoxHandler={checkBoxHandler}
                    isSelected={isItemSelected}
                />
            </PageTableContainer>
        );
    }
}

PageTable.propTypes = {
    getAll: func.isRequired,
    confirmMessage: string.isRequired,
    agreeHandler: func.isRequired,
    tableTitle: string.isRequired,
    headCells: array.isRequired,
    total: number,
    data: array,
    pageTitle: string.isRequired,
    getSearchString: func.isRequired,
    getFilterString: func.isRequired,
    renderStatus: func,
    allIds: array,
    allCheckboxSelectedHandler: func,
    checkBoxHandler: func,
    currentPageSelectedNums: number,
    isItemSelected: func,
    queryParams: object,
    buttonsComponent: func,
    itemDeleteHandler: func,
    isTotalCheckbox: bool
};

PageTable.defaultProps = {
    total: 0,
    data: [],
    queryParams: {},
    isTotalCheckbox: false
};

const mapDispatchToProps = dispatch => ({
    onCreateTitle: title => {
        dispatch(menuClick(title));
    }
});

export default connect(null, mapDispatchToProps)(PageTable);
