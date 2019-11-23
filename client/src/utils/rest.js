import { LOCAL_STORAGE_TOKEN } from "../actions/auth";
import { METHODS } from "../constants/methods";

export default async function (url, method, data = null) {
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
    } else {
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