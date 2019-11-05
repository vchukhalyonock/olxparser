import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import config from '../../config';

/*const seleniumDriver = new Builder()
    .forBrowser('chrome')
    .usingServer(config.selenium.host)
    .build();*/

export default () => {
    try {
        const options = new chrome.Options()
            .addArguments([
                "--disable-gpu"
            ]);

        return new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .usingServer(config.selenium.host)
            .build();
    } catch (e) {
        console.log("Builder error", e);
    }
};
