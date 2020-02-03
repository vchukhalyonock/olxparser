import React, { Component } from "react";
import {
    Container,
    Grid,
    Paper,
    Button, withStyles
} from "@material-ui/core";
import { saveAs } from "file-saver";
import moment from "moment";
import OffersTable from "../components/OffersTable";
import Search from "../../../components/search";
import rest, { DATA_TYPE } from "../../../utils/rest";
import { METHODS } from "../../../constants/methods";
import { EXPORT_YANDEX_MARKET_URL } from "../../../constants/urls";
import config from "../../../config";

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
        console.log("SelectedItems", this.state.selectedItems);
        const offersIds = this.state.selectedItems;
        const importRequestId = this.props.match.params.importRequestId;

        rest(
            `${config.backendUrl}${EXPORT_YANDEX_MARKET_URL}`,
            METHODS.POST,
            {
                importRequestId,
                offersIds
            },
            DATA_TYPE.XML
        ).then((response) => {
            const blob = new Blob([response], {type: "text/xml;charset=utf-8"});
            saveAs(blob, `${importRequestId}_export_${moment().format("DD_MM_YYYY_hh_mm")}.yml`);
        }).catch((error) => {
            console.log(error);
        });
    };

    exportAllHandler = () => {

    };

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
