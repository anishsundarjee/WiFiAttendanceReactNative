import React from 'react';
import {  TextInput,View,Text} from 'react-native';

const Input=({label,value,onChangeText,placeHolder,isPassword,maxlength,keyboardType})=>{
    const {inputStyle,containerStyle,labelStyle}=styles;
    return(
        <View style={containerStyle}>
            <Text style={labelStyle}>
            
                {label}
            
            </Text>
            <TextInput
                style={inputStyle}
                placeholder={placeHolder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPassword}
                maxLength={maxlength}
                keyboardType={keyboardType}
                underlineColorAndroid="transparent"
            >

            </TextInput>
        </View>
    );
};

const styles={
    inputStyle:{
        color:'#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18, 
        lineHeight:23,
        flex:2
    },
    labelStyle:{
        fontSize:18,
        paddingLeft:20,
        flex:1
    },
    containerStyle:{
        height:40,
        flex:1,
        flexDirection: 'row',
        alignItems:'center'
    }

}

export {Input};