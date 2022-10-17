import moment from 'moment';
import { Alert, ToastAndroid } from 'react-native';
import { getAccessToken } from '../localstorage';


export const isLoggedIn = async () => {
    const token = await getAccessToken();
    return token;
}

export const showAlert = (title = 'Unauthorized User', msg = 'Please Sign-in / Sign-up to use this feature') => {
    Alert.alert(
        title,
        msg,
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );
}

export const showToaster = (title = 'Unauthorized User', align = 'BOTTOM') => {
    if (align == 'BOTTOM') {
        ToastAndroid.showWithGravity(
            title,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
        );
    } else {
        ToastAndroid.showWithGravity(
            title,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
        );
    }
}

export const setDateFormate = (date,isTime=false) => {
    const newDate = isTime ? moment(date).format('DD MMM yyyy hh:mm A') :
    moment(date).format('DD MMM yyyy');
    return newDate;
}
