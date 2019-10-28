import React from "react";
import {
    Container,
    Grid,
    makeStyles,
    Paper,
    Button,
} from "@material-ui/core";
import ImportRequestsTable from "../components/ImportRequestsTable";
import ListItemLink from "../../../components/listItemLink";
import { CREATE_IMPORT_REQUEST_PAGE_PATH } from "../../../constants/router";

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
    button: {
        margin: theme.spacing(1)
    },
}));

export default () => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={10}/>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        className={classes.button}
                        component={ListItemLink}
                        to={CREATE_IMPORT_REQUEST_PAGE_PATH}
                    >
                        Create IR
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <ImportRequestsTable />
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    );
};
