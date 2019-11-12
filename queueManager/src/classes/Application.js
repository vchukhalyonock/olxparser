import Queue from "./Queue";
import seleniumDriver from '../services/selenium';
import OlxService from "../services/olx";

export default class Application {

    constructor() {
       this.queue = new Queue();
       this.olxService = new OlxService();
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
        for(let i = 0; i < importRequestsQueue.length; i++) {
            this.runImportRequest(importRequestsQueue[i]);
        }
    }

    async runImportRequest(importRequest) {
        console.log("processing import request 1", importRequest);
        this.olxService.baseUrl = importRequest.olxAccountUrl;
        const response = await this.olxService.visit();
        const html = await response.text();
        console.log("response", html);
    }
};
