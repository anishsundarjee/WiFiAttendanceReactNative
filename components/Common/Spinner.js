import React from 'react';
import { View, StyleSheet, ActivityIndicator, } from 'react-native';

const Spinner = ( { SpinnerSize } ) => {
    return (
        <View style = {styles.SpinnerStyle}>
            <ActivityIndicator size = { SpinnerSize || 'large' } />
        </View>
    );
};

const styles = StyleSheet.create({
    SpinnerStyle : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
});

export {Spinner};