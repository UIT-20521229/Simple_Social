import {
    StyleSheet, Text, View, Image,
    FlatList,
    TextInput
} from "react-native";
import { } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BottomSheetModalComponent = ({
    avatar,
    name,
    content,
    like,
}) => {
    return (
        <View style={styles.container}>
            <View>

            </View>
            <View>
                <Image src={{ uri:  }} />
                <TextInput />
                <Icon name="send" type="" size={35} />
            </View>
        </View>
    );
};

export default BottomSheetModalComponent;