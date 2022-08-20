import axios from "axios";
import * as urlConfig from './urlConfig';

export async function login(username,password) {
    const resp = await axios({
        method: 'POST',
        url: urlConfig.LOGIN_URL,
        data: {
            username: username,
            password: password,
        },
    });

    return resp;
}