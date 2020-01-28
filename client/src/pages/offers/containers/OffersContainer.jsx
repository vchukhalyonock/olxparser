import React, { Component } from "react";
import {
    Container,
    Grid,
    Paper,
    Button, withStyles
} from "@material-ui/core";
import OffersTable from "../components/OffersTable";
import Search from "../../../components/search";

const styles  = theme => ({
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

class OffersContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            numSelected: 0,
            selectedItems: []
        }
    }

    onChangeSearchHandler = (e) => {
        this.setState({search: e.target.value});
    };

    getSearchString = () => {
        return this.state.search;
    };

    componentWillUnmount() {
        this.setState({
           numSelected: 0,
           selectedItems: []
        });
    }

    offerCheckBoxHandler = (id) => {
        const { selectedItems } = this.state;
        let index;
        if((index = selectedItems.indexOf(id)) < 0) {
            selectedItems.push(id);
        } else {
            selectedItems.splice(index, 1);
        }

        this.setState({selectedItems, numSelected: selectedItems.length});
    };

    offerCheckBoxSelectAllHandler = (allIds) => {
        const { numSelected } = this.state;
        let selectedItems = [];
        if (numSelected > 0) {
            selectedItems.length = 0;
        } else {
            selectedItems = allIds;
        };

        this.setState({selectedItems, numSelected: selectedItems.length});
    };

    exportSelectedHandler = () => {

    };

    exportAllHandler = () => {

    }

    render() {
        const { classes } = this.props;
        const { numSelected, selectedItems } = this.state;

        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={4}/>
                    <Search onChange={this.onChangeSearchHandler}/>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            className={classes.button}
                            onClick={this.exportSelectedHandler}
                            to=''
                        >
                            Export Selected
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            className={classes.button}
                            onClick={this.exportAllHandler}
                            to=''
                        >
                            Export All
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <OffersTable
                                importRequestId={this.props.match.params.importRequestId}
                                getSearchString={this.getSearchString}
                                numSelected={numSelected}
                                selectedItems={selectedItems}
                                offerCheckBoxHandler={this.offerCheckBoxHandler}
                                offerCheckBoxSelectAllHandler={this.offerCheckBoxSelectAllHandler}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
};

export default withStyles(styles)(OffersContainer);
