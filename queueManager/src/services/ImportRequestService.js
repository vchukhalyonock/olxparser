import {
    ImportRequestModel,
    REQUEST_STATUS
} from "../models";
import OffersService from "./OffersService";
import OlxService from "./olx";

class ImportRequestService {
    async setStatus(importRequest, status) {
        importRequest.status = status;
        await ImportRequestModel.updateOne({_id: importRequest._id}, importRequest).exec();
    }

    async handleImportRequest(importRequest, selenium) {
        console.log("processing import request", importRequest);
        const offersService = new OffersService();
        const olxService = new OlxService(selenium);
        olxService.baseUrl = importRequest.olxAccountUrl;
        try {
            await this.setStatus(importRequest, REQUEST_STATUS.IN_PROGRESS);
            await olxService.openOffersListPage();
            const offers = await olxService.getAdvertsFromAccount();
            await offersService.saveOffers(importRequest._id, offers);
            await this.setStatus(importRequest, REQUEST_STATUS.DONE);
        } catch (err) {
            console.log(err);
            await this.setStatus(importRequest, REQUEST_STATUS.ERROR);
        }
    }
}

export default ImportRequestService;