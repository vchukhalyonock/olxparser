import React from "react";
import {
    func,
    number,
    object
} from "prop-types";
import {
    Button,
    Grid,
    TextField,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    textFieldHeading: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 170,
    },
    deleteHeadingButton: {
        marginTop: '30px'
    }
}));

const SingleDetail = ({
        index,
        value,
        removeDetails,
        handleChange
}) => {


    const classes = useStyles();
    const measureFieldId = `detail-measure-${index}`;
    const valueFieldId = `detail-value-${index}`;

    return (
        <Grid
            container
            spacing={3}
        >
            <Grid item xs={4}>
                <TextField
                    id={measureFieldId}
                    label="Measure"
                    className={classes.textFieldHeading}
                    margin="normal"
                    required
                    defaultValue={value.measure}
                    InputLabelProps={{shrink: true}}
                    onChange={e => handleChange(e, measureFieldId)}
                />
            </Grid>
            <Grid item xs={5}>
                <TextField
                    id={valueFieldId}
                    label="Value"
                    className={classes.textFieldHeading}
                    margin="normal"
                    required
                    defaultValue={value.value}
                    InputLabelProps={{shrink: true}}
                    onChange={e => handleChange(e, valueFieldId)}
                />
            </Grid>
            <Grid item xs>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.deleteHeadingButton}
                    onClick={() => removeDetails(index)}
                >
                    -
                </Button>
            </Grid>
        </Grid>
    );
}

SingleDetail.propTypes = {
    index: number.isRequired,
    value: object.isRequired,
    removeDetails: func.isRequired,
    handleChange: func.isRequired
};

export default SingleDetail;