import { LOCAL_STORAGE_TOKEN } from "../actions/auth";
import { METHODS } from "../constants/methods";

export const DATA_TYPE = {
    JSON: 'json',
    XML: 'xml'
};

export default async function (url, method, data = undefined, dataType = DATA_TYPE.JSON) {
    let convertedUrl = url;

    const headers = {
        'Content-Type': 'application/json'
    };

    if ( localStorage.getItem(LOCAL_STORAGE_TOKEN) ) {
        headers['Authorization'] = `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN)}`;
    }

    const options = {
        method: method,
        headers: headers,
    };

    if (method !== METHODS.GET && data) {
        options.body = JSON.stringify(data)
    } else if(data) {
        convertedUrl += `?${new URLSearchParams(data).toString()}`;
    }

    const response = await fetch(
        convertedUrl,
        options
    );

    let responseData = false;

    if(response.ok) {
        switch (dataType) {
            case DATA_TYPE.JSON:
                responseData = await response.json();
                break;

            case DATA_TYPE.XML:
                responseData = await response.text();
                break;

            default:
                break;
        }
    }

    return responseData;
}
