import QueueService from "./QueueService";
import QMService from "./QMService";
import FlowService from "./FlowService";


export default class ApplicationService {
    static async run() {
        const queueService = new QueueService()
        const queue = queueService.getQueue();
        console.log(queue);
        const flowService = new FlowService();
        if(await QMService.checkWait()) {
            await QMService.setActive();
            await flowService.run(queue);
            await QMService.setWait();
        }
    }
};
