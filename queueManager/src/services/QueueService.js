import {
    REQUEST_STATUS,
    ImportRequestModel
} from "../models";

export default class QueueService {

    async getImportRequestsByStatus(status) {
        return await ImportRequestModel.find({ status }).exec();
    }

    async getQueue() {
        const pending = await this.getImportRequestsByStatus(REQUEST_STATUS.PENDING);
        const inProgress = await this.getImportRequestsByStatus(REQUEST_STATUS.IN_PROGRESS);
        return { pending, inProgress }
    }
}