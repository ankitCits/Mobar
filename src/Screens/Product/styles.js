
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        backgroundColor: '#fff',
    },
    sectionStyle: {
        flexDirection: 'row',
        flex:1,
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        borderWidth: 0,
        borderColor: '#000',
        height: 40,
        width: 360,
        borderRadius: 5,
        marginHorizontal: 10,
        marginBottom:20,
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
        //height: 45,
        width: '50%',
        flexDirection:'row',
        justifyContent:'center',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        paddingVertical:6,
        borderTopWidth: 0,
    },
    filterInnerView: {
        //flexDirection: 'row',
        justifyContent: 'center',
        alignSelf:'center',
        justifyContent:'center'
    },
    filterInnerText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#4D4F50',
    },
    categoryFlatList: {
        height: 140,
        marginTop: 5,
    }
});
export default styles;