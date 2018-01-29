import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    header: {
        paddingTop: 100,
        justifyContent: 'center',
        paddingLeft: 30
    },

    viewStyle: {
        paddingLeft: 30,
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
    },

    headerText: {
        fontSize: 30,
        color: 'white'
    },

    viewText: {
        fontSize: 16,
        color: 'white',
    }
});