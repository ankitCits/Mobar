import { Alert, ToastAndroid } from 'react-native';
import { A_KEY, BASE_URL, MY_HEADER } from '../config';
import { getAccessToken } from '../localstorage';

export const singIn = (postData) => {
    return new Promise(async (resolve, reject) => {
        const { contact, password, deviceInfo, fcmToken } = postData
        console.log("Auth > signIn >Contact", contact);
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
        //const { contact, password, deviceInfo, fcmToken } = postData;
        const token = await getAccessToken();
        // const data = JSON.stringify({
        //     contact: contact,
        //     password: password,
        //     deviceInfo: deviceInfo,
        //     fcmToken: fcmToken,
        // });
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


export const newPasswordChange = (postData, token) => {
    return new Promise(async (resolve, reject) => {
        const data = JSON.stringify(postData);
        const headers = {
            'Content-Type': 'application/json',
            A_Key: A_KEY,
            P_C_Token: token,
        };
        fetch(`${BASE_URL}/password/newPasswordChange`, {
            method: 'POST',
            headers: headers,
            body: data
        }).then(result => result.json()).then(responseDetail => {
            if (responseDetail.response) {
                resolve(responseDetail.response);
            }
            if (responseDetail.errors) {
                reject(responseDetail.errors[0].msg)
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const retrieveAccount = (postData) => {
    return new Promise(async (resolve, reject) => {
        const data = JSON.stringify(postData);
        console.log("Auth > postData", data);
        const headers = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow',
        };
        console.log("Auth > headers", headers);
        fetch(`${BASE_URL}/password/retrieveAccount`, headers).then(result => result.json()).then(responseDetail => {
            console.log("Auth > retrieveAccount > response", responseDetail);
            if (responseDetail.response) {
                resolve(responseDetail.response);
            }
            if (responseDetail.errors) {
                reject(responseDetail.errors[0].msg)
            }
        }).catch(error => {
            reject(error.message);
        });
    });
};

export const updateProfilePic = (postData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        let formdata = new FormData([]);
        formdata.append('image', {
            uri: postData.profile,
            name: 'image.jpg',
            type: 'image/jpeg',
            // contentType: 'application/octet-stream',
            // mimeType: 'application/octet-stream'
        });
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'multipart/form-data');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };
        console.log(JSON.stringify(formdata));
        console.log(requestOptions);
        fetch(`${BASE_URL}/users/updateProfilePics`, requestOptions)
            .then(result => result.json())
            .then(response => {
                console.log('=====> ', response);
                if (response.response) {
                    resolve(response.response);
                }
                if (response.errors) {
                    reject(response.errors[0].msg)
                }
            })
            .catch(error => {
                console.log(error);
                reject(error.message)
            });
    });
};


