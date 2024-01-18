import { useEffect, useLayoutEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ActivityIndicator, StatusBar, Image, ScrollView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { User } from '../../components/index';

export default function Home({ navigation }) {
    const { users } = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            {users ? users.map((item, index) => (
                <User key={index} item={item} />
            )) : <ActivityIndicator style={{ flex: 1 }}></ActivityIndicator>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#fff',
    },
    buttonHeader: {
        justifyContent: "space-between",
        marginRight: 10,
    },
})

