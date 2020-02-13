import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {
    Button,
    TextField,
    withStyles
} from "@material-ui/core";
import {
    number,
    string
} from "prop-types";
import {
    createHeading,
    updateHeading,
    getHeading
} from "../../../../actions/headings";
import { HEADINGS_PAGE_PATH } from "../../../../constants/router";
import { menuClick } from "../../../../actions/menu";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    },
    button: {
        margin: theme.spacing(1),
    },
});

class HeadingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            heading: undefined
        }
    }

    componentDidMount() {
        const { headingId } = this.props;
        if (headingId) {
            this.props.onCreateTitle("Edit Heading");
            this.props.onGetHeading(headingId);
        } else {
            this.props.onCreateTitle("Create Heading");
        }
    }

    handleHeadingChange = (event) => {
        this.setState({heading: event.target.value});
    };

    setRedirect  = () => {
        this.setState({redirect: true});
    };

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to={HEADINGS_PAGE_PATH}/>;
        }
    };

    cancelHandler = (event) => {
        this.setState({
            heading: undefined
        });
        this.setRedirect();
        event.preventDefault();
    };

    headingSubmitHandler = (event) => {
        event.preventDefault();

        const heading = this.state.heading ? this.state.heading : this.props.heading;
        this.setState({
            heading: undefined
        });
        this.props.saveHeading(this.props.headingId, heading);
        this.setRedirect();
    };

    render() {
        let {
            headingId,
            classes,
            heading,
            t
        } = this.props;

        if(!headingId) {
            heading = undefined;
        }

        return (
            <Fragment key={t}>
                {this.renderRedirect()}
                <form onSubmit={this.headingSubmitHandler}>
                    <TextField
                        id="heading"
                        label="Heading"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleHeadingChange}
                        defaultValue={heading}
                        InputLabelProps={{shrink: true}}
                    />
                    <div style={{textAlign: "right"}}>
                        <Button variant="contained" className={classes.button} onClick={this.cancelHandler}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>Save</Button>
                    </div>
                </form>
            </Fragment>
        );
    }
}

HeadingForm.propTypes = {
    heading: string,
    t: number,
    headingId: string
};

HeadingForm.defaultProps = {
    heading: undefined,
    t: 0,
    headingId: undefined
};

const mapStateToProps = state => ({
    heading: state.headings.single.heading,
    t: state.headings.single.t
});

const mapDispatchToProps = dispatch => ({
    saveHeading: (headingId, heading) => {
        if(headingId) {
            dispatch(updateHeading(headingId, heading));
        } else {
            dispatch(createHeading(heading));
        }
    },
    onGetHeading: id => {
        dispatch(getHeading(id));
    },
    onCreateTitle: title => {
        dispatch(menuClick(title));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeadingForm));
