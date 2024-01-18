import {
    StyleSheet, Text, View, Image,
    FlatList, TextInput,
    ScrollView, KeyboardAvoidingView,
    TouchableOpacity
} from "react-native";
import { useState, useEffect, memo, useCallback } from "react";
import { IP } from "@env";
import { Icon, Input } from '@rneui/themed'
import axios from "axios";
import { useSelector } from "react-redux";

const BottomSheetModalComponent = ({ postId }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const { userId } = useSelector(state => state.user);
    const [send, setSend] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            await axios.get(`http://${IP}:3200/posts/get-comments/${postId}`)
                .then(res => {
                    setComments(res.data)
                })
                .catch(err => {
                    console.log("err:", err)
                })
        }
        fetchComments()
    }, []);

    const sendComment = useCallback(async () => {
        const data = new FormData
        data.append("postId", postId)
        data.append("userComment", userId)
        data.append("content", comment)

        await axios.post(`http://${IP}:3200/posts/create-comment`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log("err:", err)
            })
        setSend(!send)
        setComment("")
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
        >
            <View style={styles.container}>

                <FlatList
                    data={comments}
                    renderItem={({ item }) =>
                        <ScrollView style={styles.commentPost}>
                            <View style={styles.userComment}>
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: item.avatar }}
                                />
                                <View style={styles.comment}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.content}>{item.content}</Text>
                                </View>
                            </View>
                        </ScrollView>}
                    keyExtractor={item => item.id}
                />
                <View style={styles.commentInput}>
                    <Input
                        placeholder="Comment here..."
                        rightIcon={() => <TouchableOpacity onPress={sendComment}>
                            <Icon name="send" />
                        </TouchableOpacity>}
                        onChangeText={value => setComment(value)}
                        inputStyle={{ paddingLeft: 5 }}
                        value={comment}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    commentPost: {
        flex: 1,
        paddingHorizontal: 10,
    },
    commentInput: {
        alignItems: "center",
        paddingHorizontal: 15,
        height: 70,
        borderTopWidth: 1,
    },
    userComment: {
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderRadius: 60,
        height: 65,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 5,
    },
    comment: {
        flexDirection: "column",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    content: {
        fontSize: 16,
        paddingRight: 50,
        flexWrap: "wrap",
        flexShrink: 1,
    },
})

export default memo(BottomSheetModalComponent);