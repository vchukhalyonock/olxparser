import { LOGIN } from "../reducers/constants";


const url = "";

const login = (login, password) => dispatch => {

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    })
        .then((response) => {
            console.log("Response:", response);
            dispatch({
                type: LOGIN,
                payload: {}
            });
        });

};

export  {
    login
}