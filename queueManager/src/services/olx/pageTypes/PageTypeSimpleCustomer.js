import {
    By,
    until
} from "selenium-webdriver";
import { DEFAULT_TIMEOUT } from "../../../constants/common";
import fetch from "node-fetch";
import cheerio from "cheerio";


export default class PageTypeSimpleCustomer {
    selenium;

    constructor(selenium) {
        this.selenium = selenium;
    }

    async getOffersTable() {
        await this.selenium.wait(until.elementLocated(By.id('offers_table')), DEFAULT_TIMEOUT);
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
                offer.link = await offerLinkElement.findElement(By.css('a')).getAttribute('href');
                offer.caption = await offerElement.findElement(By.css('strong'))
                    .getText();
                const price = await offerElement.findElement(By.css('.price strong')).getText();
                offer.price = toInteger(price.split(" ")[0]);
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
            const $ = cheerio.load(body);
            offer.description = $('#textContent').text().trim();
            const breadCrumbs = [];
            $('#breadcrumbTop ul li').each((i, elem) => {
                breadCrumbs.push($('a.link span', elem).text());
            });

            offer.heading = breadCrumbs;

            const imagesURLs = [];
            $('.tcenter.img-item').each((i, elem) => {
                imagesURLs.push($('div img', elem).attr('src'));
            });

            offer.images = imagesURLs;
        } else {
            throw new Error(response.statusText);
        }

        return offer;
    }
}