
import { Dimensions, StyleSheet } from 'react-native';
const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    sectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        borderWidth: 0,
        borderColor: '#000',
        height: 40,
        width: 360,
        borderRadius: 5,
        margin: 10,
        elevation: 2,
    },
    imageStyle: {
        margin: 5,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    Dashboard: {
        height: 170,
        width: 375,
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 5,
    },
    filterView: {
        backgroundColor: '#fff',
        height: 50,
        width: '50%',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        borderTopWidth: 0,
    },
    filterInnerView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterInnerText: {
        marginLeft: 5,
        fontSize: 18,
        color: '#4D4F50',
    },
    itemContainer: {
        width: 155,
        marginLeft: 20,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 1,
        borderTopWidth: 0,
        borderRadius: 200,
        margin: 3,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    item: {
        fontSize: 13,
        fontWeight: '400',
        color: '#000',
    },
    itemOuterContainer: {
        width: size,
        height: size + 50,
    },
    categoryFlatList: {
        height: 140,
        marginTop: 5,
    }
});
export default styles;