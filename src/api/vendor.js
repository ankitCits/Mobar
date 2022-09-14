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

export const fetchVendorDetails = (postData) => {
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

        fetch(`${BASE_URL}/vendor/details`, requestOptions)
            .then(response => response.json())
            .then(result => {
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

export const fetchRedeemBars = (postData) => {
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

        fetch(`${BASE_URL}/redeem/barForRedeem`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('Api > Vendor > fetchRedeemBars > catch > error', error);
                reject(error.message);
            });
    })
}

export const fetchRedeemMixerData = (postData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const postDataStr = JSON.stringify(postData);
        //console.log("postDataStr",postDataStr);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: postDataStr,
        };

        fetch(`${BASE_URL}/redeem/mixerData`, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log('Api > Vendor > fetchRedeemMixerData > response', result.response.result);
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('Api > Vendor > fetchRedeemMixerData > catch > error', error);
                reject(error.message);
            });
    })
}

export const fetchRedeemMoreData = (postData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const postDataStr = JSON.stringify(postData);
        //console.log("postDataStr",postDataStr);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: postDataStr,
        };

        fetch(`${BASE_URL}/redeem/moreitem`, requestOptions)
            .then(response => response.json())
            .then(result => {
                //console.log('Api > Vendor > fetchRedeemMixerData > response', result.response.result);
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('Api > Vendor > fetchRedeemMixerData > catch > error', error);
                reject(error.message);
            });
    })
}

export const fetchVendorList = (postData) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        if (token) {
            myHeaders.append('Token', `${token}`);
        }
        const postDataStr = JSON.stringify(postData);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: postDataStr,
        };

        fetch(`${BASE_URL}/vendor/allList`, requestOptions)
            .then(response => response.json())
            .then(result => {
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