import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function History() {

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.page}>
                <Text>s</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    
    page:{
        flex:1,
        backgroundColor:'blue'
    }
});
