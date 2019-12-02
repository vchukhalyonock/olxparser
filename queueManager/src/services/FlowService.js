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
            console.log("Processing", importRequest);
            await importRequestService.handleImportRequest(importRequest, selenium.getWebDriver());
        }
        await selenium.close();
    }

    getQueueByImportRequestStatus(queue, status) {
        if(status === REQUEST_STATUS.PENDING) {
            console.log("Run pending");
            return queue.pending;
        }

        if(status === REQUEST_STATUS.IN_PROGRESS) {
            console.log("Run in progress");
            return queue.inProgress;
        }
    }
}