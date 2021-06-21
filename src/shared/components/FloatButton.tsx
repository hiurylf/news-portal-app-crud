import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface Props {
    handle: () => void,
    color: 'sucess' | 'danger',
    name: string,
    where?: 'left' | 'right'
}

const FloatButton: React.FC<Props> = ({handle, color, name, where}) => {
    return (
        <TouchableOpacity
            style={[styles.container, styles[color], styles[where || 'right']]}
            onPress={handle}
        >
            <Ionicons name={name as any} size={30} color='white' />
        </TouchableOpacity>
    )
}

export default FloatButton;

const styles = StyleSheet.create({
    container: {
        width: 55,
        height: 55,
        borderRadius: 30,
        position: 'absolute',
        bottom: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sucess: {
        backgroundColor: '#0cd700',
    },
    danger: {
        backgroundColor: '#d90000',
    },
    right: {
        right: 12,
    },
    left: {
        left: 12,
    }
});
