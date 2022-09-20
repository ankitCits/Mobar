import { A_KEY, BASE_URL } from '../config';
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
    console.log(myHeaders)
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
    // console.log(myHeaders);
    fetch(`${BASE_URL}/orders/placeOrder`, requestOptions)
      .then(result => result.json())
      .then(responseDetail => {
        // console.log(responseDetail);
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

export const orderHistory = () => {
  return new Promise(async (resolve, reject) => {
    const token = await getAccessToken();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
    }
    fetch(`${BASE_URL}/orders/history`, requestOptions)
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


export const redeemOrder = (payload) => {
  return new Promise(async (resolve, reject) => {
    const token = await getAccessToken();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);
    const data = JSON.stringify(payload);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    }
    fetch(`${BASE_URL}/redeem/orderNow`, requestOptions)
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

export const cancelOrder = (payload) => {
  return new Promise(async (resolve, reject) => {
    const token = await getAccessToken();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);
    const data = JSON.stringify(payload);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    }
    fetch(`${BASE_URL}/orders/cancel`, requestOptions)
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

