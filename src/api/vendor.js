import { A_KEY, BASE_URL } from '../config';
import { getAccessToken } from '../localstorage';

export const fetchPromotionDetails = (postData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const postDataStr = JSON.stringify(postData);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: postDataStr,
        };

        fetch(`${BASE_URL}/vendor/promotion`, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log('fetchPromotionDetail > result', result)
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('Api > Vendor > fetchPromotion > catch > error', error);
                reject(error.message);
            });
    })
}