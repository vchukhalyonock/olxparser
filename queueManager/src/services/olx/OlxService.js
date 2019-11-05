import { By, until } from 'selenium-webdriver';

class OlxService {

    baseUrl = undefined;

    constructor(seleniumDriver) {
        this.seleniumDriver = seleniumDriver;
    }

    async visit(importRequestUrl = undefined) {
        const url = importRequestUrl ? importRequestUrl : this.baseUrl;
        await this.seleniumDriver.get(url);
        await this.seleniumDriver.sleep(5000);
    }


    async exit() {
        await this.seleniumDriver.close();
        await this.seleniumDriver.sleep(2000);
        await this.seleniumDriver.quit();
    }

    async getAdvertsFromPage() {
        const offersTable = await this.getOffersTable();
        const offersList = await this.getOffersList(offersTable);
        console.log('offersTable', offersTable);
        console.log('offersList', offersList);
        await this.offersListProcessing(offersList);
    }

    async getOffersTable() {
        return await this.seleniumDriver.wait(until.elementLocated(By.id('offers_table')), 5000);
    }

    async getOffersList(offersTable) {
        return offersTable.findElements(By.css('.fixed.breakword'));
    }

    async offersListProcessing(offersList) {
        const offers = [];

        for(let i = 0; i < offersList.length; i++) {
            const offer = {};
            const offerElement = offersList[i];
            const offerLinkElement = await offerElement.findElement(By.css('.thumb.vtop.inlblk.rel.tdnone.linkWithHash.scale4.detailsLink'));
            offer.link = offerLinkElement.getAttribute('href');
            offer.caption = await offerElement.findElement(By.css('strong'))
                .getText();

            //Go to offer page
            await offerLinkElement.click();
            await this.seleniumDriver.sleep(5000);


            offers.push(offer);
        }

        console.log("Offers", offers);
        return offers;
    }
}

export default OlxService;
