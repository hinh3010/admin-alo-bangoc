import axios from 'axios';
import * as urlConfig from './urlConfig';
import { getToken } from '../services/storages/userStorage';

export async function getBgList() {
    const token = getToken();
    const resp = await axios({
        method: 'GET',
        url: `${urlConfig.BACKGROUND_CHAT}/get-all`,
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    return resp.data;
}

export async function getBgListWithType(type) {
    const token = getToken();
    const resp = await axios({
        method: 'GET',
        url: `${urlConfig.BACKGROUND_CHAT}/get-all?type=${type}`,
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    return resp.data;
}

export async function createBg(data) {
    const token = getToken();
    const resp = await axios({
        method: 'POST',
        url: `${urlConfig.BACKGROUND_CHAT}`,
        data,
        headers: {
            Authorization: 'Bearer ' + token,
        },
    })
    return resp.data;
}

export async function updateBg(data) {
    const token = getToken();
    const resp = await axios({
        method: 'PATCH',
        url: `${urlConfig.BACKGROUND_CHAT}/${data.id}`,
        data,
        headers: {
            Authorization: 'Bearer ' + token,
        },
    })
    return resp.data;
}

export async function deleteBg(id) {
    const token = getToken();
    const resp = await axios({
        method: 'DELETE',
        url: `${urlConfig.BACKGROUND_CHAT}/${id}`,
        headers: {
            Authorization: 'Bearer ' + token,
        },
    })
    return resp.data;
}