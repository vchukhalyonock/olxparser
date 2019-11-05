import Application from "./classes/Application";

const app = new Application();

console.log("Starting Queue Manager");
(async () => {
    try {
        await app.init();
    } catch (e) {
        console.log(e);
    }
})();


