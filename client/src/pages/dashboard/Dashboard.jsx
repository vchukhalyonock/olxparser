import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
} from '@material-ui/core';
import {
    DashboardImportRequests,
    DashboardCallCenterImportRequests
} from "./components/dashboardImportRequests";
import {
    REQUEST_STATUS,
    CALLCENTER_REQUEST_STATUS
} from "../../constants/statuses";
import {
    GET_LAST_ERRORED_IMPORT_REQUEST,
    GET_LAST_NEW_IMPORT_REQUESTS,
    GET_LAST_PROCESSED_IMPORT_REQUEST,
    GET_LAST_ERRORED_CALL_CENTER_IMPORT_REQUEST,
    GET_LAST_NEW_CALL_CENTER_IMPORT_REQUESTS,
    GET_LAST_PROCESSED_CALL_CENTER_IMPORT_REQUEST
} from "../../constants/actions";

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
    root: {
        flexGrow: 1,
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    return (
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <DashboardCallCenterImportRequests
                            limit={10}
                            offset={0}
                            orderBy="requestedAt"
                            order="desc"
                            title="New Call Center Import Request"
                            filter={CALLCENTER_REQUEST_STATUS.NEW}
                            type={GET_LAST_NEW_CALL_CENTER_IMPORT_REQUESTS}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <DashboardCallCenterImportRequests
                            limit={10}
                            offset={0}
                            orderBy="requestedAt"
                            order="desc"
                            title="Last Processed Call Center Import Request"
                            filter={CALLCENTER_REQUEST_STATUS.DONE}
                            type={GET_LAST_PROCESSED_CALL_CENTER_IMPORT_REQUEST}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <DashboardCallCenterImportRequests
                            limit={10}
                            offset={0}
                            orderBy="requestedAt"
                            order="desc"
                            title="Last Error Call Center Import Request"
                            filter={CALLCENTER_REQUEST_STATUS.ERROR}
                            type={GET_LAST_ERRORED_CALL_CENTER_IMPORT_REQUEST}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <DashboardImportRequests
                            limit={10}
                            offset={0}
                            orderBy="requestedAt"
                            order="desc"
                            title="New Customer Import Requests"
                            filter={REQUEST_STATUS.NEW}
                            type={GET_LAST_NEW_IMPORT_REQUESTS}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <DashboardImportRequests
                            limit={10}
                            offset={0}
                            orderBy="processedAt"
                            order="desc"
                            title="Customer Processed Requests"
                            filter={REQUEST_STATUS.DONE}
                            type={GET_LAST_PROCESSED_IMPORT_REQUEST}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Paper className={classes.paper}>
                        <DashboardImportRequests
                            limit={10}
                            offset={0}
                            orderBy="processedAt"
                            order="desc"
                            title="Customer Requests with Errors"
                            filter={REQUEST_STATUS.ERROR}
                            type={GET_LAST_ERRORED_IMPORT_REQUEST}
                        />
                    </Paper>
                </Grid>
            </Grid>
    );
}