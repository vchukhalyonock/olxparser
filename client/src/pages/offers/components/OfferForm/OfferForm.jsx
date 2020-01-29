import React,
{
    Component,
    Fragment
} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { isObject } from "lodash";
import {
    Button,
    TextField,
    withStyles
} from "@material-ui/core";
import {
    string,
    object
} from "prop-types";
import {
    updateOffer,
    getOffer
} from "../../../../actions/offers";
import { OFFERS_PAGE_PATH } from "../../../../constants/router";
import { menuClick } from "../../../../actions/menu";
import { SingleHeadingContainer } from "../../../../components/singleHeading";
import SingleDetail from "../../../../components/singleDetail";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    },
    button: {
        margin: theme.spacing(1),
    }
});

class OfferForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            heading: undefined,
            link: undefined,
            title: undefined,
            price: undefined,
            description: undefined,
            images: undefined,
            details: undefined
        };

        const {
            offerId,
            onGetOffer
        } = this.props;
        onGetOffer(offerId);
    }


    setRedirect  = () => {
        this.setState({redirect: true});
    };

    renderRedirect = () => {
        const { offer } = this.props;
        if(this.state.redirect) {
            return <Redirect to={`${OFFERS_PAGE_PATH}/${offer.importRequestId}`}/>;
        }
    };

    cancelHandler = (event) => {
        const newState = {
            heading: undefined,
            url: undefined,
            title: undefined,
            price: undefined,
            description: undefined,
            images: undefined,
            details: undefined
        };
        this.setState(newState);
        this.setRedirect();
        event.preventDefault();
    };

    OfferSubmitHandler = (event) => {
        const { offer, onUpdateOffer } = this.props;

        const newOffer = {
            heading: this.state.heading ? this.state.heading.split("/") : offer.heading,
            url: this.state.url ? this.state.url : offer.url,
            title: this.state.title ? this.state.title : offer.title,
            price: this.state.price ? this.state.price : `${offer.price.amount.replace(' ', '')} ${offer.price.volume}`,
            description: this.state.description ? this.state.description : offer.description,
            importRequestId: offer.importRequestId,
            images: offer.images,
            details: this.state.details ? this.state.details.split("|") : offer.details,
            createdAt: offer.createdAt,
            _id: offer._id
        };

        newOffer.details = newOffer.details
            .map(detail => {
                if(!isObject(detail)) {
                    const parts = detail.split(":");
                    if (parts.length > 1) {
                        return {
                            measure: parts[0].trim(),
                            value: parts[1].trim()
                        }
                    }

                    return null;
                }
                return detail;
            })
            .filter(item => item != null);

        const priceParts = newOffer.price.split(" ");
        if(priceParts.length > 1) {
            newOffer.price = {
                amount: priceParts[0].trim(),
                volume: priceParts[1].trim()
            }
        }

        onUpdateOffer(newOffer);
        this.setRedirect();
        event.preventDefault();
    };

    handleAllChange = (event, fieldName) => {
        const newState = {};
        newState[fieldName] = event.target.value;
        this.setState(newState);
    };

    render() {
        const {
            offer,
            classes,
            onCreateTitle
        } = this.props;
        onCreateTitle(`Edit offer ${offer._id} for ${offer.importRequest ? offer.importRequest.email : undefined} account`);

        if(offer) {
            return (
                <Fragment key={offer.t}>
                    {this.renderRedirect()}
                    <form onSubmit={this.OfferSubmitHandler}>
                        <TextField
                            id="title"
                            label="title"
                            className={classes.textField}
                            margin="normal"
                            required
                            onChange={e => this.handleAllChange(e, "title")}
                            defaultValue={offer.title}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            id="url"
                            label="url"
                            className={classes.textField}
                            margin="normal"
                            required
                            onChange={e => this.handleAllChange(e, "url")}
                            defaultValue={offer.url}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            className={classes.textField}
                            margin="normal"
                            multiline
                            rows={4}
                            onChange={e => this.handleAllChange(e, "description")}
                            defaultValue={offer.description}
                            InputLabelProps={{shrink: true}}
                        />
                        <hr/>
                        <SingleHeadingContainer
                            heading={offer.heading ? offer.heading : []}
                        />
                        <hr/>
                        <h3>Details</h3>
                        {offer.details && offer.details.map((item, index) => (
                            <SingleDetail index={index} value={item} key={index}/>
                        ))}
                        <Button variant="contained" color="primary">+</Button>
                        <hr/>
                        <TextField
                            id="price"
                            label="Price"
                            className={classes.textField}
                            margin="normal"
                            onChange={e => this.handleAllChange(e, "price")}
                            defaultValue={offer.price ? `${offer.price.amount.replace(' ', '')} ${offer.price.volume}` : ''}
                            InputLabelProps={{shrink: true}}
                        />
                        <div style={{textAlign: "right"}}>
                            <Button variant="contained" className={classes.button}
                                    onClick={this.cancelHandler}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary"
                                    className={classes.button}>Save</Button>
                        </div>
                    </form>
                </Fragment>
            );
        } else {
            return undefined;
        }
    }
}

OfferForm.propTypes = {
    offer: object.isRequired,
    offerId: string.isRequired,
};

OfferForm.defaultProps = {
    offer: undefined,
    offerId: ''
};

const mapStateToProps = state => ({
    offer: state.offers.single
});

const mapDispatchToProps = dispatch => ({
    onGetOffer: offerId => {
        dispatch(getOffer(offerId));
    },
    onCreateTitle: title => {
        dispatch(menuClick(title));
    },
    onUpdateOffer: offer => {
        dispatch(updateOffer(offer));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OfferForm));
