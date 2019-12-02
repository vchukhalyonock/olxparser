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

    async getAdvertsFromAccount() {
        let offers = [];
        await this.scrollTillDown();
        await this.selectPageTypeHandler();
        offers = await this.pageTypeHandler.getOffersFromPage(this.offersTable);

        if ("getNextPageLink" in this.pageTypeHandler) {
            let nextPageLink;
            try {
                while (nextPageLink = await this.pageTypeHandler.getNextPageLink()) {
                    await nextPageLink.click();
                    await this.seleniumDriver.sleep(5000);
                    const offersTable = await this.pageTypeHandler.getOffersTable();
                    if (offersTable) {
                        await this.scrollTillDown();
                        let pageOffers = await this.pageTypeHandler.getOffersFromPage(offersTable);
                        offers = offers.concat(pageOffers);
                    }
                }
            } catch (e) {
                console.log("Next page not found");
            }
        }

        console.log("Offers", offers);
        return offers;
    }
}

export default OlxService;
