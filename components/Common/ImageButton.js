import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text} from 'react-native';

const ImageButton = ({ onPress,children, title }) => {
    const { ButtonStyle, ImageStyle } = styles;
    return(
        <TouchableOpacity style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
            onPress = {onPress}
        >
        <View style = {ButtonStyle}>
            <Image
            source = {children}
            style = {ImageStyle}
            />
            
        </View>
        <View style= {{ flex: 3, alignItems: 'center'}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#4a4d4e', paddingVertical: 5,  textAlign:'center'}}>{title} </Text>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ButtonStyle : {
        flex : 1,
        marginHorizontal: 20,
        width: 60, 
        height: 60,  
        backgroundColor: '#4a4d4e',
        borderRadius: 10,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    ImageStyle : {
        height: 45, 
        width: 45,
        
    },
});
export {ImageButton};