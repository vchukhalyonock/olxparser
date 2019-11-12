import { By, until } from 'selenium-webdriver';
import { DEFAULT_TIMEOUT } from "../../constants/common";
import fetch from "node-fetch";

class OlxService {

    baseUrl = undefined;

    async visit(importRequestUrl = undefined) {
        return await fetch(
            importRequestUrl ? importRequestUrl : this.baseUrl,
            {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                },
                referrer: 'no-referrer'
            }
        )
    }


    async exit() {

    }

    async getAdvertsFromPage() {

    }

    async getOffersTable() {

    }

    async getOffersList(offersTable) {

    }

    async offersListProcessing(offersList) {

    }

    async linkProcess(link) {

    }
}

export default OlxService;
