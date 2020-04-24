import React, {
    Component,
    Fragment
} from "react";
import {
    func,
    number,
    object
} from "prop-types";
import {
    Button,
    Grid,
    TextField,
    withStyles
} from "@material-ui/core";
import { concat } from "lodash";
import SingleDetailValue from "./SingleDetailValue";

const styles = theme => ({
    textFieldHeading: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
    deleteHeadingButton: {
        marginTop: '30px'
    }
});

class SingleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            localValues: []
        }
    }

    componentDidMount() {
        const {
            index,
            value,
            handleChange
        } = this.props;
        const localValues = value.value.map((vItem, vIndex) => (
            <SingleDetailValue
                key={vIndex}
                removeValue={this.handleRemoveDetailValue}
                handleChange={handleChange}
                index={vIndex}
                dIndex={index}
                value={vItem}
            />
        ));
        this.setState({localValues});
    }

    handleRemoveDetailValue = (index, vIndex) => {
        const { localValues } = this.state;
        const { removeDetailsValue } = this.props;
        const newLocalValues = localValues.filter(item => item.props.index !== vIndex);
        this.setState({localValues: newLocalValues});
        removeDetailsValue(index, vIndex);
    };

    handleAddDetailValue = (index) => {
        const { localValues } = this.state;
        const { handleChange } = this.props;
        const vIndex = localValues.length > 0
            ? localValues[localValues.length - 1].props.index + 1
            : 0;
        const newLocalValue = (
            <SingleDetailValue
                key={vIndex}
                removeValue={this.handleRemoveDetailValue}
                handleChange={handleChange}
                index={vIndex}
                dIndex={index}
                value=""
            />
        );
        const newLocalValues = concat(localValues, newLocalValue);
        this.setState({localValues: newLocalValues});
    };

    render() {
        const {
            props: {
                index,
                value,
                removeDetails,
                handleChange,
                classes
            },
            state: {
                localValues
            }
        } = this;

        const measureFieldId = `detail-measure-${index}`;

        return (
            <Fragment>
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
                        {localValues}
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
                <Grid container spacing={3}>
                    <Grid item xs={4}/>
                    <Grid item xs>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => this.handleAddDetailValue(index)}
                        >
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

SingleDetail.propTypes = {
    index: number.isRequired,
    value: object.isRequired,
    removeDetails: func.isRequired,
    handleChange: func.isRequired,
    removeDetailsValue: func.isRequired
};

export default withStyles(styles)(SingleDetail);
