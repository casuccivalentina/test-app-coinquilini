import { ProfileLogin } from '@/components/profileLogin';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
    const loggato = false; //per prova
    return (
        <>
        <View style={styles.title}>
            <Text style={styles.titleText}>Profile</Text>
        </View>
        {!loggato && <ProfileLogin></ProfileLogin>}
        </>
    );
}

const styles = StyleSheet.create({
    title:{
        backgroundColor:'rgba(220, 139, 139, 1)',
        paddingTop:50,
        flexDirection:'row',
        justifyContent:'center',
        borderBottomWidth:0.5,
    },
    titleText:{
        fontSize:26,
        paddingBottom:10,
    },
});
