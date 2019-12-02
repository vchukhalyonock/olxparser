import webDriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import config from '../../config';

export default class SeleniumService {
    webDriver;

    constructor() {
        this.webDriver = undefined;
    }


    init() {
        try {
            const options = new chrome.Options();

            options.addArguments(`--profile-directory=Default`);
            options.addArguments(`--user-data-dir=/home/seluser/.config/google-chrome/mcmxx`);
            options.addArguments('--start-maximized');
            options.addArguments("--disable-plugins-discovery");
            options.addArguments('--incognito');
            options.addArguments('--disable-extensions');

            return new webDriver.Builder()
                .setChromeOptions(options)
                .forBrowser('chrome')
                .usingServer(config.selenium.host)
                .build();
        } catch (e) {
            console.log("Builder error", e);
        }
    }

    getWebDriver() {
        if(!this.webDriver) {
            this.webDriver = this.init();
        }
        return this.webDriver;
    }

    async close() {
        if(this.webDriver) {
            await this.webDriver.close();
            await this.webDriver.sleep(2000);
            await this.webDriver.quit();
        }
    }
}
