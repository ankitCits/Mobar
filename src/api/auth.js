import { Alert } from 'react-native';
import { A_KEY, BASE_URL, MY_HEADER } from '../config';
import { getAccessToken } from '../localstorage';

export const singIn = (postData) => {
    return new Promise(async (resolve, reject) => {
        const { contact, password, deviceInfo, fcmToken } = postData
        console.log("Auth > signIn >Contact",contact);
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
        const { contact, password, deviceInfo, fcmToken } = postData;
        const token = await getAccessToken();
        const data = JSON.stringify({
            contact: contact,
            password: password,
            deviceInfo: deviceInfo,
            fcmToken: fcmToken,
        });
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


export const newPasswordChange = (postData) => {
    return new Promise(async (resolve, reject) => {
        const data = JSON.stringify(postData);
        const headers = {
            Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
            'Content-Type': 'application/json',
            A_Key: A_KEY,
            body:data
        };

        fetch(`${BASE_URL}/password/newPasswordChange`, {
            method: 'GET',
            headers: headers,
            redirect: 'follow',
        }).then(result => result.json()).then(responseDetail => {
            console.log("Auth > newPasswordChange > response",responseDetail);
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
        console.log("Auth > postData",data);
        const headers = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow',
          };
          console.log("Auth > headers",headers);
        fetch(`${BASE_URL}/password/retrieveAccount`,headers).then(result => result.json()).then(responseDetail => {
            console.log("Auth > retrieveAccount > response",responseDetail);
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

export const showAlert = (title='Unauthorized User',msg='Login to add or remove cart and wishlist') => {
    Alert.alert(
        title,
        msg,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
}
