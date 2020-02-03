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

class Alert extends Component {
    render() {
        const {
            title,
            message,
            isOpen,
            closeHandler
        } = this.props;
        return (
            <Dialog
                open={isOpen}
                onClose={closeHandler}
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
                    <Button onClick={closeHandler} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

Alert.propTypes = {
    title: string.isRequired,
    message: string.isRequired,
    isOpen: bool,
    closeHandler: func.isRequired
};

Alert.defaultProps = {
    isOpen: false
};



export default Alert;
