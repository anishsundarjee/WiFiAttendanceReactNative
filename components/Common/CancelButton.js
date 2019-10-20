import React from 'react';
import { Text, TouchableOpacity, StyleSheet, } from 'react-native';

const CanelButton = ({ onPress,children }) => {
    const { ButtonStyle, TextStyle } = styles;
    return(
        <TouchableOpacity onPress = {onPress} style = {ButtonStyle}>
            <Text style = {TextStyle} >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ButtonStyle : {
        //flex : 1,
        alignSelf : 'stretch',
        backgroundColor : '#fff',
        borderWidth : 1,
        borderRadius : 50,
        borderColor : '#707070',
        // marginHorizontal: 20,
        height: 50,
        marginLeft:5,
        marginRight:5
    },
    TextStyle : {
        alignSelf : 'center',
        color : '#707070',
        fontSize : 18,
        fontWeight : '600',
        paddingVertical: 10
    },
});
export {CanelButton};