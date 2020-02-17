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
            heading: undefined,
            cancel: false
        }
    }

    componentDidMount() {
        const { headingId } = this.props;
        this.setState({cancel: false});
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
        this.setState({
            heading: undefined,
            redirect: true
        });
    };

    setCancel = () => {
        this.setState({
            heading: undefined,
            redirect: true,
            cancel: true
        });
    };

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to={HEADINGS_PAGE_PATH}/>;
        }
    };

    cancelHandler = (event) => {
        this.setCancel();
        event.preventDefault();
    };

    headingSubmitHandler = (event) => {
        event.preventDefault();

        const heading = this.state.heading ? this.state.heading : this.props.heading;
        this.props.saveHeading(this.props.headingId, heading);
        this.setRedirect();
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeadingForm));
