import React from 'react';
import {StyleSheet} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';

export default () => {

    return(
        <LinearGradient
            colors={['#00435a','#38c0bb']}
            style={style.linear}

        />
    )
}

const style = StyleSheet.create({
    linear:{
        position:'absolute',
        left:0,
        top:0,
        display: 'flex',
        flex: 1,
        width:'100%',
        height:'100%'
    }
})
