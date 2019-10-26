import React from "react";
import {
    Container,
    Grid,
    makeStyles,
    Paper
} from "@material-ui/core";
import ImportRequestsTable from "../components/ImportRequestsTable";

const useStyles = makeStyles(theme => ({
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
}));

export default () => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <ImportRequestsTable />
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    );
};
