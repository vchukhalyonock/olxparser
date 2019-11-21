import { LOGIN } from "../constants/actions";
import { AUTH_URL } from "../constants/urls";
import config from "../config";
import rest from "../utils/rest";
import { METHODS } from "../constants/methods";

export const LOCAL_STORAGE_TOKEN = 'olxparsertoken';

const url = `${config.backendUrl}${AUTH_URL}`;

const login = (login, password) => async dispatch => {

    const responseData = await rest(
        url,
        METHODS.POST,
        {
            login: login,
            password: password
        });

    if(responseData.token) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, responseData.token);
    }

    dispatch({type: LOGIN, payload: responseData});
};

export  {
    login
}