import { A_KEY, BASE_URL, MY_HEADER } from '../config';
import { getAccessToken } from '../localstorage';


export const fetchPaymentIntentClientSecret = (postData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        const data = JSON.stringify(postData);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: data,
        }
        fetch(`${BASE_URL}/orders/getPaymentIntent`, requestOptions)
            .then(result => result.json())
            .then(responseDetail => {
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

export const placeOrder = (postData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        const data = JSON.stringify(postData);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: data,
        }
        console.log(requestOptions);
        fetch(`${BASE_URL}/orders/placeOrder`, requestOptions)
            .then(result => result.json())
            .then(responseDetail => {
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