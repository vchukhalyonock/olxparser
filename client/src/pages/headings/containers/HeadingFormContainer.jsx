import React  from "react";
import HeadingForm from "../components/headingForm";
import FormContainer from "../../../components/formContainer";

const HeadingFormContainer = props => {
    const headingId = props.match.params.headingId;

    return (
        <FormContainer>
            <HeadingForm headingId={headingId}/>
        </FormContainer>
    )
};

export default HeadingFormContainer;
