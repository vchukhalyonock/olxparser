import React from "react";
import {
    func,
    number,
    string
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
        width: 300,
    },
    deleteHeadingButton: {
        marginTop: '30px'
    }
}));


const SingleDetailValue = ({
        dIndex,
        index,
        value,
        removeValue,
        handleChange
    }) => {

    const classes = useStyles();
    const valueFieldId = `detail-${dIndex}-value-${index}`;

    return (
        <Grid
            container
            spacing={3}
        >
            <Grid item xs={9}>
                <TextField
                    id={valueFieldId}
                    label="Measure"
                    className={classes.textFieldHeading}
                    margin="normal"
                    required
                    defaultValue={value}
                    InputLabelProps={{shrink: true}}
                    onChange={e => handleChange(e, valueFieldId)}
                />
            </Grid>
            <Grid item xs>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.deleteHeadingButton}
                    onClick={() => removeValue(dIndex, index)}
                >
                    -
                </Button>
            </Grid>
        </Grid>
    );
};

SingleDetailValue.propTypes = {
    dIndex: number.isRequired,
    index: number.isRequired,
    value: string.isRequired,
    removeValue: func.isRequired,
    handleChange: func.isRequired
};

export default SingleDetailValue;
