import {
    StyleSheet, Text, View, Image,
    FlatList, TextInput,
    ScrollView, KeyboardAvoidingView
} from "react-native";
import { useState, useEffect } from "react";
import { IP } from "@env";
import { Icon, Input } from '@rneui/themed'
import axios from "axios";

const BottomSheetModalComponent = ({ avatar, name, content, like }) => {
    const [comment, setComment] = useState("");
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
        >
            <View style={styles.container}>
                <ScrollView style={styles.commentPost}>
                    <View style={styles.userComment}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: avatar }}
                        />
                        <View style={styles.comment}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.content}>{content}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.commentInput}>
                    <Input
                        placeholder="Comment here..."
                        rightIcon={{ type: 'feather', name: 'send' }}
                        onChangeText={value => this.setState({ comment: value })}
                        inputStyle={{ paddingLeft: 5 }}
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

export default BottomSheetModalComponent;