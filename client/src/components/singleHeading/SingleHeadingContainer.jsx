import React, { Component, Fragment } from "react";
import {
    array,
    func
} from "prop-types";
import { Button } from "@material-ui/core";
import { concat } from "lodash";
import { SingleHeading } from "./index";


class SingleHeadingContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            localHeading: []
        }
    }

    componentDidMount() {
        const { heading, handleChange } = this.props;
        const localHeading = heading.map((item, index) => (
            <SingleHeading
                index={index}
                value={item}
                key={index}
                removeHeading={this.handleRemoveHadingItem}
                handleChange={handleChange}
            />
        ));
        this.setState({localHeading});
    }

    handleRemoveHadingItem = (index) => {
        const { removeHeadingItem } = this.props;
        const { localHeading } = this.state;
        const newLocalHeading = localHeading.filter(item => item.props.index !== index);
        this.setState({localHeading: newLocalHeading});
        removeHeadingItem(index);
    };

    handleAddHadingItem = () => {
        const { localHeading } = this.state;
        const { handleChange } = this.props;
        const index = localHeading.length > 0
            ? localHeading[localHeading.length - 1].props.index + 1
            : 0;
        const newHeading = (<SingleHeading
            index={index}
            value=""
            key={index}
            removeHeading={this.handleRemoveHadingItem}
            handleChange={handleChange}
        />);
        const newLocalHeading = concat(localHeading, newHeading);
        this.setState({localHeading: newLocalHeading});
    };

    render() {
        const { localHeading } = this.state;

        return (
            <Fragment>
                <h3>Heading</h3>
                {localHeading}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleAddHadingItem}
                >
                    +
                </Button>
            </Fragment>
        );
    }
}

SingleHeadingContainer.propTypes = {
    heading: array.isRequired,
    handleChange: func.isRequired,
    removeHeadingItem: func.isRequired
};

export default SingleHeadingContainer;