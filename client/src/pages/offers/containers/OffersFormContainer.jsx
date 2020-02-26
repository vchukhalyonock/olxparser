import React from "react";
import OfferForm from "../components/OfferForm";
import FormContainer from "../../../components/formContainer";

const OffersFormContainer = props => {

    const offerId = props.match.params.offerId;

    return (
        <FormContainer>
            <OfferForm offerId={offerId}/>
        </FormContainer>
    )
};

export default OffersFormContainer;
