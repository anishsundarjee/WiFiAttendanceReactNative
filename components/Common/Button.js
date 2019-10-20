import React from 'react';
import { Text, TouchableOpacity, StyleSheet, } from 'react-native';
import Colors from '../../constants/Colors'

const Button = ({ onPress,children, disabled,style }) => {
    const { ButtonStyle, TextStyle } = styles;
    return(
        <TouchableOpacity onPress = {onPress} style = {[ButtonStyle,style]}>
            <Text style = {[TextStyle,style]} >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ButtonStyle : {
        //flex : 1,
        alignSelf : 'stretch',
        backgroundColor : Colors.loginButtonColor,
        borderWidth : 1,
        borderRadius : 50,
        borderColor : Colors.loginButtonColor,
        // marginHorizontal: 20,
        height: 50,
        marginLeft:5,
        marginRight:5
    },
    TextStyle : {
        alignSelf : 'center',
        color : Colors.loginButtonTextColor,
        fontSize : 18,
        fontWeight : '600',
        paddingVertical: 10
    },
});
export {Button};