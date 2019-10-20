import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import {
    Container,
    Title,
    Button,
    Icon,
    Left,
    Right,
    Body
  } from "native-base";

const Header = (props) => {
    const { textStyle, ViewStyle } = styles;
    return(
            <View style={ViewStyle}>
                <Text style={textStyle}>
                    {props.HeaderText}
                </Text>
            </View>
    );
};
const styles = StyleSheet.create({
    textStyle : {
        fontSize:20,
    },
    ViewStyle : {
        backgroundColor : '#F8F8F8',
        justifyContent : 'center',
        alignItems : 'center',
        height : 60,
        paddingTop : 15,
        shadowColor : '#000',
        shadowOffset : {width : 0, height : 2},
        shadowOpacity : 0.4,
        elevation : 2,
        position : 'relative',
    },
});

export { Header };
