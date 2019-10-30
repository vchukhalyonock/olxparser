import React, { Component, createRef, Fragment } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {
    Button,
    TextField,
    withStyles
} from "@material-ui/core";
import { string } from "prop-types";
import { createImportRequest } from "../../../../actions/importRequests";
import { IMPORT_REQUESTS_PAGE_PATH } from "../../../../constants/router";

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

class ImportRequestForm extends Component {

    constructor(props) {
        super(props);
        this.IREmail = createRef();
        this.IROLXLink = createRef();
        this.state = {
            redirect: false
        }
    }

    setRedirect  = () => {
        this.setState({redirect: true});
    };

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to={IMPORT_REQUESTS_PAGE_PATH}/>;
        }
    };

    cancelHandler = (event) => {
        this.setRedirect();
        event.preventDefault();
    };


    IRSubmitHandler = (event) => {
        const email = this.IREmail.current.value;
        const olxAccountUrl = this.IROLXLink.current.value;
        this.props.saveIR(email, olxAccountUrl);
        this.setRedirect();
        event.preventDefault();
    };

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                {this.renderRedirect()}
                <form onSubmit={this.IRSubmitHandler}>
                    <TextField
                        id="email"
                        label="Email"
                        className={classes.textField}
                        margin="normal"
                        required
                        inputRef={this.IREmail}
                    />
                    <TextField
                        id="olxLink"
                        label="OLX Link"
                        className={classes.textField}
                        margin="normal"
                        required
                        inputRef={this.IROLXLink}
                    />
                    <div style={{textAlign: "right"}}>
                        <Button variant="contained" className={classes.button} onClick={this.cancelHandler}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>Save</Button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

ImportRequestForm.propTypes = {
    IREmail: string,
    IROLXLink: string
};

ImportRequestForm.defaultProps = {
    IREmail: undefined,
    IROLXLink: undefined,
};

const mapStateToProps = state => ({
    IREmail: state.importRequests.single.email,
    IROLXLink: state.importRequests.single.olxAccountUrl
});

const mapDispatchToProps = dispatch => ({
    saveIR: (email, olxAccountUrl) => {
        dispatch(createImportRequest({email, olxAccountUrl}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ImportRequestForm));
