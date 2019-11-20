import Queue from "./Queue";
import seleniumDriver from '../services/selenium';
import OlxService from "../services/olx";
import OffersService from "../services/OffersService";
import ImportRequestService from "../services/ImportRequestService";
import { REQUEST_STATUS } from "../models/ImportRequestModel";

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
       await this.queue.initQueue();
       this.flow();
    };


    flow() {
        const queue = this.queue.getQueue();
        if(queue.pending.length) {
            this.run(queue.pending);
        }
    }

    run(importRequestsQueue) {
        const selenium = seleniumDriver();
        for(let i = 0; i < importRequestsQueue.length; i++) {
            this.runImportRequest(selenium, importRequestsQueue[i]);
        }
        // (async () => await this.olxService.exit())();
    }

    runImportRequest(selenium, importRequest) {
        console.log("processing import request", importRequest);
        (async () => {
            this.olxService.baseUrl = importRequest.olxAccountUrl;
            await this.olxService.visit();
            console.log("loaded");
            const offers = await this.olxService.getAdvertsFromPage();
            await this.offersService.saveOffers(importRequest._id, offers);
            await this.importRequestService.setStatus(importRequest, REQUEST_STATUS.DONE);
        })();
    }
};
