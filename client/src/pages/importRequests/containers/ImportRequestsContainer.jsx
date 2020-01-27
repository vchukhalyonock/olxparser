import React, { Component } from "react";
import {
    Container,
    Grid,
    Paper,
    Button,
    withStyles
} from "@material-ui/core";
import ImportRequestsTable from "../components/ImportRequestsTable";
import ListItemLink from "../../../components/listItemLink";
import Search from "../../../components/search/Search";
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

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    onChangeSearchHandler = (e) => {
        this.setState({search: e.target.value});
    };

    getSearchString = () => {
        return this.state.search;
    };

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={6}/>
                    <Search onChange={this.onChangeSearchHandler}/>
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
                            <ImportRequestsTable getSearchString={this.getSearchString}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        );
    }
}

export default withStyles(styles)(ImportRequestsContainer);
