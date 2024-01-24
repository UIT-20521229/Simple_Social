import { StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: StatusBar.currentHeight,
        alignItems: "center",
    },
    titleContainer: {
        marginTop: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "#4A55A2",
        fontSize: 17,
        fontWeight: "600",
    },
    subtitle: {
        fontSize: 17,
        fontWeight: "600",
        marginTop: 15,
    },
    formContainer: {
        marginTop: 50,
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        color: "gray",
    },
    input: {
        fontSize: 18,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        marginVertical: 10,
        width: 300,
    },
    loginButton: {
        width: 200,
        backgroundColor: "#4A55A2",
        padding: 15,
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 6,
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    signupButton: {
        marginTop: 15,
    },
    signupButtonText: {
        textAlign: "center",
        color: "gray",
        fontSize: 16,
    },
});