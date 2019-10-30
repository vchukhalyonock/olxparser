import React, { Component } from "react";
import {
    Container,
    Grid,
    Paper,
    withStyles
} from "@material-ui/core";
import ImportRequestForm from "../components/importRequestFrom/ImportRequestForm";

const styles = theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    },
    button: {
        margin: theme.spacing(1),
    },
});

class ImportRequestsFormContainer extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Container  maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <ImportRequestForm />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withStyles(styles)(ImportRequestsFormContainer);

