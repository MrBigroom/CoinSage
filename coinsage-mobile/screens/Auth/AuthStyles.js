import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
    },

    button: {
        backgroundColor: '#6C63FF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    footerText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },

    link: {
        color: '#6C63FF',
        fontWeight: 'bold',
    },
});