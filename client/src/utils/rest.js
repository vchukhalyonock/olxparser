import { LOCAL_STORAGE_TOKEN } from "../actions/auth";
import {METHODS} from "../constants/methods";

export default async function (url, method, data = null) {
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

    if(method !== METHODS.GET && data) {
        options.body = JSON.stringify(data)
    }

    const response = await fetch(
        url,
        options
    );

    let responseData = false;

    if(response.ok) {
        responseData = await response.json();
    }

    return responseData;
}