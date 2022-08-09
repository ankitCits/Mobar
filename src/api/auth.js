import { A_KEY, BASE_URL, MY_HEADER } from '../config';
import { setUserDetail } from '../Redux/actions/auth';

export const singIn = (postData) => {
    return new Promise(async (resolve, reject) => {
        const { contact, password, deviceInfo, fcmToken } = postData
        if (contact && password) {
            const postData = JSON.stringify({
                contact: contact,
                password: password,
                deviceInfo: deviceInfo,
                fcmToken: fcmToken,
            });
            const requestOptions = {
                method: 'POST',
                headers: MY_HEADER,
                body: postData,
                redirect: 'follow',
            };

            fetch(`${BASE_URL}/auth/sign-in`, requestOptions)
                .then(result => result.json())
                .then(response => {
                    if (response.response) {
                        resolve(response.response.token)
                    }
                    if (response.errors) {
                        reject(response.errors[0].msg)
                    }
                })
                .catch(error => {
                    reject(error.message)
                });
        }
    });
};

export const getUserDetails = (postData) => {
    return new Promise(async (resolve, reject) => {
        const { token } = postData
        fetch(`${BASE_URL}/users/profile`, {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
                'Content-Type': 'application/json',
                Token: token,
                A_Key: A_KEY,
            },
            redirect: 'follow',
        }).then(result => result.json()).then(responseDetail => {
            if (responseDetail.response) {
                resolve(responseDetail);
            }
            if (responseDetail.errors) {
                reject(responseDetail.errors[0].msg)
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};