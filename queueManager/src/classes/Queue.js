import { ImportRequestModel } from '../models';
import { REQUEST_STATUS } from "../models/ImportRequestModel";

export default class Queue {

    constructor(){
        this.pendingImportRequests = [];
        this.inProgressImportRequests = [];
    }

    async initQueue() {
        this.pendingImportRequests = await this.getPendingImportRequests();
        this.inProgressImportRequests = await this.getInProgressImportRequests();
    };

    async getPendingImportRequests() {
        return await ImportRequestModel.find({status: REQUEST_STATUS.PENDING}).exec();
    }

    async getInProgressImportRequests() {
        return await ImportRequestModel.find({status: REQUEST_STATUS.IN_PROGRESS}).exec();
    }

    getQueue() {
        return {
            pending: this.pendingImportRequests,
            inProgress: this.inProgressImportRequests
        }
    }
}