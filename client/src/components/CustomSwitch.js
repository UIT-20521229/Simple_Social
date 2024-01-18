import React from 'react';
import {
    StyleSheet, View,
    StatusBar, Switch,
} from 'react-native';

export default function CustomSwitch(props) {
    return (
        <View>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={props.isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={props.handleSwitch}
                value={props.isEnabled}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
});


