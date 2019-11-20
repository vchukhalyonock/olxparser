import  { ImportRequestModel } from "../models";

class ImportRequestService {
    async setStatus(importRequest, status) {
        importRequest.status = status;
        await ImportRequestModel.updateOne({_id: importRequest._id}, importRequest).exec();
    }
}

export default ImportRequestService;