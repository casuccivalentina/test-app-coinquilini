import ProfileLogin from '@/app/pages/profileLogin';
import ProfileLoginDone from '@/components/profileLoginDone';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const loggato = true; /* per prova */
    return (
        <>
        <View style={styles.title}>
            <Text style={styles.titleText}>Profile</Text>
        </View>
        {!loggato && <ProfileLogin></ProfileLogin>}
        {loggato && <>
                <TouchableOpacity style={styles.buttonTopRight} onPress={() => router.push('/pages/impostazioniProfilo')}>
                    <IconSymbol size={35} name="gear" color={'black'} />
                </TouchableOpacity>
                <ProfileLoginDone></ProfileLoginDone>
            </>}
        </>
    );
}

const styles = StyleSheet.create({
    title:{
        height:120,
        paddingTop:70,
        flexDirection:'row',
        justifyContent:'center',
        borderBottomWidth:0.5,
    },
    titleText:{
        fontSize:26,
        fontWeight:500,
        paddingBottom:10,
        color:'rgba(24, 140, 101, 1)',
    },
    buttonTopRight:{
        zIndex:2,
        position:'absolute',
        right:15,
        top:70,
    },
});
