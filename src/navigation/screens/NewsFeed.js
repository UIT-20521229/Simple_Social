import { useEffect, useState, useLayoutEffect, useCallback, useMemo } from 'react';
import {
    StyleSheet, View, ScrollView,
    StatusBar, TextInput, Image,
    TouchableOpacity, Text,
} from 'react-native';
import { Card } from '../../components/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { setUsers, setUserId } from '../../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { jwtDecode } from 'jwt-decode';
import { decode } from "base-64";
import { IP } from '@env'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
global.atob = decode;

export default function NewsFeed() {
    const hasUnsavedChanges = Boolean(text);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { userId, userLoading } = useSelector(state => state.user);
    const [data, setData] = useState([]);
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [activePost, setActivePost] = useState(false);
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const bottomSheetModalRef = useRef(null);
    const openModal = (item) => {
        setHouseDataModal(item);
        bottomSheetModalRef.current.present();
    };

    // Get user
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('token')
            const decodeToken = jwtDecode(token)
            const userId = decodeToken.userId
            dispatch(setUserId(userId))

            await axios.get(`http://${IP}:3200/api/users/${userId}`)
                .then(res => {
                    dispatch(setUsers(res.data))
                })
                .catch(err => {
                    console.log("err:", err)
                })
        }
        fetchUser()
    }, [userId]);

    // Get all posts
    useLayoutEffect(() => {
        const fetchPosts = async () => {
            await axios.get(`http://${IP}:3200/api/getPosts`)
                .then(res => {
                    console.log("res:", res)
                    setData(res.data)
                })
                .catch(err => {
                    console.log("err:", err)
                })
        }
        fetchPosts()
    }, [activePost])

    // Prevent user from going back to Login screen
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges) {
                return;
            }
            e.preventDefault();
        }, [navigation])
    })

    const handlePost = async () => {
        const formData = new FormData();
        formData.append('image', {
            uri: image.uri,
            type: `${image.type}/jpeg`,
            name: 'image.jpg'
        });
        formData.append('content', text);
        formData.append('userPost', userId);

        await axios.post(`http://${IP}:3200/api/posts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => console.log(res)).catch(err => console.log(err.message))
        setActivePost(!activePost)
        setText('')
        setImage('')
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.post}>
                    <View style={styles.postViewInput}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/81/81ae0c5055925b5470e7621b7a1a1918f75e2ff1.jpg' }} />
                        <View style={styles.postInput}>
                            <TextInput
                                style={styles.inputField}
                                placeholder='What are you thinking?'
                                onChangeText={text => setText(text)}
                                value={text}
                            />
                            {text.length > 0 ?
                                <TouchableOpacity
                                    style={styles.buttonSend}
                                    onPress={handlePost}
                                >
                                    <Icon name='send' size={25} color={'cyan'} />
                                </TouchableOpacity>
                                : null
                            }
                        </View>
                        <TouchableOpacity style={styles.button} onPress={pickImage}>
                            <Icon name='photo' size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
                {data ? data.map(post => (
                    <BottomSheetModalProvider>
                        <SafeAreaView>
                            <Card
                                key={post._id}
                                data={post}
                                onPress={() => openModal(post)}
                            />
                        </SafeAreaView>
                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={0}
                            snapPoints={snapPoints}
                            style={styles.bottomSheet}
                        >
                            <BottomSheetModalComponent {...houseDataModal} />
                        </BottomSheetModal>
                    </BottomSheetModalProvider>
                )) : null}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
    },
    scrollView: {

    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 5,
    },
    post: {
        flexDirection: 'column',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    postViewInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 5,
    },
    postInput: {
        flex: 1,
        fontSize: 16,
        backgroundColor: '#f4f2f0',
        height: 40,
        borderRadius: 50,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonSend: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        flex: 1,
        fontSize: 16,
        paddingRight: 10,
        flexWrap: 'wrap',
    },
    postButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 40,
        borderRadius: 50 / 2,
    },

});


