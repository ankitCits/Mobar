import { A_KEY, BASE_URL, MY_HEADER } from '../config';
import { getAccessToken } from '../localstorage';

export const removeToWishlist = (postData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        fetch(`${BASE_URL}/wishlist/removeToWishlist`, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
                'Content-Type': 'application/json',
                Token: token,
                A_Key: A_KEY,
            },
            body: JSON.stringify(postData),
            redirect: 'follow',
        }).then(result => result.json()).then(responseDetail => {
            console.log();
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

export const addToWishlist = (postData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken();
        fetch(`${BASE_URL}/wishlist/addToWishlist`, {
            method: 'POST',
            headers: {
                Accept: 'application/json, text/plain, */*', // It can be used to overcome cors errors
                'Content-Type': 'application/json',
                Token: token,
                A_Key: A_KEY,
            },
            body: JSON.stringify(postData),
            redirect: 'follow',
        }).then(result => result.json()).then(responseDetail => {
            console.log("Wishlist > addToWishList > response ",responseDetail);
            if (responseDetail.response && responseDetail.response.status == 'SUCCESS') {
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