import { DEFAULT_TIMEOUT } from "../../constants/common";
import pageTypes from './pageTypes';

class OlxService {

    baseUrl = undefined;
    pageTypeHandler;
    pageTypesHandlers = [];
    offersTable;

    constructor(seleniumDriver) {
        this.seleniumDriver = seleniumDriver;
        this.pageTypesHandlers = pageTypes(this.seleniumDriver);
        this.pageTypeHandler = undefined;
        this.offersTable = undefined;
    }

    async openOffersListPage(importRequestUrl = undefined) {
        const url = importRequestUrl ? importRequestUrl : this.baseUrl;
        await this.seleniumDriver.sleep(2000);
        await this.seleniumDriver.get(url);
        await this.seleniumDriver.sleep(DEFAULT_TIMEOUT);
    }

    async scrollTillDown() {
        await this.seleniumDriver.executeScript('window.scrollBy(0, 1000)');
        await this.seleniumDriver.sleep(DEFAULT_TIMEOUT);
        await this.seleniumDriver.executeScript('window.scrollBy(1000, 2000)');
        await this.seleniumDriver.sleep(DEFAULT_TIMEOUT);
        await this.seleniumDriver.executeScript('window.scrollBy(2000, 3000)');
        await this.seleniumDriver.sleep(5000);
    }

    async selectPageTypeHandler() {
        for(let i = 0; i < this.pageTypesHandlers.length; i++) {
            try {
                this.offersTable = await this.pageTypesHandlers[i].getOffersTable();
                console.log(this.offersTable);
                if(this.offersTable !== undefined) {
                    this.pageTypeHandler = this.pageTypesHandlers[i];
                    console.log("Page Type Handler Found");
                    return;
                }
            } catch (e) {
                console.log("Next page type handler");
            }
        }
    }

    async getAdvertsFromPage() {
        await this.scrollTillDown();
        await this.selectPageTypeHandler();
        const offersList = await this.pageTypeHandler.getOffersList(this.offersTable);
        let offers = await this.pageTypeHandler.offersListProcessing(offersList);
        offers = await this.pageTypeHandler.offersLinksProcessing(offers);
        console.log("Offers", offers);
        return offers;
    }
}

export default OlxService;
