import { By, until } from 'selenium-webdriver';
import { DEFAULT_TIMEOUT } from "../../constants/common";
import cheerio from 'cheerio';
import fetch from 'node-fetch';

class OlxService {

    baseUrl = undefined;

    constructor(seleniumDriver) {
        this.seleniumDriver = seleniumDriver;
    }

    async visit(importRequestUrl = undefined) {
        const url = importRequestUrl ? importRequestUrl : this.baseUrl;
        await this.seleniumDriver.sleep(1000);
        await this.seleniumDriver.get(url);
        //await this.seleniumDriver.navigate().to(url);
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
        let offers = await this.offersListProcessing(offersList);
        console.log("Offers", offers);
        offers = await this.offersLinksProcessing(offers);
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

    async offersLinksProcessing(offers) {
        const newOffers = [];
        for (let i = 0; i < offers.length; i++) {
            const offer = await this.linkProcess(offers[i]);
            newOffers.push(offer);
        }
        return newOffers;
    }

    async linkProcess(offer) {
        console.log('Processing link ', offer.link);
        const response = await fetch(
            offer.link,
            {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                },
                referrer: 'no-referrer'
            }
        );
        if(response.ok) {
            const body = await response.text();
            console.log(body);
            const $ = cheerio.load(body);
            offer.description = $('.clr.lheight20.large').text();
        } else {
            throw new Error(response.statusText);
        }

        return offer;
    }
}

export default OlxService;
