import React from "react";
import {
    number,
    string,
    func
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
        width: 400,
    },
    deleteHeadingButton: {
        marginTop: '30px'
    }
}));

const SingleHeading = ({
        index,
        value,
        removeHeading,
        handleChange
}) => {
    const classes = useStyles();
    const fieldId = `heading-${index}`;

    return (
        <Grid
            container
            spacing={3}
        >
            <Grid item xs={9}>
                <TextField
                    id={fieldId}
                    label="Heading"
                    className={classes.textFieldHeading}
                    margin="normal"
                    required
                    defaultValue={value}
                    InputLabelProps={{shrink: true}}
                    onChange={e => handleChange(e, fieldId)}
                />
            </Grid>
            <Grid item xs>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.deleteHeadingButton}
                    onClick={() => removeHeading(index)}
                >
                    -
                </Button>
            </Grid>
        </Grid>
    );
}

SingleHeading.propTypes = {
    index: number.isRequired,
    value: string.isRequired,
    removeHeading: func.isRequired,
    handleChange: func.isRequired
};

export default SingleHeading;