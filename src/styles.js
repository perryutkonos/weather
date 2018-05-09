import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    app:{
        flex: 1,
        backgroundColor: '#fff',
        
    },
    toolbar:{
        backgroundColor: '#ae4b84',
        height: 56,
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    content: {
       marginTop:150
    },
    name: {
        fontSize: 50,
        textAlign: "center",
        marginBottom: 30,
        color: "#000",
    },
    result: {
        fontSize: 30,
        color: "#666",
        textAlign: "center",
    },
    error: {
        fontSize: 30,
        color: "#ff0400",
        textAlign: "center",
        marginBottom: 30
    },
    status: {
        fontSize: 20,
        color: "#666",
        textAlign: "center"
    },
    button: {
        color: "#003B66",
    }
});
