import { A_KEY, BASE_URL } from '../config';
import { getAccessToken } from '../localstorage';

export const inviteShare = () => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(`${BASE_URL}/referral/codelink`, requestOptions)
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

export const fetchBanner = () => {
    return new Promise(async (resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(`${BASE_URL}/common/slider`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('Api > common > slider > catch > error', error);
                reject(error.message);
            });
    })
}

export const fetchFAQData = () => {
    return new Promise(async (resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(`${BASE_URL}/common/faq`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('Api > common > slider > catch > error', error);
                reject(error.message);
            });
    })
}

export const getNotification = () => {
    return new Promise(async (resolve, reject) => {

        const token = await getAccessToken(token);

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        if (token) {
            myHeaders.append('Token', `${token}`);
        }

        fetch(`${BASE_URL}/app/notification`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('Api > common > slider > catch > error', error);
                reject(error.message);
            });
    })
}

