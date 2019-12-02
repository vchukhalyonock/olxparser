import ApplicationService from "./services/ApplicationService";
import { QM_INTERVAL } from "./constants/common";

const run = () => {
    console.log("Restart Queue");
    (async () => {
        try {
            await ApplicationService.run();
        } catch (e) {
            console.log(e);
        }
    })();
};

console.log("Starting Queue Manager");

run();

setInterval(run, QM_INTERVAL);
