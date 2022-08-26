import { StyleSheet } from "react-native";
import { FontFamily } from "../../Theme/FontFamily";
import { ThemeColors } from "../../Theme/ThemeColors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ThemeColors.CLR_WHITE,
    },
    headerContainer: {
        backgroundColor: ThemeColors.CLR_WHITE,
        height: 60,
        shadowColor: ThemeColors.CLR_SIGN_IN_TEXT_COLOR,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    header: {
        margin: 12,
        flexDirection: 'row',
    },
    headerLeft: { marginLeft: 10 },
    title: {
        fontFamily: FontFamily.ROBOTO_REGULAR,
        fontSize: 20,
        color: '#4D4F50',
        fontWeight: '500'
    },
    cardContainer: {
        margin: 5,
    },
    banner: {
        marginTop: 15,
        marginBottom: 65,
        alignItems: 'center',
    },
});
export default styles;
