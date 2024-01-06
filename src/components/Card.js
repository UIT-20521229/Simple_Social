import { useState, memo, useMemo, useEffect, useRef } from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IP } from '@env'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, ListItem, BottomSheet } from '@rneui/themed';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function Card({ data }) {
    // Get user from redux
    const { userId } = useSelector(state => state.user);
    // Bottom Sheet
    const bottomSheetRef = useRef(null);
    const handleOpen = () => setIsVisible(true);
    const list = [
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];

    // Navigation and Route
    const navigation = useNavigation();
    const route = useRoute();

    // Define state actions
    const [countlike, setCountLike] = useState(0);
    const [activeLike, setActiveLike] = useState(true);
    const [comment, setComment] = useState([data.comment]);
    const [share, setShare] = useState(data.share);
    const [user, setUser] = useState(data.userPost.name);
    const [input, setInput] = useState('');
    const [comments, setComments] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [like, setLike] = useState(data.like);

    // handle date time
    const moment = require('moment');
    const date = moment(data.createdAt).startOf('day').fromNow();
    const [createdAt, setCreatedAt] = useState(date);
    const [image, setImage] = useState(null);

    // Handle image path
    useEffect(() => {
        if (data.image !== '' && data.image !== null) {
            const pathName = data.image;
            const fileName = pathName.split('\\').pop().split('/').pop();
            setImage(fileName);
        }
    }, [image]);


    // Handle post
    const handleActiveLike = (e) => {
        setActiveLike(!activeLike);
        handleLike();
    }
    console.log(data)
    const handleLike = (e) => {
        if (activeLike) {
            setCountLike(countlike + 1);
        } else {
            setCountLike(countlike - 1);
        }
        // const dataForm = {
        //     activeLike: activeLike,
        //     _id: data._id,
        // }
        // axios.post(`http://${IP}:3200/api/like`, dataForm, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }

    const handleShare = (e) => {
        setShare(share + 1);
    }

    const handleDetailUser = async (e) => {
        navigation.navigate('DetailsUser', { user: data.userPost });
    }

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <View style={styles.post}>
                    <View style={styles.card}>
                        <View style={styles.avatar}>
                            <TouchableOpacity onPress={handleDetailUser}>
                                <Image
                                    style={styles.avatarLogo}
                                    source={{
                                        uri: data.avatar || 'https://www.w3schools.com/howto/img_avatar.png',
                                    }}
                                />
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity onPress={handleDetailUser}>
                                    <Text style={styles.avatarText}>
                                        @{user}
                                    </Text>
                                </TouchableOpacity>
                                <Text>{createdAt}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.textPost}>
                                {data.content}
                            </Text>
                            <View style={styles.imagePost}>
                                {data.image ?
                                    <Image
                                        style={styles.image}
                                        source={{ uri: `http://${IP}:3200/${image}` }}
                                    /> : null
                                }
                            </View>
                        </View>
                        <View style={styles.detailPost}>
                            <Text style={styles.detailText}>{countlike} Likes</Text>
                            <Text style={styles.detailText}>{comment} Comments</Text>
                            <Text style={styles.detailText}>{share} Shares</Text>
                        </View>
                        <View style={styles.straightLine}></View>
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.buttonPost} onPress={handleActiveLike}>
                                {activeLike ?
                                    <Icon name="thumbs-o-up" size={15} color="#000" />
                                    :
                                    <Icon name="thumbs-up" size={15} color="#000" />
                                }
                                <Text style={styles.buttonText}>Likes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonPost} onPress={handleOpen}>
                                <Icon name="comment-o" size={15} color="#000" />
                                <Text style={styles.buttonText}>Comments</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonPost} onPress={handleShare}>
                                <Icon name="share-square-o" size={15} color="#000" />
                                <Text style={styles.buttonText}>Shares</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <BottomSheet modalProps={{}} isVisible={isVisible}>
                {list.map((l, i) => (
                    <ListItem
                        key={i}
                        containerStyle={l.containerStyle}
                        onPress={l.onPress}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 30,
    },
    post: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
    },
    card: {
        flex: 0.1,
        backgroundColor: 'white',
        padding: 10,
        marginTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 6,
    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarLogo: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 50 / 2,
    },
    avatarText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
    },
    imagePost: {
        borderRadius: 50,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    textPost: {
        fontSize: 15,
        margin: 10,
    },
    button: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonPost: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    detailPost: {
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailText: {
        color: 'grey',
    },
    straightLine: {
        width: '90%',
        borderColor: 'black',
        borderBottomWidth: 0.5,
        margin: 15,
    },
    buttonText: {
        paddingLeft: 10,
    },
});

export default memo(Card);