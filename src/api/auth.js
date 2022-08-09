import { BASE_URL, MY_HEADER } from '../config';

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