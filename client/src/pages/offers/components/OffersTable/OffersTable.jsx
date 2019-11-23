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
    object
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
    Link
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


class OffersTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openConfirm: false,
            offerId: undefined,
            currentPage: 0,
            itemsPerPage: 10
        }
    }

    componentDidMount() {
        const {
            importRequestId,
            onGetImportRequest,
            getAllOffers,
        } = this.props;
        onGetImportRequest(importRequestId);
        getAllOffers(importRequestId);
    }

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
                getAllOffers
            },
            state: {
                itemsPerPage
            }
        } = this;
        const offset = newPage * itemsPerPage;
        this.setState({currentPage: newPage});
        getAllOffers(importRequestId, {
            limit: itemsPerPage,
            offset
        });
    };

    handleChangeRowsPerPage = event => {
        const {
            importRequestId,
            getAllOffers
        } = this.props;
        const newItemsPerPage = parseInt(event.target.value, 10);
        const state = {
            itemsPerPage: newItemsPerPage,
            currentPage: 0
        };
        this.setState(state);
        getAllOffers(importRequestId, {
            limit: newItemsPerPage,
            offset: 0
        });
    };


    render() {
        const { props: { offers, total, importRequest, onCreateTitle }, state: { currentPage, itemsPerPage } } = this;
        onCreateTitle(`Offers for ${importRequest.email} account`);

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
                            <TableCell>Caption</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Heading</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offers.map(item => (
                            <TableRow key={item._id}>
                                <TableCell>
                                    <Typography>
                                        <Link href={item.link} target='_blank'>
                                            {item.caption}
                                        </Link>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {`${item.price} UAH`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {item.heading.join('/')}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {item.images.length > 0 ? <img src={item.images[0]} width="50px" alt={item.caption}/> : undefined}
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
                        ))}
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
    importRequest: object.isRequired
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
