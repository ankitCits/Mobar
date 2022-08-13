import { A_KEY, BASE_URL } from '../config';
import { getAccessToken } from '../localstorage';

export const addToFav = (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const raw = JSON.stringify({
            productId: payload.productId,
            comboId: payload.comboId,
            vendorId: payload.vendorId,
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/wishlist/addToWishlist`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('addToFav', result);
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('addToFav > error', error);
                reject(error.message);
            });

    });
};

export const removeToFav = (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const raw = JSON.stringify({
            productId: payload.productId,
            comboId: payload.comboId,
            vendorId: payload.vendorId,
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/wishlist/addToWishlist`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('addToFav', result);
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('addToFav > error', error);
                reject(error.message);
            });

    });
};

export const addToCart = (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const raw = JSON.stringify({
            itemForStore: [payload],
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/cart/addToCart`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log('addToCart > result', result)
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('addToCart > error', error);
                reject(error.message);
            });
    })
}


export const removeFromCart = (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        // const raw = JSON.stringify({
        //     itemForStore: [payload],
        // });

        const raw = JSON.stringify({
            cartId: 316,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/cart/removeToCart`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log('removeToCart > result', result)
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('removeToCart > error', error);
                reject(error.message);
            });
    })
}

export const fetchCart = () => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(`${BASE_URL}/cart/viewCart`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log('fetchCart > result', result)
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('fetchCart > error', error);
                reject(error.message);
            });
    })
}