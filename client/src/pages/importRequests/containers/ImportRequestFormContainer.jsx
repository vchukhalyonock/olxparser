import React from "react";
import ImportRequestForm from "../components/importRequestFrom/ImportRequestForm";
import FormContainer from "../../../components/formContainer";

const ImportRequestsFormContainer = props => {

    const importRequestId = props.match.params.importRequestId;

    return (
        <FormContainer>
            <ImportRequestForm importRequestId={importRequestId}/>
        </FormContainer>
    )
};

export default ImportRequestsFormContainer;

