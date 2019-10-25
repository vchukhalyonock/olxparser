import { LOGIN } from "../constants/reducers";
import config from "../config";

export const LOCAL_STORAGE_TOKEN = 'olxparsertoken';

const url = `${config.backendUrl}/auth`;

const login = (login, password) => async dispatch => {

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    });

    if(response.ok) {
        const data = await response.json();
        if(data.token) {
            localStorage.setItem(LOCAL_STORAGE_TOKEN, data.token);
        }
        dispatch({type: LOGIN, payload: data});
    } else {
        dispatch({type: LOGIN, payload: false});
    }
};

export  {
    login
}