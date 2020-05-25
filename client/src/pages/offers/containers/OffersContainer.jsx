import React, {
    Component,
    Fragment
} from "react";
import { connect } from "react-redux";
import {
    uniq,
    concat,
    remove
} from "lodash";
import {
    Container,
    Grid,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withStyles
} from "@material-ui/core";
import { saveAs } from "file-saver";
import moment from "moment";
import OffersTable from "../components/OffersTable";
import Search from "../../../components/search";
import rest, { DATA_TYPE } from "../../../utils/rest";
import { METHODS } from "../../../constants/methods";
import {
    EXPORT_YANDEX_MARKET_URL,
    EXPORT_CALL_CENTER_URL
} from "../../../constants/urls";
import config from "../../../config";
import Alert from "../../../components/alert";
import {
    EXPORT_OFFERS_ALERT,
    EXPORT_OFFERS_ERROR
} from "../../../constants/notifications";
import HeadingsSelector from "../../../components/headingsSelector";
import { setOffersHeading } from "../../../actions/offers";

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
            selectedItems: [],
            openAlert: false,
            openSetHeading: false,
            alertErrorMessage: '',
            selectedHeading: undefined
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
           selectedItems: []
        });
    }

    offerCheckBoxHandler = (id) => {
        const { selectedItems } = this.state;
        let newSelectedItems;
        if(selectedItems.indexOf(id) < 0) {
            newSelectedItems = concat(selectedItems, [id])
        } else {
            newSelectedItems = remove(selectedItems, value => id !== value);
        }

        this.setState({ selectedItems: newSelectedItems });
    };

    offerCheckBoxSelectAllHandler = (allIds, currentSelectedNums) => {
        let { selectedItems } = this.state;
        if (currentSelectedNums > 0) {
            selectedItems = selectedItems.filter(item => !allIds.includes(item));
        } else {
            selectedItems = uniq(concat(selectedItems, allIds));
        }

        this.setState({ selectedItems });
    };

    openHeadingSelectedHandler = () => {
        this.setState({ openSetHeading: true });
    };

    closeHeadingSelectedHandler = () => {
        this.setState({ openSetHeading: false });
    };

    exportSelectedHandler = () => {
        const offersIds = this.state.selectedItems;
        const {
            importRequestId,
            isCallCenterImportRequest
        } = this.props.match.params

        if(offersIds.length === 0) {
            this.openExportAlert("Please, select offers!");
        } else {
            if(+isCallCenterImportRequest === 0) {
                rest(
                    `${config.backendUrl}${EXPORT_YANDEX_MARKET_URL}`,
                    METHODS.POST,
                    {
                        importRequestId,
                        offersIds
                    },
                    DATA_TYPE.XML
                ).then((response) => {
                    if (response) {
                        const blob = new Blob([response], {type: "text/xml;charset=utf-8"});
                        saveAs(blob, `${importRequestId}_export_${moment().format("DD_MM_YYYY_hh_mm")}.xml`);
                    } else {
                        this.openExportAlert(EXPORT_OFFERS_ERROR);
                    }
                }).catch((error) => {
                    console.log(error);
                    this.openExportAlert(error);
                });
            } else {
                rest(
                    `${config.backendUrl}${EXPORT_CALL_CENTER_URL}`,
                    METHODS.POST,
                    {
                        importRequestId,
                        offersIds
                    },
                    DATA_TYPE.JSON
                ).then((response) => {
                    if(!response) {
                        this.openExportAlert(EXPORT_OFFERS_ERROR);
                    }
                }).catch((error) => {
                    console.log(error);
                    this.openExportAlert(error);
                });
            }
        }
    };

    exportAllHandler = () => {
        const {
            importRequestId,
            isCallCenterImportRequest
        } = this.props.match.params;

        if(+isCallCenterImportRequest === 0) {
            rest(
                `${config.backendUrl}${EXPORT_YANDEX_MARKET_URL}`,
                METHODS.POST,
                {
                    importRequestId,
                    offersIds: []
                },
                DATA_TYPE.XML
            ).then((response) => {
                if (response) {
                    const blob = new Blob([response], {type: "text/xml;charset=utf-8"});
                    saveAs(blob, `${importRequestId}_export_all_${moment().format("DD_MM_YYYY_hh_mm")}.xml`);
                } else {
                    this.openExportAlert(EXPORT_OFFERS_ERROR);
                }
            }).catch((error) => {
                console.log(error);
                this.openExportAlert(error);
            });
        } else {
            rest(
                `${config.backendUrl}${EXPORT_CALL_CENTER_URL}`,
                METHODS.POST,
                {
                    importRequestId,
                    offersIds: []
                },
                DATA_TYPE.JSON
            ).then((response) => {
                if(!response) {
                    this.openExportAlert(EXPORT_OFFERS_ERROR);
                }
            }).catch((error) => {
                console.log(error);
                this.openExportAlert(error);
            });
        }
    };


    openExportAlert = (error) => {
        const state = {
            openAlert: true,
            alertErrorMessage: error
        };

        this.setState(state);
    };


    closeExportAlertHandler = () => {
        this.setState({
            openAlert: false,
            selectedHeading: false
        });
    };


    handleHeadingsSelect = (e, value) => {
        this.setState({ selectedHeading: value });
    };


    handleSetOffersHeading = (e) => {
        e.preventDefault();

        const {
            selectedItems,
            selectedHeading
        } = this.state;

        const { onSetOffersHeading } = this.props;

        if(selectedItems.length === 0 || !selectedHeading) {
            this.closeHeadingSelectedHandler();
            return;
        }

        onSetOffersHeading(selectedItems, selectedHeading);
        this.setState({selectedItems: []});
        this.closeHeadingSelectedHandler();
    };

    render() {
        const { classes } = this.props;
        const {
            selectedItems,
            openSetHeading
        } = this.state;

        return (
            <Fragment>
                <Dialog
                    open={openSetHeading}
                    onClose={() => {}}
                    aria-labelledby="form-dialog-title"
                >
                    <form onSubmit={this.handleSetOffersHeading}>
                        <DialogTitle id="form-dialog-title">Set Heading to Selected Offers</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Select Heading and set it to selected offers.
                            </DialogContentText>

                                <HeadingsSelector
                                    id="headings"
                                    onChange={this.handleHeadingsSelect}
                                />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeHeadingSelectedHandler} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Do It!
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Alert
                    message={`${EXPORT_OFFERS_ALERT} ${this.state.alertErrorMessage}`}
                    title="Alert"
                    closeHandler={this.closeExportAlertHandler}
                    isOpen={this.state.openAlert}
                />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}/>
                        <Search onChange={this.onChangeSearchHandler}/>
                        <Grid item xs={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                className={classes.button}
                                onClick={this.openHeadingSelectedHandler}
                                to=''
                            >
                                Set Heading
                            </Button>
                        </Grid>
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
                                    selectedItems={selectedItems}
                                    offerCheckBoxHandler={this.offerCheckBoxHandler}
                                    offerCheckBoxSelectAllHandler={this.offerCheckBoxSelectAllHandler}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    onSetOffersHeading: (offers, heading) => {
        dispatch(setOffersHeading(offers, heading));
    }
});


export default connect(null, mapDispatchToProps)(withStyles(styles)(OffersContainer));
