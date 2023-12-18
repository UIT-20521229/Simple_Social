import { View, Text, StyleSheet, StatusBar } from 'react-native'

const ContactList = ({ props }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contactCon}>
                <View style={styles.imgCon}>
                    <View style={styles.placeholder}>
                        <Text style={styles.txt}>{props?.name}</Text>
                    </View>
                </View>
                <View style={styles.contactDat}>
                    <Text style={styles.name}>{props?.name}</Text>
                    <Text style={styles.phoneNumber}>{props?.phoneNumbers?.number}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    contactCon: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d9d9d9',
    },
    imgCon: {},
    placeholder: {
        width: 55,
        height: 55,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactDat: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    txt: {
        fontSize: 18,
    },
    name: {
        fontSize: 16,
    },
    phoneNumber: {
        color: '#888',
    },
});

export default ContactList