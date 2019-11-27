import Queue from "./Queue";
import seleniumDriver from '../services/selenium';
import OlxService from "../services/olx";
import OffersService from "../services/OffersService";
import ImportRequestService from "../services/ImportRequestService";
import { REQUEST_STATUS } from "../models/ImportRequestModel";
import QMService from "../services/QMService";

// https://www.olx.ua/uk/list/user/1byXw/

export default class Application {

    constructor() {
       this.queue = new Queue();
       this.olxService = new OlxService(seleniumDriver());
       this.offersService = new OffersService();
       this.importRequestService = new ImportRequestService();
    }

    async init() {
       console.log("Init queue manager");
       if(await QMService.checkWait()) {
           await QMService.setActive();
           await this.queue.initQueue();
           await this.flow();
           await QMService.setWait();
       }
    };


    async flow() {
        const queue = this.queue.getQueue();
        console.log(queue);
        if(queue.pending.length) {
            await this.run(queue.pending);
        }
        if(queue.inProgress.length) {
            await this.run(queue.inProgress);
        }
    }

    async run(importRequestsQueue) {
        const selenium = seleniumDriver();
        for(let i = 0; i < importRequestsQueue.length; i++) {
            await this.runImportRequest(selenium, importRequestsQueue[i]);
        }
        await this.olxService.exit();
    }

    async runImportRequest(selenium, importRequest) {
        console.log("processing import request", importRequest);
        this.olxService.baseUrl = importRequest.olxAccountUrl;
        try {
            await this.importRequestService.setStatus(importRequest, REQUEST_STATUS.IN_PROGRESS);
            await this.olxService.visit();
            const offers = await this.olxService.getAdvertsFromPage();
            await this.offersService.saveOffers(importRequest._id, offers);
            await this.importRequestService.setStatus(importRequest, REQUEST_STATUS.DONE);
        } catch (err) {
            console.log(err);
            await this.importRequestService.setStatus(importRequest, REQUEST_STATUS.ERROR);
        }
    }
};
