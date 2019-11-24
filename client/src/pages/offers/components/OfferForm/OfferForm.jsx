import React,
{
    Component,
    Fragment
} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { toInteger } from "lodash";
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

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    },
    button: {
        margin: theme.spacing(1),
    },
});

class OfferForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            heading: undefined,
            link: undefined,
            caption: undefined,
            price: undefined,
            description: undefined
        };
    }

    componentDidMount() {
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
            link: undefined,
            caption: undefined,
            price: undefined,
            description: undefined
        };
        this.setState(newState);
        this.setRedirect();
        event.preventDefault();
    };

    OfferSubmitHandler = (event) => {
        const { offer, onUpdateOffer } = this.props;

        const newOffer = {
            heading: this.state.heading ? this.state.heading.split("/") : offer.heading,
            link: this.state.link ? this.state.link : offer.link,
            caption: this.state.caption ? this.state.caption : offer.caption,
            price: this.state.price ? toInteger(this.state.price) : offer.price,
            description: this.state.description ? this.state.description : offer.description,
            importRequestId: offer.importRequestId,
            images: offer.images,
            createdAt: offer.createdAt,
            _id: offer._id
        };

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
                <Fragment key={offer._id}>
                    {this.renderRedirect()}
                    <form onSubmit={this.OfferSubmitHandler}>
                        <TextField
                            id="caption"
                            label="Caption"
                            className={classes.textField}
                            margin="normal"
                            required
                            onChange={e => this.handleAllChange(e, "caption")}
                            defaultValue={offer.caption}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            id="link"
                            label="Link"
                            className={classes.textField}
                            margin="normal"
                            required
                            onChange={e => this.handleAllChange(e, "link")}
                            defaultValue={offer.link}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            className={classes.textField}
                            margin="normal"
                            required
                            multiline
                            rows={4}
                            onChange={e => this.handleAllChange(e, "description")}
                            defaultValue={offer.description}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            id="heading"
                            label="Heading"
                            className={classes.textField}
                            margin="normal"
                            required
                            onChange={e => this.handleAllChange(e, "heading")}
                            defaultValue={offer.heading ? offer.heading.join("/") : undefined}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            id="price"
                            label="Price"
                            className={classes.textField}
                            margin="normal"
                            required
                            onChange={e => this.handleAllChange(e, "price")}
                            defaultValue={toInteger(offer.price)}
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
