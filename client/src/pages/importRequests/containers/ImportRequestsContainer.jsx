import React, { Component } from "react";
import {
    Container,
    Grid,
    Paper,
    Button,
    OutlinedInput,
    InputAdornment,
    withStyles
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";
import ImportRequestsTable from "../components/ImportRequestsTable";
import ListItemLink from "../../../components/listItemLink";
import { CREATE_IMPORT_REQUEST_PAGE_PATH } from "../../../constants/router";

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
    button: {
        margin: theme.spacing(1)
    },
});

class ImportRequestsContainer extends Component {

    onChangeSearchHandler = (e) => {

    };

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={6}/>
                    <Grid item xs={4}>
                        <OutlinedInput
                            id="search"
                            label="Search"
                            type="search"
                            fullWidth={80}
                            startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                            onChange={this.onChangeSearchHandler}
                        />
                    </Grid>
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
    }
}

export default withStyles(styles)(ImportRequestsContainer);
