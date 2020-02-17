import React, { Component } from "react";
import { connect } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { getHeadings } from "../../actions/headings";
import {
    array,
    func,
    object,
    string
} from "prop-types";

const convertHeadings = headings => headings.map(item => ({value: item._id, option: item.heading}));

class HeadingsSelector extends Component {

    constructor(props) {
        super(props);
        const { onGetHeadings } = this.props;

        onGetHeadings('');
    }

    handleSearch = (e) => {
        const { onGetHeadings } = this.props;

        onGetHeadings(e.target.value);
    };


    render() {
        const{
            onChange,
            headings,
            currentHeading,
            id
        } = this.props;

        const convertedHeadings = headings ? convertHeadings(headings) : [];

        return (
            <Autocomplete
                id={id}
                options={convertedHeadings}
                getOptionLabel={option => option.option || ''}
                style={{ width: 500 }}
                onChange={onChange}
                defaultValue={currentHeading}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Headings"
                        variant="standard"
                        fullWidth
                        onChange={this.handleSearch}
                    />
                )}/>
        );
    }
}

HeadingsSelector.propTypes = {
    defaultValue: object,
    headings: array,
    onChange: func.isRequired,
    currentHeading: object,
    id: string.isRequired
};

HeadingsSelector.defaultProps = {
    defaultValue: {},
    headings: [],
    currentHeading: {}
};

const mapStateToProps = state => ({
    headings: state.headings.list.items
});

const mapDispatchToProps = dispatch => ({
    onGetHeadings: search => {
        dispatch(getHeadings({
            limit: 50,
            offset: 0,
            search,
            order: 'asc',
            orderBy: 'heading'
        }))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HeadingsSelector);
