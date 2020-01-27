import React, { Component } from "react";
import {
    Container,
    Grid,
    Paper,
    Button, withStyles
} from "@material-ui/core";
import OffersTable from "../components/OffersTable";
import Search from "../../../components/search";
import ListItemLink from "../../../components/listItemLink";

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
                    <Grid item xs={4}/>
                    <Search onChange={this.onChangeSearchHandler}/>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            className={classes.button}
                            component={ListItemLink}
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
                            component={ListItemLink}
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
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
};

export default withStyles(styles)(OffersContainer);
