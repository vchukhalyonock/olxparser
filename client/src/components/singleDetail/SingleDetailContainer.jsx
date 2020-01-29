import React, { Component, Fragment } from "react";
import {
    array
} from "prop-types";
import { Button } from "@material-ui/core";
import { concat } from "lodash";
import { SingleDetail } from "./index";

class SingleDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localDetails: []
        }
    }

    componentDidMount() {
        const { details } = this.props;

        const localDetails = details.map((item, index) => (
            <SingleDetail
                index={index}
                value={item}
                key={index}
                removeDetails={() => this.handleRemoveDetailItem(index)}
            />
        ));

        this.setState({localDetails});
    }

    handleRemoveDetailItem = (index) => {
        const { localDetails } = this.state;
        const newLocalDetails = localDetails.filter(item => item.props.index !== index);
        this.setState({localDetails: newLocalDetails});
    };

    handleAddDetailsItem = () => {
        const { localDetails } = this.state;
        const index = localDetails.length > 0
            ? localDetails[localDetails.length - 1].props.index + 1
            : 0;
        const newDetail = (<SingleDetail
            index={index}
            value={{}}
            key={index}
            removeDetails={() => this.handleRemoveDetailItem(index)}
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

SingleDetailContainer.propTypes = {
    details: array.isRequired
};

export default SingleDetailContainer;