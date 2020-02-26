import React from "react";
import {
    Container,
    Grid,
    Paper,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(
    theme => ({
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        }
    })
);

const FormContainer = ({ children }) => {

    const classes = useStyles();

    return (
        <Container  maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        {children}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};


export default FormContainer;
