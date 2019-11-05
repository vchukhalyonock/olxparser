import Application from "./classes/Application";

const app = new Application();

(async () => {
    try {
        await app.init();
    } catch (e) {
        console.log(e);
    }
})();


