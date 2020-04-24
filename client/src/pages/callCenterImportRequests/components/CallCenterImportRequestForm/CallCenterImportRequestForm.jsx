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
} from "../../../../actions/callCenterImportRequests";
import { CALLCENTER_IMPORT_REQUESTS_PAGE_PATH } from "../../../../constants/router";
import { menuClick } from "../../../../actions/menu";
import {
    OLX_URL_VALIDATE_REGEXP,
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

class CallCenterImportRequestForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            sessionId: undefined,
            olxUrl: undefined,
            limit: undefined,
            urlError: false,
            cancel: false,
            submitted: false
        }
    }

    handleSessionIdChange = (event) => {
        this.setState({ sessionId: event.target.value });
    };

    handleOlxUrlChange = (event) => {
        this.setState({ olxUrl: event.target.value });
    };

    handleLimitChange = (event) => {
        this.setState({ limit: event.target.value });
    };

    componentDidMount() {
        const {
            importRequestId,
            onCreateTitle,
            getIR
        } = this.props;

        if (importRequestId) {
            onCreateTitle("Edit Call-Center Import Request");
            getIR(importRequestId);
        } else {
            onCreateTitle("Create Call-Center Import Request");
        }
    }

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to={CALLCENTER_IMPORT_REQUESTS_PAGE_PATH}/>;
        }
    };

    cancelHandler = (event) => {
        event.preventDefault();
        const newState = {
            sessionId: undefined,
            olxUrl: undefined,
            limit: undefined,
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
            sessionId: this.state.sessionId ? this.state.sessionId : this.props.sessionId,
            olxUrl: this.state.olxUrl ? this.state.olxUrl : this.props.olxUrl,
            limit: this.state.limit ? this.state.limit : this.props.limit
        };

        const {
            olxUrl,
            sessionId,
            limit
        } = converted;

        const urlError = olxUrl.search(OLX_URL_VALIDATE_REGEXP) === -1;

        if(urlError) {
            errors = true;
        }

        if(errors) {
            const errorState = {
                urlError
            };
            this.setState(errorState);
        } else {
            saveIR(olxUrl, sessionId, limit, importRequestId);
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
            olxUrl,
            importRequestId,
            sessionId,
            t,
            limit,
            loaded,
            error
        } = this.props;

        const {
            urlError
        } = this.state;

        if(!importRequestId) {
            limit = undefined;
            olxUrl = undefined;
            sessionId = undefined;
        }

        return (
            <Fragment key={t}>
                {(!loaded && error) && (<Alert severity="error">Such OLX URL already exists!</Alert>)}
                {((!error && loaded) || this.state.cancel) && this.renderRedirect()}
                <form onSubmit={this.IRSubmitHandler}>
                    <TextField
                        id="sessionId"
                        label="Session Id"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleSessionIdChange}
                        defaultValue={sessionId}
                        InputLabelProps={{shrink: true}}
                    />
                    <TextField
                        error={urlError}
                        id="olxUrl"
                        label="OLX URL"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleOlxUrlChange}
                        defaultValue={olxUrl}
                        InputLabelProps={{shrink: true}}
                    />
                    <TextField
                        id="limit"
                        label="Limit"
                        className={classes.textField}
                        margin="normal"
                        required
                        onChange={this.handleLimitChange}
                        defaultValue={limit}
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

CallCenterImportRequestForm.propTypes = {
    sessionId: string,
    limit: number,
    olxUrl: string,
    importRequestId: string,
    t: number,
    error: bool,
    loaded: bool
};

CallCenterImportRequestForm.defaultProps = {
    sessionId: undefined,
    limit: undefined,
    olxUrl: undefined,
    importRequestId: undefined,
    t: 0,
    error: false,
    loaded: false
};

const mapStateToProps = state => ({
    sessionId: state.callcenterImportRequests.single.sessionId,
    limit: state.callcenterImportRequests.single.limit,
    olxUrl: state.callcenterImportRequests.single.olxUrl,
    t: state.callcenterImportRequests.single.t,
    error: state.callcenterImportRequests.single.error,
    loaded: state.callcenterImportRequests.single.loaded
});

const mapDispatchToProps = dispatch => ({
    saveIR: (olxUrl, sessionId, limit, importRequestId = undefined) => {
        if(importRequestId) {
            dispatch(updateImportRequest({
                _id: importRequestId,
                sessionId,
                olxUrl,
                limit
            }))
        } else {
            dispatch(createImportRequest({olxUrl, limit, sessionId}));
        }
    },
    getIR: (id) => {
        dispatch(getImportRequest(id))
    },
    onCreateTitle: title => {
        dispatch(menuClick(title));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CallCenterImportRequestForm));
