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
    createImportRequest,
    updateImportRequest,
    getImportRequest
} from "../../../../actions/importRequests";
import { IMPORT_REQUESTS_PAGE_PATH } from "../../../../constants/router";
import { menuClick } from "../../../../actions/menu";
import {
    EMAIL_VALIDATE_REGEX,
    OLX_URL_VALIDATE_REGEXP,
    PHONE_VALIDATE_REGEX
} from "../../../../constants/common";

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
        this.state = {
            redirect: false,
            userId: undefined,
            email: undefined,
            phone: undefined,
            olxAccountUrl: undefined,
            emailError: false,
            phoneError: false,
            urlError: false,
            cancel: false,
            submitted: false
        }
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };

    handlePhoneChange = (event) => {
        this.setState({ phone: event.target.value });
    };

    handleUserIdChange = (event) => {
        this.setState({ userId: event.target.value });
    };

    handleOlxAccountUrlChange = (event) => {
        this.setState({ olxAccountUrl: event.target.value });
    };

    componentDidMount() {
        const {
            importRequestId,
            onCreateTitle,
            getIR
        } = this.props;

        if (importRequestId) {
            onCreateTitle("Edit Import Request");
            getIR(importRequestId);
        } else {
            onCreateTitle("Create Import Request");
        }
    }

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to={IMPORT_REQUESTS_PAGE_PATH}/>;
        }
    };

    cancelHandler = (event) => {
        event.preventDefault();
        const newState = {
            userId: undefined,
            email: undefined,
            phone: undefined,
            olxAccountUrl: undefined,
            emailError: false,
            phoneError: false,
            urlError: false,
            redirect: true,
            cancel: true
        };
        this.setState(newState);
    };


    IRSubmitHandler = (event) => {

        event.preventDefault();
        const {
            importRequestId,
            saveIR
        } = this.props;

        let errors = false;

        const converted = {
            userId: this.state.userId ? this.state.userId : this.props.userId,
            email: this.state.email ? this.state.email : this.props.email,
            phone: this.state.phone ? this.state.phone : this.props.phone,
            olxAccountUrl: this.state.olxAccountUrl ? this.state.olxAccountUrl : this.props.olxAccountUrl
        };

        const {
            email,
            phone,
            olxAccountUrl,
            userId
        } = converted;

        const emailError = email.search(EMAIL_VALIDATE_REGEX) === -1;
        const phoneError = phone.search(PHONE_VALIDATE_REGEX) === -1;
        const urlError = olxAccountUrl.search(OLX_URL_VALIDATE_REGEXP) === -1;

        if(emailError || phoneError || urlError) {
            errors = true;
        }

        if(errors) {
            const errorState = {
                emailError,
                phoneError,
                urlError
            };
            this.setState(errorState);
        } else {
            saveIR(email, phone, olxAccountUrl, userId, importRequestId);
            /*const newState = {
                userId: undefined,
                email: undefined,
                phone: undefined,
                olxAccountUrl: undefined,
                emailError: false,
                phoneError: false,
                urlError: false,
                redirect: true,
                cancel: false
            };
            this.setState(newState);*/
            const newState = {
                redirect: true,
                cancel: false
            };
            this.setState(newState);
        }
    };

    render() {
        let {
            classes,
            email,
            olxAccountUrl,
            importRequestId,
            phone,
            userId,
            t,
            loaded,
            error
        } = this.props;

        const {
            emailError,
            phoneError,
            urlError
        } = this.state;

        if(!importRequestId) {
            email = undefined;
            olxAccountUrl = undefined;
            phone = undefined;
            userId = undefined;
        }

        return (
            <Fragment key={t}>
                {(!loaded && error) && (<Alert severity="error">Such OLX URL already exists!</Alert>)}
                {((!error && loaded) || this.state.cancel) && this.renderRedirect()}
                <form onSubmit={this.IRSubmitHandler}>
                    <TextField
                        id="userId"
                        label="User Id"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleUserIdChange}
                        defaultValue={userId}
                        InputLabelProps={{shrink: true}}
                    />
                    <TextField
                        error={emailError}
                        id="email"
                        label="Email"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleEmailChange}
                        defaultValue={email}
                        InputLabelProps={{shrink: true}}
                    />
                    <TextField
                        error={phoneError}
                        id="phone"
                        label="Phone"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handlePhoneChange}
                        defaultValue={phone}
                        InputLabelProps={{shrink: true}}
                    />
                    <TextField
                        error={urlError}
                        id="olxLink"
                        label="OLX Link"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleOlxAccountUrlChange}
                        defaultValue={olxAccountUrl}
                        InputLabelProps={{shrink: true}}
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
    userId: string,
    email: string,
    phone: string,
    olxAccountUrl: string,
    importRequestId: string,
    t: number,
    error: bool,
    loaded: bool
};

ImportRequestForm.defaultProps = {
    userId: undefined,
    email: undefined,
    phone: undefined,
    olxAccountUrl: undefined,
    importRequestId: undefined,
    t: 0,
    error: false,
    loaded: false
};

const mapStateToProps = state => ({
    userId: state.importRequests.single.userId,
    email: state.importRequests.single.email,
    phone: state.importRequests.single.phone,
    olxAccountUrl: state.importRequests.single.olxAccountUrl,
    t: state.importRequests.single.t,
    error: state.importRequests.single.error,
    loaded: state.importRequests.single.loaded
});

const mapDispatchToProps = dispatch => ({
    saveIR: (email, phone, olxAccountUrl, userId, importRequestId = undefined) => {
        if(importRequestId) {
            dispatch(updateImportRequest({
                _id: importRequestId,
                email,
                olxAccountUrl,
                phone,
                userId
            }))
        } else {
            dispatch(createImportRequest({email, olxAccountUrl, phone, userId}));
        }
    },
    getIR: (id) => {
        dispatch(getImportRequest(id))
    },
    onCreateTitle: title => {
        dispatch(menuClick(title));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ImportRequestForm));
