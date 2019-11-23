import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
    string,
    object
} from "prop-types";
import {
    Breadcrumbs,
    Typography,
    GridList,
    GridListTile,
    Button,
    Grid,
    withStyles,
} from "@material-ui/core";
import { getOffer } from "../../../../actions/offers";
import ListItemLink from "../../../../components/listItemLink";
import { OFFERS_PAGE_PATH } from "../../../../constants/router";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 800
    },
});

class OfferDetails extends Component {

    componentDidMount() {
        const { offerId, onGetOffer } = this.props;
        onGetOffer(offerId);
    }

    render() {
        const {
            offer: {
                caption,
                heading,
                description,
                price,
                images,
                importRequestId
            },
            classes } = this.props;

        return(
            <Fragment>
                <h1>{caption}</h1>
                {heading
                    ? (<Breadcrumbs>
                        {heading.map((item, index) => (<Typography key={index}>{item}</Typography>))}
                    </Breadcrumbs>)
                    : undefined
                }
                <p>{description}</p>
                <p><strong>{price} UAH</strong></p>
                {images
                    ? (<div className={classes.root}>
                        <GridList cellHeight={160} className={classes.gridList} cols={5}>
                            {images.map(tile => (
                                <GridListTile key={tile} cols={1}>
                                    <img src={tile} alt={caption} />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>)
                    : undefined
                }
                <Grid container spacing={3}>
                    <Grid item xs={10}/>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            component={ListItemLink}
                            to={`${OFFERS_PAGE_PATH}/${importRequestId}`}
                        >
                            Back to Offers
                        </Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

OfferDetails.propTypes = {
    offerId: string.isRequired,
    offer: object.isRequired
};

OfferDetails.defaultProps = {
    offerId: '',
    offer: undefined
};

const mapStateToProps = state => ({
    offer: state.offers.single
});


const mapDispatchToProps = dispatch => ({
   onGetOffer: offerId => {
       dispatch(getOffer(offerId));
   }
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OfferDetails));
