import React, { Component } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";
import {
    string,
    bool,
    func
} from "prop-types";

class Confirm extends Component {


    render() {
        const { title, message, isOpen } = this.props;
        return (
            <Dialog
                open={isOpen}
                onClose={this.props.disagreeHandler}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.disagreeHandler} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.props.agreeHandler} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

Confirm.propTypes = {
    title: string.isRequired,
    message: string.isRequired,
    isOpen: bool,
    agreeHandler: func.isRequired,
    disagreeHandler: func.isRequired
};

Confirm.defaultProps = {
    isOpen: false
};

export default Confirm;