import { useRef, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
    const animation = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        animation.current.play();
        setTimeout(() => {
            navigation.replace('Login')
        }, 5000)
    }, []);

    return (
        <View style={styles.animationContainer}>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 1000,
                    height: 1000,
                }}
                source={require('../../../assets/socialmedia.json')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
});