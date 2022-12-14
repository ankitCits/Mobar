import { A_KEY, BASE_URL, MY_HEADER } from '../config';
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
            .then(response => response.json())
            .then(result => {
                if (result.status == 'FAILED') {
                    reject(result.reason);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('ApiProduct > addToCart > Catch', error);
                reject(error.message);
            });
    })
}

export const updateToCart = (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const raw = JSON.stringify(payload);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/cart/updateTocart`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('ApiProduct > addToCart > Catch', error);
                reject(error.message);
            });
    })
}

export const fetchComboProducts = (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const raw = JSON.stringify(payload);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/products/allComboProduct`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('ApiProduct > addToCart > Catch', error);
                reject(error.message);
            });
    })
}

export const fetchComboDetailsById = (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const raw = JSON.stringify(payload);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/products/comboDetailsById`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('ApiProduct > addToCart > Catch', error);
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
        const raw = JSON.stringify({
            cartId: payload,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/cart/removeToCart`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('ApiProduct > removeToCart > result', result)
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('ApiProduct > removeToCart > catch', error);
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


export const fetchProductDetails = (postData) => {
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
            //redirect: 'follow',
        };
        console.log("request option", requestOptions);
        fetch(`${BASE_URL}/products/productDetailsById`, requestOptions)
            .then(response => response.json())
            .then(result => {
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

export const fetchProductData = (postData) => {
    const data = JSON.stringify(postData);
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
        };
        fetch(`${BASE_URL}/products/alldatas`, requestOptions)
            .then(response => response.json())
            .then(result => {
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

export const fetchCollectionData = (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const data = JSON.stringify(payload);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
        };
        fetch(`${BASE_URL}/redeem/collection`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('ApiProduct > fetchCollectionData > catch', error);
                reject(error.message);
            });
    })
}

export const getAllPages = () => {
    return new Promise(async (resolve, reject) => {
        fetch(`${BASE_URL}/common/allPages`, {
            method: 'GET',
            headers: MY_HEADER,
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

export const applyCoupon = (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const raw = JSON.stringify(payload);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/cart/coupanCode`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('ApiProduct > coupanCode > Catch', error);
                reject(error.message);
            });
    })
}

export const cartCheckout = (payload) => {
    return new Promise(async (resolve, reject) => {
        const token = await getAccessToken(token);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('A_Key', A_KEY);
        myHeaders.append('Token', `${token}`);
        const raw = JSON.stringify(payload);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        fetch(`${BASE_URL}/orders/checkout`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.errors) {
                    reject(result.errors[0].msg);
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                console.log('ApiProduct > orders/checkout > Catch', error);
                reject(error.message);
            });
    })
}

