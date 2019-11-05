import Queue from "./Queue";
import seleniumDriver from '../services/selenium';

export default class Application {

    constructor() {
       this.queue = new Queue();
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

        setTimeout(() => {
            this.endImportRequest(selenium);
        }, 5000);
    }

    runImportRequest(selenium, importRequest) {
        console.log(importRequest);
        (async () => {
            console.log('inside IR proc');
            console.log(importRequest.olxAccountUrl);
            console.log("selenium", selenium);
            const getSite = await selenium.get(importRequest.olxAccountUrl);
            console.log("loaded1");
            //await selenium.sleep(5000);
            //console.log(getSite);
            /*const element = selenium.By.className('.link.parent.search.search');
            console.log(element);*/
        })();
    }

    endImportRequest(selenium, importRequest) {
        (async () => {
            console.log("stop session");
            await selenium.close();
            await selenium.sleep(2000);
            await selenium.quit();
        })();
    }
};
