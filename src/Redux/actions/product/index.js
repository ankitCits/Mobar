import {COUNTER_CHANGE, SUCCESS_USER_DETAIL} from '../../constants/auth';
import {BASE_URL, A_KEY} from '../../../config';
import {getAccessToken} from '../../../localstorage';

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('A_Key', A_KEY);
/**
 * Getting Authentication User
 * @param {"mobile_number","password"}
 * @return JSONObject
 */

export const addTocard = payload => {
  return async dispatch => {
    console.log('ADD_DATA>>', payload);
    let token = await getAccessToken(token);
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);

    let raw = JSON.stringify({
      itemForStore: [payload],
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/cart/addToCart`, requestOptions)
      .then(response => response.text())
      .then(result => console.log('ADDD_________', result))
      .catch(error => console.log('error', error));

    return payload;
  };
};

export const removeTocard = payload => {
  return async dispatch => {
    let token = await getAccessToken(token);
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);

    let raw = JSON.stringify({
      cartId: 316,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/cart/removeToCart`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    return payload;
  };
};


export const addToFav = payload => {
  return async dispatch => {
    let token = await getAccessToken(token);
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);

    let raw = JSON.stringify({
      productId: payload.productId,
      comboId: payload.comboId,
      vendorId: payload.vendorId,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/wishlist/addToWishlist`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('ADD_IN_WHISLIST', result);
      })
      .catch(error => console.log('error', error));

    return payload;
  };
};


export const removeToFav = payload => {
  return async dispatch => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${BASE_URL}`);

    let raw = JSON.stringify({
      wishlistId: payload.wishlistId,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/wishlist/removeToWishlist`, requestOptions)
      .then(response => response.jsom())
      .then(result => {
        console.log('REMOVE_IN_WHISLIST', result);
      })
      .catch(error => console.log('error', error));

    return payload;
  };
};
