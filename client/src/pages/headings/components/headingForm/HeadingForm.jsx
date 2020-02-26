import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {
    Button,
    TextField,
    withStyles
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
    bool,
    number,
    string
} from "prop-types";
import {
    createHeading,
    updateHeading,
    getHeading,
    resetHeadingForm
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
            heading: undefined,
            cancel: false,
            submitted: false
        }
    }

    componentDidMount() {
        const {
            headingId,
            onCreateTitle,
            onGetHeading,
            resetForm
        } = this.props;

        resetForm();

        const newState = {
            heading: undefined,
            redirect: false,
            cancel: false
        };
        this.setState(newState);

        if (headingId) {
            onCreateTitle("Edit Heading");
            onGetHeading(headingId);
        } else {
            onCreateTitle("Create Heading");
        }
    }

    handleHeadingChange = (event) => {
        this.setState({ heading: event.target.value });
    };

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to={HEADINGS_PAGE_PATH}/>;
        }
    };

    cancelHandler = (event) => {
        event.preventDefault();
        const newState = {
            heading: undefined,
            redirect: true,
            cancel: true
        };
        this.setState(newState);
    };

    headingSubmitHandler = (event) => {
        event.preventDefault();

        const heading = this.state.heading ? this.state.heading : this.props.heading;
        this.props.saveHeading(this.props.headingId, heading);
        const newState = {
            redirect: true,
            cancel: false
        };
        this.setState(newState);
    };

    render() {
        let {
            headingId,
            classes,
            heading,
            t,
            error,
            loaded
        } = this.props;

        if(!headingId) {
            heading = undefined;
        }

        return (
            <Fragment key={t}>
                {(!loaded && error) && (<Alert severity="error">Heading already exists!</Alert>)}
                {((!error && loaded) || this.state.cancel) && this.renderRedirect()}
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
    headingId: string,
    error: bool,
    loaded: bool
};

HeadingForm.defaultProps = {
    heading: undefined,
    t: 0,
    headingId: undefined,
    error: false,
    loaded: false
};

const mapStateToProps = state => ({
    heading: state.headings.single.heading,
    t: state.headings.single.t,
    error: state.headings.single.error,
    loaded: state.headings.single.loaded
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
    },
    resetForm: () => {
        dispatch(resetHeadingForm());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeadingForm));
