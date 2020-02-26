import React, { Component } from "react";
import { connect } from "react-redux";
import {
    string,
    array,
    number,
    object,
    func
} from "prop-types";
import {
    getOffers,
    deleteOffer
} from "../../../../actions/offers";
import { getImportRequest } from "../../../../actions/importRequests";
import { DELETE_OFFER_CONFIRMATION } from "../../../../constants/notifications";
import {
    HEAD_CELL_TYPE
} from "../../../../constants/common";
import { PageTable } from "../../../../components/pageTable";
import OffersButtons from "./OffersButtons";

const headCells = [
    { id: '_id', numeric: false, disablePadding: true, label: '', type: HEAD_CELL_TYPE.CHECKBOX },
    { id: 'title', numeric: false, disablePadding: true, label: 'Title', type: HEAD_CELL_TYPE.TEXT },
    { id: 'headingString', numeric: false, disablePadding: true, label: 'Heading', type: HEAD_CELL_TYPE.TEXT },
    { id: 'description', numeric: false, disablePadding: true, label: 'Description', type: HEAD_CELL_TYPE.TEXT }
];

class OffersTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            offerId: undefined
        };
    }


    agreeHandler = () => {
        this.props.onDeleteOffer(this.state.offerId);
        this.setState({
            offerId: undefined
        });
    };

    handleDeleteOffer = id => {
        this.setState({
            offerId: id
        });
    };

    isSelected = (id) => {
        const { selectedItems } = this.props;
        return selectedItems.includes(id);
    };

    calculateNumSelectedOnCurrentPage = () => {
        const {
            selectedItems,
            offers
        } = this.props;

        return offers.reduce((acc, offer) => {
            if(selectedItems.includes(offer._id)) {
                acc++;
            }

            return acc;
        }, 0);
    };

    render() {
        const {
            offers,
            total,
            importRequest,
            offerCheckBoxHandler,
            offerCheckBoxSelectAllHandler,
            getAll,
            getSearchString,
            importRequestId
        } = this.props;

        const params = { importRequestId }

        const allIds = offers.map(offer => offer._id);

        const currentPageSelectedNums = this.calculateNumSelectedOnCurrentPage();

        return (
            <PageTable
                getAll={getAll}
                confirmMessage={DELETE_OFFER_CONFIRMATION}
                agreeHandler={this.agreeHandler}
                tableTitle="Offers"
                headCells={headCells}
                total={total}
                data={offers}
                pageTitle={`Offers for ${importRequest.email} account`}
                getFilterString={() => ""}
                getSearchString={getSearchString}
                currentPageSelectedNums={currentPageSelectedNums}
                allIds={allIds}
                allCheckboxSelectedHandler={offerCheckBoxSelectAllHandler}
                checkBoxHandler={offerCheckBoxHandler}
                isItemSelected={this.isSelected}
                queryParams={params}
                buttonsComponent={OffersButtons}
                itemDeleteHandler={this.handleDeleteOffer}
                isTotalCheckbox={true}
            />
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
    getAll: (options = {}) => {
        dispatch(getOffers(options));
    },
    onDeleteOffer: id => {
        dispatch(deleteOffer(id));
    },
    onGetImportRequest: importRequestId => {
        dispatch(getImportRequest(importRequestId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersTable);
