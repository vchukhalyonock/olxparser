import { By, until } from 'selenium-webdriver';
import { DEFAULT_TIMEOUT } from "../../constants/common";

class OlxService {

    baseUrl = undefined;

    constructor(seleniumDriver) {
        this.seleniumDriver = seleniumDriver;
    }

    async visit(importRequestUrl = undefined) {
        const url = importRequestUrl ? importRequestUrl : this.baseUrl;
        await this.seleniumDriver.sleep(1000);
        //await this.seleniumDriver.get(url);
        await this.seleniumDriver.navigate().to(url);
        await this.seleniumDriver.sleep(DEFAULT_TIMEOUT);
    }


    async exit() {
        await this.seleniumDriver.close();
        await this.seleniumDriver.sleep(2000);
        await this.seleniumDriver.quit();
    }

    async getAdvertsFromPage() {
        await this.seleniumDriver.executeScript('window.scrollBy(0, 1000)');
        await this.seleniumDriver.sleep(DEFAULT_TIMEOUT);
        await this.seleniumDriver.executeScript('window.scrollBy(1000, 2000)');
        await this.seleniumDriver.sleep(DEFAULT_TIMEOUT);
        await this.seleniumDriver.executeScript('window.scrollBy(2000, 3000)');
        await this.seleniumDriver.sleep(5000);
        const offersTable = await this.getOffersTable();
        const offersList = await this.getOffersList(offersTable);
        //console.log('offersList', offersList);
        const offers = await this.offersListProcessing(offersList);
        console.log("Offers", offers);
    }

    async getOffersTable() {
        return await this.seleniumDriver.wait(until.elementLocated(By.id('offers_table')), DEFAULT_TIMEOUT);
    }

    async getOffersList(offersTable) {
        return offersTable.findElements(By.css('.fixed.breakword'));
    }

    async offersListProcessing(offersList) {
        const offers = [];

        for(let i = 0; i < offersList.length; i++) {
            const offer = {};
            const offerElement = offersList[i];
            const offerLinkElement = await offerElement.findElement(By.css('h3'));
            if(offerLinkElement) {
                console.log("Offer link element found");
                offer.link = await offerLinkElement.findElement(By.css('a')).getAttribute('href');
                offer.caption = await offerElement.findElement(By.css('strong'))
                    .getText();
                offers.push(offer);
            }

        }
        return offers;
    }

    offersLinksProcessing(links) {
        
    }

    async linkProcess(link) {
        console.log('Processing link ', link);

    }
}

export default OlxService;
