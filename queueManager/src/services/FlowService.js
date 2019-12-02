import { REQUEST_STATUS } from "../models";
import ImportRequestService from "./ImportRequestService";
import SeleniumService from "./selenium";

export default class FlowService {
    async run(queue) {
        await this.runQueue(this.getQueueByImportRequestStatus(queue, REQUEST_STATUS.PENDING));
        await this.runQueue(this.getQueueByImportRequestStatus(queue, REQUEST_STATUS.IN_PROGRESS));
    }

    async runQueue(queue) {
        const selenium = new SeleniumService();
        const importRequestService = new ImportRequestService();
        for(let i = 0; i < queue.length; i++) {
            const importRequest = queue[i];
            await importRequestService.handleImportRequest(importRequest, selenium.webDriver);
        }
        await selenium.close();
    }

    getQueueByImportRequestStatus(queue, status) {
        if(status === REQUEST_STATUS.PENDING) {
            return queue.pending;
        }

        if(status === REQUEST_STATUS.IN_PROGRESS) {
            return queue.inProgress;
        }
    }
}