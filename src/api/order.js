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

fetchDetail = async () => {
    let token = await getAccessToken(token);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('A_Key', A_KEY);
    myHeaders.append('Token', `${token}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_URL}/orders/history`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.response) {
          console.log(result.response.result.data);
          this.setState({
            data: result.response.result.data,
            url: result.response.result.hostUrl,
            loader: false,
          });
        }
        if (result.errors) {
          this.setState({loading: false});
          ToastAndroid.showWithGravity(
            result.errors[0].msg,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      })
      .catch(error => {
        console.log('error', error);
        ToastAndroid.showWithGravity(
          'Network Error!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
  };