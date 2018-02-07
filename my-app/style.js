import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
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
    },

    buttonStyle: {
        justifyContent: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
   },
   separatorStyle: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#555"
   },

});