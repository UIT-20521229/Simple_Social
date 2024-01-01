import React, { useState, useEffect, createContext, useLayoutEffect } from 'react';
import {
    StyleSheet, View, TouchableOpacity,
    StatusBar, TextInput,
    Text, Button,
    FlatList, Keyboard, Image,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import { CustomSwitch } from '../../components/index';
import { setTheme } from '../../redux/slices/themeSlice'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { theme } = useSelector(state => state.theme);
    const [switchTheme, setSwitchTheme] = useState(false);
    const [inputText, setInputText] = useState('');
    const [noti, setNoti] = useState(false);
    const [history, setHistory] = useState([]);
    console.log(theme)
    const textTheme = theme === 'dark' ? styles.textDark : styles.textLight;

    const handleLogOut = async () => {
        await AsyncStorage.removeItem('token')
        navigation.navigate("Login")
    }

    const handleTextInput = (text) => {
        setInputText(text)
    }

    const handleSendFeedback = () => {
        const newHistory = [...history, { id: history.length, title: inputText }]
        setHistory(newHistory)
        storeData(newHistory)
        setInputText('');
        Keyboard.dismiss();
    };

    console.log('history', history)

    const handleSwitchTheme = () => {
        switchTheme ? dispatch(setTheme('light')) : dispatch(setTheme('dark'))
        setSwitchTheme(!switchTheme)
    }

    const handleSwitchNoti = () => {
        setNoti(!noti)
    }

    const handleNoti = () => {
        if (noti) {
            Alert.alert("Thanks for your feedback!!!")
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-100}
        >
            <View style={styles.container}>
                <View style={theme === 'dark' ? styles.dark : styles.light}>
                    <View style={styles.logo}>
                        <Image
                            style={styles.logoImage}
                            source={{
                                uri: 'https://reactnative.dev/img/logo-og.png'
                            }}
                        />
                        <Text style={[styles.logoText, textTheme]}>React Native App</Text>
                    </View>
                    <View style={styles.mode}>
                        <View style={styles.themeMode}>
                            <Text style={textTheme}>Dark Mode</Text>
                            <CustomSwitch isEnabled={switchTheme} handleSwitch={handleSwitchTheme} />
                        </View>
                        <View style={styles.notifications}>
                            <Text style={textTheme}>Nofitications</Text>
                            <CustomSwitch isEnabled={noti} handleSwitch={handleSwitchNoti} />
                        </View>
                    </View>
                    <View style={styles.feedback}>
                        <Text style={[textTheme, styles.textInput]}>Feedback</Text>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Type something"
                            placeholderTextColor="grey"
                            onChangeText={handleTextInput}
                            numberOfLines={3}
                            multiline={true}
                            style={[textTheme, styles.inputField]}
                            value={inputText}
                        />
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Button title='Send Feedback' onPress={handleSendFeedback} />
                    </TouchableOpacity>
                    <View style={styles.list}>
                        <FlatList
                            style={styles.flatList}
                            data={history}
                            ListHeaderComponent={() => <Text style={textTheme}>Frequently Asked Questions</Text>}
                            renderItem={({ item }) =>
                                <Text style={textTheme}>
                                    {item.title}
                                </Text>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.buttonFooter}>
                        <TouchableOpacity onPress={handleLogOut}>
                            <Icon name="logout" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    dark: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    light: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDark: {
        color: '#fff',
    },
    textLight: {
        color: '#000',
    },
    logo: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 120,
    },
    logoImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    logoText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 15,
    },
    mode: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 30,
        maxHeight: 100,
    },
    themeMode: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notifications: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    feedback: {
        width: '100%',
        paddingHorizontal: 20,
    },
    textInput: {
        width: '100%',
        textAlign: 'left',
    },
    inputField: {
        width: '100%',
        height: 100,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
    },
    button: {
        width: '60%',
    },
    list: {
        flex: 1,
        width: '60%',
    },
    buttonFooter: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 20,
        paddingBottom: 20,
    }
});

