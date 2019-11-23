import React from "react";
import {
    Container,
    Grid,
    makeStyles,
    Paper
} from "@material-ui/core";
import OfferDetails from "../components/OfferDetails";

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

export default (props) => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={10}/>
                <Grid item xs={2} />
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <OfferDetails offerId={props.match.params.offerId}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
