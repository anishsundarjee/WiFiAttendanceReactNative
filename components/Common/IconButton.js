import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const IconButton = ({ onPress,children }) => {
    const { ButtonStyle, TextStyle } = styles;
    return(
        <View style = {{marginLeft: 10}}>
            <TouchableOpacity onPress = {onPress} style = {ButtonStyle}>
                {children}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    ButtonStyle : {
        flex : 1,
        height: 60, 
        width: 90,
        borderRightWidth: 0.18, 
        alignSelf : 'stretch',
        backgroundColor : '#F1F1F1',
        borderRightColor : '#707070',
    },
    TextStyle : {
        flex:1,
        alignSelf : 'center',
        color : '#707070',
        fontSize : 13,
        fontWeight : '600',
    },
});
export {IconButton};