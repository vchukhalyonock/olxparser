import React,
{
    Component,
    Fragment
} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    concat
} from "lodash";
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
import { OfferDetailContainer } from "../../../../components/offerDetail";
import HeadingsSelector from "../../../../components/headingsSelector";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 900,
    },
    button: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
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
            srcImages: undefined,
            details: undefined,
            region: undefined,
            city: undefined,
            offerId: undefined,
            phone: undefined
        };

        const {
            offerId,
            onGetOffer
        } = this.props;
        onGetOffer(offerId);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.offer !== this.props.offer) {
            if(nextProps.offer.heading) {
                const newHeading = nextProps.offer.heading.map((item, index) => ({
                    index,
                    value: item
                }));
                this.setState({heading: newHeading});
            }

            if(nextProps.offer.details) {
                const newDetails = nextProps.offer.details.map((item, index) => ({
                    index,
                    measure: item.measure,
                    value: item.value.map((vItem, vIndex) => ({
                        index: vIndex,
                        value: vItem
                    }))
                }));
                this.setState({details: newDetails});
            }
        }
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
            srcImages: undefined,
            details: undefined,
            region: undefined,
            city: undefined,
            offerId: undefined,
            phone: undefined
        };
        this.setState(newState);
        this.setRedirect();
        event.preventDefault();
    };

    OfferSubmitHandler = (event) => {
        const { offer, onUpdateOffer } = this.props;

        const newOffer = {
            headingId: this.state.heading ? this.state.heading.value : offer.headingId,
            headingString: this.state.heading ? this.state.heading.option : offer.headingString,
            url: this.state.url ? this.state.url : offer.url,
            title: this.state.title ? this.state.title : offer.title,
            price: this.state.price ? this.state.price : `${offer.price.amount.replace(' ', '')} ${offer.price.volume}`,
            description: this.state.description ? this.state.description : offer.description,
            importRequestId: offer.importRequestId,
            images: offer.images,
            srcImages: offer.srcImages,
            details: this.state.details.map(item => ({
                measure: item.measure,
                value: item.value.map(vItem => vItem.value)
            })),
            region: this.state.region ? this.state.region : offer.region,
            city: this.state.city ? this.state.city : offer.city,
            offerId: this.state.offerId ? this.state.offerId : offer.offerId,
            phone: this.state.phone ? this.state.phone : offer.phone,
            createdAt: offer.createdAt,
            _id: offer._id
        };

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

    handleDetailsChange = (event, detailsFieldId) => {
        const { details } = this.state;
        let newDetails = details === undefined ? [] : details.map(item => item);
        const match = detailsFieldId.match(/detail-((measure)-([0-9]+))|(([0-9]+)-(value)-([0-9]+))/);
        const fieldType = match[2] ? match[2] : match[6];
        const index = match[3] ? +match[3] : +match[5];
        const vIndex = +match[7];
        const detailItemArray = newDetails.filter(item => item.index === index);
        const detailItem = detailItemArray.length > 0
            ? detailItemArray[0]
            : {
                index,
                value: [
                        { index: 0, value: ''}
                    ]
            } ;
        if(fieldType === 'measure') {
            detailItem.measure = event.target.value;
        } else {
            const detailsValueArray = detailItem.value.filter(vItem => vItem.index === vIndex);
            if(detailsValueArray.length === 0) {
                detailItem.value = concat(detailItem.value, [{index: vIndex, value: event.target.value}]);
            } else {
                detailItem.value = detailItem.value.map(vItem => {
                    if(vItem.index === vIndex) {
                        vItem.value = event.target.value;
                    }
                    return vItem;
                })
            }
        }

        if(detailItemArray.length === 0) {
            newDetails = concat(newDetails, detailItem);
        } else {
            newDetails = newDetails.map(item => item.index === +index ? detailItem : item);
        }

        this.setState({details: newDetails});
    };

    handleHeadingChange = (event, headingFieldId) => {
        const { heading } = this.state;
        let newHeading = heading === undefined ? [] : heading.map(item => item);
        const index = headingFieldId.match(/heading-([0-9]+)/)[1];
        const headingItem = {
            index,
            value: event.target.value
        };
        let changed = false;
        newHeading = newHeading.map(item => {
            if(item.index === index) {
                item.value = headingItem.value;
                changed = true;
            }

            return item;
        });

        if(!changed) {
            newHeading = concat(newHeading, headingItem);
        }

        this.setState({heading: newHeading});
    };


    handleRemoveDetailItem = (index) => {
        const { details } = this.state;
        const newDetails = details.filter(item => +item.index !== index);
        this.setState({ details: newDetails });
    };


    handleRemoveDetailsValue = (index, vIndex) => {
        const { details } = this.state;
        const newDetails = details.map(item => {
            if(item.index === index) {
                item.value = item.value.filter(value => +value.index !== vIndex);
            }
            return item;
        });
        this.setState({ details: newDetails });
    };


    handleHeadingsSelect = (e, value) => {
        this.setState({ heading: value });
    };

    render() {
        const {
            offer,
            classes,
            onCreateTitle
        } = this.props;

        onCreateTitle(`Edit offer ${offer._id} for ${offer.importRequest ? offer.importRequest.email : undefined} account`);

        if(offer) {
            const currentHeading = {
                value: offer.headingId,
                option: offer.headingString
            };
            return (
                <Fragment key={offer.t}>
                    {this.renderRedirect()}
                    <form onSubmit={this.OfferSubmitHandler}>
                        <TextField
                            id="title"
                            label="Title"
                            className={classes.textField}
                            margin="normal"
                            required
                            onChange={e => this.handleAllChange(e, "title")}
                            defaultValue={offer.title}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            id="offerId"
                            label="offer id"
                            className={classes.textField}
                            margin="normal"
                            onChange={e => this.handleAllChange(e, "offerId")}
                            defaultValue={offer.offerId}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            id="phone"
                            label="Phone"
                            className={classes.textField}
                            margin="normal"
                            onChange={e => this.handleAllChange(e, "phone")}
                            defaultValue={offer.phone}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            id="city"
                            label="city"
                            className={classes.textField}
                            margin="normal"
                            onChange={e => this.handleAllChange(e, "city")}
                            defaultValue={offer.city}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            id="region"
                            label="region"
                            className={classes.textField}
                            margin="normal"
                            onChange={e => this.handleAllChange(e, "region")}
                            defaultValue={offer.region}
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
                        <HeadingsSelector
                            id="headings"
                            onChange={this.handleHeadingsSelect}
                            currentHeading={currentHeading}
                        />
                        <OfferDetailContainer
                            details={offer.details ? offer.details : []}
                            handleChange={this.handleDetailsChange}
                            removeDetailItem={this.handleRemoveDetailItem}
                            removeDetailValue={this.handleRemoveDetailsValue}
                        />
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
    offerId: string.isRequired
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
