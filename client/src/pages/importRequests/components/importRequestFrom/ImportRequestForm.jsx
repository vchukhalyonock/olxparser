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
    createImportRequest,
    updateImportRequest
} from "../../../../actions/importRequests";
import { IMPORT_REQUESTS_PAGE_PATH } from "../../../../constants/router";
import { getImportRequest } from "../../../../actions/importRequests";
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

class ImportRequestForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            email: undefined,
            phone: undefined,
            olxAccountUrl: undefined
        }
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    handlePhoneChange = (event) => {
        this.setState({phone: event.target.value});
    };

    handleOlxAccountUrlChange = (event) => {
        this.setState({olxAccountUrl: event.target.value});
    };

    componentDidMount() {
        const { importRequestId } = this.props;
        if (importRequestId) {
            this.props.onCreateTitle("Edit Import Request");
            this.props.getIR(importRequestId);
        } else {
            this.props.onCreateTitle("Create Import Request");
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
        this.setState({
            email: undefined,
            phone: undefined,
            olxAccountUrl: undefined
        });
        this.setRedirect();
        event.preventDefault();
    };


    IRSubmitHandler = (event) => {

        const converted = {
            email: this.state.email ? this.state.email : this.props.email,
            phone: this.state.phone ? this.state.phone : this.props.phone,
            olxAccountUrl: this.state.olxAccountUrl ? this.state.olxAccountUrl : this.props.olxAccountUrl
        };

        const { email, phone, olxAccountUrl } = converted;
        const { importRequestId } = this.props;
        this.props.saveIR(email, phone, olxAccountUrl, importRequestId);
        this.setRedirect();
        event.preventDefault();
    };

    render() {
        let {
            classes,
            email,
            olxAccountUrl,
            importRequestId,
            phone,
            t
        } = this.props;
        if(!importRequestId) {
            email = undefined;
            olxAccountUrl = undefined;
        }

        return (
            <Fragment key={t}>
                {this.renderRedirect()}
                <form onSubmit={this.IRSubmitHandler}>
                    <TextField
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
    email: string,
    phone: string,
    olxAccountUrl: string,
    importRequestId: string,
    t: number
};

ImportRequestForm.defaultProps = {
    email: undefined,
    phone: undefined,
    olxAccountUrl: undefined,
    importRequestId: undefined,
    t: 0
};

const mapStateToProps = state => ({
    email: state.importRequests.single.email,
    phone: state.importRequests.single.phone,
    olxAccountUrl: state.importRequests.single.olxAccountUrl,
    t: state.importRequests.single.t,
});

const mapDispatchToProps = dispatch => ({
    saveIR: (email, phone, olxAccountUrl, importRequestId = undefined) => {
        if(importRequestId) {
            dispatch(updateImportRequest({
                _id: importRequestId,
                email,
                olxAccountUrl,
                phone
            }))
        } else {
            dispatch(createImportRequest({email, olxAccountUrl, phone}));
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
