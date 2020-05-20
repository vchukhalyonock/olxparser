import fetch from "node-fetch";
import { METHODS } from "../constants/methods";
import config from "../config";

export default async function (url, method, data = undefined) {
    let convertedUrl = url;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': config.callCenter.token
    };

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
        responseData = await response.json();
    }

    return responseData;
}
