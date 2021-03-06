import React, { Component, Fragment } from "react";
import {
    array,
    func
} from "prop-types";
import { Button } from "@material-ui/core";
import { concat } from "lodash";
import { SingleDetail } from "./index";

class OfferDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localDetails: []
        }
    }

    componentDidMount() {
        const { details, handleChange, removeDetailValue } = this.props;

        const localDetails = details.map((item, index) => (
            <SingleDetail
                index={index}
                value={item}
                key={index}
                removeDetails={this.handleRemoveDetailItem}
                handleChange={handleChange}
                removeDetailsValue={removeDetailValue}
            />
        ));

        this.setState({localDetails});
    }

    handleRemoveDetailItem = (index) => {
        const { localDetails } = this.state;
        const { removeDetailItem } = this.props;
        const newLocalDetails = localDetails.filter(item => item.props.index !== index);
        this.setState({localDetails: newLocalDetails});
        removeDetailItem(index);
    };

    handleAddDetailsItem = () => {
        const { localDetails } = this.state;
        const { handleChange, removeDetailValue } = this.props;
        const index = localDetails.length > 0
            ? localDetails[localDetails.length - 1].props.index + 1
            : 0;
        const newDetail = (<SingleDetail
            index={index}
            value={{ value: []}}
            key={index}
            removeDetails={this.handleRemoveDetailItem}
            handleChange={handleChange}
            removeDetailsValue={removeDetailValue}
        />);
        const newLocalDetails = concat(localDetails, newDetail);
        this.setState({localDetails: newLocalDetails});
    };

    render() {
        const { localDetails } = this.state;

        return (
            <Fragment>
                <h3>Details</h3>
                {localDetails}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleAddDetailsItem}
                >
                    +
                </Button>
            </Fragment>
        );
    }
}

OfferDetailContainer.propTypes = {
    details: array.isRequired,
    handleChange: func.isRequired,
    removeDetailItem: func.isRequired,
    removeDetailValue: func.isRequired
};

export default OfferDetailContainer;