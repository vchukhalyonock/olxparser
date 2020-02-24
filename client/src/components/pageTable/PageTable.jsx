import { Component } from "react";
import { func } from "prop-types";

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
                getFilterString
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
            filter
        });
    };

    handleChangePage = (event, newPage) => {
        const {
            props: {
                getAll,
                getSearchString,
                getFilterString
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
            filter
        });
    };

    handleChangeRowsPerPage = (event) => {
        const {
            props: {
                getAll,
                getSearchString,
                getFilterString
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
            filter
        });
    };
}

PageTable.propTypes = {
    getAll: func.isRequired
};

export default PageTable;
