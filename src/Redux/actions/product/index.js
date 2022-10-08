import { ToastAndroid } from 'react-native';
import { showToaster } from '../../../api/func';
import { BASE_URL, A_KEY } from '../../../config';
import { getAccessToken } from '../../../localstorage';

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('A_Key', A_KEY);

// export const addTocard = payload => {
//   return async () => {
//     console.log('ADD_DATA>>', payload);
//     let token = await getAccessToken(token);
//     let myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('A_Key', A_KEY);
//     myHeaders.append('Token', `${token}`);

//     let raw = JSON.stringify({
//       itemForStore: [payload],
//     });

//     let requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     fetch(`${BASE_URL}/cart/addToCart`, requestOptions)
//       .then(response => response.text())
//       .then(result => console.log('ADDD_________', result))
//       .catch(error => console.log('error', error));

//     return payload;
//   };
// };

// export const removeTocard = payload => {
//   return async () => {
//     let token = await getAccessToken(token);
//     let myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('A_Key', A_KEY);
//     myHeaders.append('Token', `${token}`);

//     let raw = JSON.stringify({
//       cartId: 316,
//     });

//     let requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     fetch(`${BASE_URL}/cart/removeToCart`, requestOptions)
//       .then(response => response.text())
//       .then(result => console.log(result))
//       .catch(error => console.log('error', error));

//     return payload;
//   };
// };


// export const addToFav = payload => {
//   return async () => {
//     let token = await getAccessToken(token);
//     let myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('A_Key', A_KEY);
//     myHeaders.append('Token', `${token}`);

//     let raw = JSON.stringify({
//       productId: payload.productId,
//       comboId: payload.comboId,
//       vendorId: payload.vendorId,
//     });

//     let requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     fetch(`${BASE_URL}/wishlist/addToWishlist`, requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         // console.log('ADD_IN_WHISLIST', result);
//       })
//       .catch(error => console.log('error', error));

//     return payload;
//   };
// };


// export const removeToFav = payload => {
//   return async () => {
//     let myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');
//     myHeaders.append('A_Key', A_KEY);
//     myHeaders.append('Token', `${BASE_URL}`);

//     let raw = JSON.stringify({
//       wishlistId: payload.wishlistId,
//     });

//     let requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     fetch(`${BASE_URL}/wishlist/removeToWishlist`, requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         console.log('REMOVE_IN_WHISLIST', result);
//       })
//       .catch(error => console.log('error', error));

//     return payload;
//   };
// };

export const helpSupport = async (postData) => {
    const params = await getParams(postData);
    return new Promise(async (resolve, reject) => {
        fetch(`${BASE_URL}/common/helpSupport`, params)
            .then(response => response.json())
            .then(result => {
                console.log("Product > response", result);
                if (result.response && result.response.status == 'SUCCESS') {
                    resolve(result.response)
                }
                if (result.errors) {
                    console.log("Product > 400 Errors >Response", result.errors)
                    showToaster(result.errors.find(x => x.msg).msg,'TOP');
                    reject(result.errors.find(x => x.msg).msg)
                }
            })
            .catch(error => {
                console.log("Product > catch > error", error);
                reject(error.message)
            });
    });
};

export const updateProfile = async (postData) => {
    const params = await getParams(postData);
    return new Promise(async (resolve, reject) => {
        fetch(`${BASE_URL}/users/updateProfile`, params)
            .then(response => response.json())
            .then(result => {
                if (result.response && result.response.status == 'SUCCESS') {
                    resolve(result.response)
                }
                if (result.errors) {
                    showToaster(result.errors.find(x => x.msg).msg,'TOP');
                    reject(result.errors)
                }
            })
            .catch(error => {
                console.log("Product > catch > error", error);
                reject(error.message)
            });
    });
};

export const changePassword = async (postData) => {
    const params = await getParams(postData);
    return new Promise(async (resolve, reject) => {
        fetch(`${BASE_URL}/users/changePassword`, params)
            .then(response => response.json())
            .then(result => {
                console.log("Product > Change Password > response", result);
                if (result.response && result.response.status == 'SUCCESS') {
                    resolve(result.response)
                }
                if (result.errors) {
                    console.log("Product > Change Password > 400 Errors >Response", result.errors)
                    showToaster(result.errors.find(x => x.msg).msg,'TOP');
                    reject(result.errors)
                }
            })
            .catch(error => {
                console.log("Product > Change Password > catch > error", error);
                reject(error.message)
            });
    });
};

export const loggedOut = async (postData) => {
    let token = await getAccessToken(token);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return new Promise(async (resolve, reject) => {
        fetch(`${BASE_URL}/users/signOut`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("Product > sign out > response", result);
                if (result.response && result.response.status == 'SUCCESS') {
                    resolve(result.response)
                }
                if (result.errors) {
                    console.log("Product > sign out > 400 Errors >Response", result.errors)
                    showToaster('Internet Issue!','TOP');
                    reject(result.errors)
                }
            })
            .catch(error => {
                console.log("Product > sign out > catch > error", error);
                reject(error.message)
            });
    });
};

export const getParams = async (data) => {
    let token = await getAccessToken(token);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);
    const postDataStr = JSON.stringify(data);
    return new Promise(async (resolve, reject) => {
        if (data) {
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: postDataStr,
            };
            resolve(requestOptions)
        } else {
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
            };
            resolve(requestOptions)
        }
        
    });
}