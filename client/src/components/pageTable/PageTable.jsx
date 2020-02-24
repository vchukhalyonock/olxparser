import React, { Component } from "react";

class PageTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            itemsPerPage: 10,
            previousSearch: '',
            orderBy: '',
            order: ''
        }
    }

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
        title,
        getAll
               }) => {
        this.props.onCreateTitle(title);
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
}

export default PageTable;
