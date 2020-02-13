import React, { Component } from "react";
import {
    Container,
    Grid,
    Paper,
    Button,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    withStyles
} from "@material-ui/core";
import ImportRequestsTable from "../components/ImportRequestsTable";
import ListItemLink from "../../../components/listItemLink";
import Search from "../../../components/search/Search";
import { CREATE_IMPORT_REQUEST_PAGE_PATH } from "../../../constants/router";
import { filterItems } from "../../../constants/common";

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
    formControl: {
        margin: theme.spacing(1.5),
        minWidth: 200,
    },
});


class ImportRequestsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filter: filterItems[0].value
        }
    }

    onChangeSearchHandler = (e) => {
        this.setState({search: e.target.value});
    };

    getSearchString = () => {
        return this.state.search;
    };

    getFilterString = () => {
        return this.state.filter;
    };

    onChangeFilterHandler = (e) => {
        this.setState({filter: e.target.value});
    };

    render() {
        const { classes } = this.props;
        const { filter } = this.state;

        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={3}/>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="filter-select">Filter</InputLabel>
                        <Select
                            id="filter-select"
                            onChange={this.onChangeFilterHandler}
                            labelWidth={32}
                            value={filter}
                        >
                            {filterItems.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                            <ImportRequestsTable
                                getSearchString={this.getSearchString}
                                getFilterString={this.getFilterString}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        );
    }
}

export default withStyles(styles)(ImportRequestsContainer);
