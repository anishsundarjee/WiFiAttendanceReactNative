import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';

const ComingSoonScreen = ({ onPress,children, retryText }) => {
    const { ContainerStyle, TextStyle } = styles;
    return(
        <View style = {ContainerStyle}>
            <Text style = {TextStyle} >
                {children}
            </Text>
            <TouchableOpacity transparent
                onPress = {onPress}
            >
                <Text style = {{color: '#007c92', textDecorationLine: 'underline'}}>
                    {retryText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    ContainerStyle : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#F1F1F1',
    },
    TextStyle : {
        alignSelf : 'center',
        color : '#707070',
        fontSize : 20,
        fontWeight : '600',
        paddingVertical: 10
    },
});
export {ComingSoonScreen};