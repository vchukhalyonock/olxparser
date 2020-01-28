import React,
{
    Component,
    Fragment
} from "react";
import { connect } from "react-redux";
import {
    string,
    array,
    number,
    object,
    func
} from "prop-types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    TableFooter,
    IconButton,
    Typography,
    Link,
    Checkbox
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Info as InfoIcon
} from '@material-ui/icons';
import Title from "../../../../components/title";
import {
    getOffers,
    deleteOffer
} from "../../../../actions/offers";
import { menuClick } from "../../../../actions/menu";
import { getImportRequest } from "../../../../actions/importRequests";
import {
    EDIT_OFFERS_PAGE_PATH,
    OFFER_DETAILS_PATH
} from "../../../../constants/router";
import ListItemLink from "../../../../components/listItemLink";
import Confirm from "../../../../components/confirm";
import { DELETE_OFFER_CONFIRMATION } from "../../../../constants/notifications";
import {IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT} from "../../../../constants/common";
import SortingHeader from "../../../../components/sortingHeader";

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'description', numeric: false, disablePadding: true, label: 'Description' }
];

class OffersTable extends Component {

    intervalId;

    constructor(props) {
        super(props);
        this.state = {
            openConfirm: false,
            offerId: undefined,
            currentPage: 0,
            itemsPerPage: 10,
            previousSearch: '',
            orderBy: '',
            order: ''
        }
    }

    componentDidMount() {
        this.getData();
        this.intervalId = setInterval(this.getData.bind(this), IMPORT_REQUEST_PAGE_REFRESH_TIMEOUT);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    getData = () => {
        const {
            props: {
                importRequestId,
                getAllOffers,
                getSearchString,
                onGetImportRequest
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
        let offset;
        if(previousSearch !== search.toLowerCase()) {
            offset = 0;
            this.setState({previousSearch: search.toLowerCase()});
        } else {
            offset = currentPage * itemsPerPage;
        }

        onGetImportRequest(importRequestId);
        getAllOffers(importRequestId, {
            limit: itemsPerPage,
            offset,
            search,
            orderBy,
            order
        });
    };

    agreeHandler = () => {
        this.props.onDeleteOffer(this.state.offerId);
        this.setState({
            openConfirm: false,
            offerId: undefined
        });
    };

    disagreeHandler = () => {
        this.setState({openConfirm: false});
    };

    handleDeleteOffer = id => {
        this.setState({
            openConfirm: true,
            offerId: id
        });
    };

    handleChangePage = (event, newPage) => {
        const {
            props: {
                importRequestId,
                getAllOffers,
                getSearchString
            },
            state: {
                itemsPerPage,
                orderBy,
                order
            }
        } = this;

        const search = getSearchString();
        const offset = newPage * itemsPerPage;
        this.setState({currentPage: newPage});
        getAllOffers(importRequestId, {
            limit: itemsPerPage,
            offset,
            search,
            orderBy,
            order
        });
    };

    handleChangeRowsPerPage = event => {
        const {
            props: {
                importRequestId,
                getAllOffers,
                getSearchString
            },
            state: {
                orderBy,
                order
            }
        } = this;
        const newItemsPerPage = parseInt(event.target.value, 10);
        const search = getSearchString();
        const state = {
            itemsPerPage: newItemsPerPage,
            currentPage: 0
        };
        this.setState(state);
        getAllOffers(importRequestId, {
            limit: newItemsPerPage,
            offset: 0,
            search,
            orderBy,
            order
        });
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

    isSelected = (id) => {
        const { selectedItems } = this.props;
        return selectedItems.includes(id);
    };

    render() {
        const {
            props: {
                offers,
                total,
                importRequest,
                onCreateTitle,
                numSelected,
                offerCheckBoxHandler,
                offerCheckBoxSelectAllHandler
            },
            state: {
                currentPage,
                itemsPerPage,
                orderBy,
                order
            }
        } = this;
        onCreateTitle(`Offers for ${importRequest.email} account`);
        const allIds = offers.map(offer => offer._id);

        return (
            <Fragment>
                <Confirm
                    key={this.state.openConfirm}
                    message={DELETE_OFFER_CONFIRMATION}
                    title="Please, confirm"
                    isOpen={this.state.openConfirm}
                    agreeHandler={this.agreeHandler}
                    disagreeHandler={this.disagreeHandler}
                />
                <Title>Offers</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < itemsPerPage && numSelected < total}
                                    checked={total > 0 && (numSelected === itemsPerPage || numSelected === total)}
                                    onChange={() => offerCheckBoxSelectAllHandler(allIds)}
                                />
                            </TableCell>
                            <SortingHeader
                                headCells={headCells}
                                orderBy={orderBy}
                                order={order}
                                sortHandler={this.sortHandler}
                            />
                            <TableCell></TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offers.map(item => {
                            const isItemSelected = this.isSelected(item._id);

                            return (
                                <TableRow key={item._id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={() => offerCheckBoxHandler(item._id)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <Link href={item.url} target='_blank'>
                                                {item.title}
                                            </Link>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {item.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {item.images.length > 0 ? <img src={item.images[0]} width="50px" alt={item.title}/> : undefined}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton to={`${OFFER_DETAILS_PATH}/${item._id}`} component={ListItemLink}>
                                            <InfoIcon />
                                        </IconButton>
                                        <IconButton to={`${EDIT_OFFERS_PAGE_PATH}/${item._id}`} component={ListItemLink}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => this.handleDeleteOffer(item._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={5}
                                count={total}
                                rowsPerPage={itemsPerPage}
                                page={currentPage}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Fragment>
        );
    }
}

OffersTable.propTypes = {
    importRequestId: string.isRequired,
    offers: array.isRequired,
    total: number.isRequired,
    importRequest: object.isRequired,
    getSearchString: func.isRequired,
    offerCheckBoxHandler: func.isRequired,
    offerCheckBoxSelectAllHandler: func.isRequired,
    numSelected: number.isRequired,
    selectedItems: array.isRequired
};

OffersTable.defaultProps = {
    offers: [],
    total: 0,
    importRequestId: '',
    importRequest: {}
};

const mapStateToProps = state => ({
    offers: state.offers.list.items,
    total: state.offers.list.total,
    importRequest: state.importRequests.single
});

const mapDispatchToProps = dispatch => ({
    getAllOffers: (importRequestId, options = {}) => {
        dispatch(getOffers(importRequestId, options));
    },
    onDeleteOffer: id => {
        dispatch(deleteOffer(id));
    },
    onCreateTitle: title => {
        dispatch(menuClick(title));
    },
    onGetImportRequest: importRequestId => {
        dispatch(getImportRequest(importRequestId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersTable);
