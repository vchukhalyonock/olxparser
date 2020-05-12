import React from "react";
import CallCenterImportRequestForm from "../components/CallCenterImportRequestForm";
import FormContainer from "../../../components/formContainer";

const CallCenterImportRequestsFormContainer = props => {

    const importRequestId = props.match.params.importRequestId;

    return (
        <FormContainer>
            <CallCenterImportRequestForm importRequestId={importRequestId}/>
        </FormContainer>
    )
};

export default CallCenterImportRequestsFormContainer;

