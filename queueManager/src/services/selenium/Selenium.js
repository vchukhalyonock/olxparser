//import { Builder } from 'selenium-webdriver';
import webDriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import config from '../../config';

export default () => {
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
            //.deleteAllCookies();

        /*const options = new chrome.Options()
            .addArguments([
                "--disable-gpu",
                "--start-maximized",
                "--restore-last-session "
            ]);

        return new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .usingServer(config.selenium.host)
            .build();*/
    } catch (e) {
        console.log("Builder error", e);
    }
};
