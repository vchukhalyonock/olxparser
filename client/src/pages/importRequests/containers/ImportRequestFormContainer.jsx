import React, { Component } from "react";
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button,
    withStyles
} from "@material-ui/core";

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
                            <form>
                                <TextField
                                    id="email"
                                    label="Email"
                                    className={classes.textField}
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    id="olxLink"
                                    label="OLX Link"
                                    className={classes.textField}
                                    margin="normal"
                                    required
                                />
                                <div style={{"text-align": "right"}}>
                                    <Button variant="contained" className={classes.button}>Cancel</Button>
                                    <Button variant="contained" color="primary" className={classes.button}>Save</Button>
                                </div>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withStyles(styles)(ImportRequestsFormContainer);

