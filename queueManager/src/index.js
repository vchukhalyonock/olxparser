import Application from "./classes/Application";
import { QM_INTERVAL } from "./constants/common";

const app = new Application();

const run = () => {
    console.log("Restart Queue");
    (async () => {
        try {
            await app.init();
        } catch (e) {
            console.log(e);
        }
    })();
};

console.log("Starting Queue Manager");

run();

setInterval(run, QM_INTERVAL);
