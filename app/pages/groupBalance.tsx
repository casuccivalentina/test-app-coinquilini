import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const salds = [
    {
        creditor: 'marcodallavalle', 
        debitor:'valentinacasucci',
        initialAmount:30,
        interests:10,
    },
    {
        creditor: 'valentinacasucci', 
        debitor:'marcodallavalle',
        initialAmount:50,
        interests:5,
    },
    {
        creditor: 'valentinacasucci', 
        debitor:'marcodallavalle',
        initialAmount:50,
        interests:5,
    },
];

export default function Balance() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.page}>
                <Pressable style={StyleSheet.absoluteFill} onPress={() => {Keyboard.dismiss();}}
            />
                <View style={styles.saldi}>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 60 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {salds.map((s,i) => (
                            <View key={i} style={styles.saldo}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                                    <Text style={{fontSize:18,fontWeight:600,}}>{s.creditor}</Text>
                                    {/* <Text style={{fontSize:16,}}>owes</Text> */}
                                    <IconSymbol name={'arrow.right'} color={'rgb(0,0,0)'}></IconSymbol>
                                    <Text style={{fontSize:18,fontWeight:600,}}>{s.debitor}</Text>
                                </View>
                                
                                <Text style={{fontSize:22,fontWeight:500,marginHorizontal:'auto',marginVertical:10,}}>{(s.initialAmount+s.interests).toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                    <View style={{width:'30%'}}>
                                        <Text style={{fontSize:16,marginHorizontal:'auto'}}>Expense</Text>
                                        <Text style={{fontSize:18,fontWeight:500,marginHorizontal:'auto',}}>{s.initialAmount.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        })}</Text>
                                    </View>
                                    <View style={{width:'30%'}}>
                                        <Text style={{fontSize:16,marginHorizontal:'auto'}}>Interest</Text>
                                        <Text style={{fontSize:18,fontWeight:500,marginHorizontal:'auto',}}>{s.interests.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        })}</Text>
                                    </View>
                                </View>

                                <View style={styles.buttons}>
                                    <TouchableOpacity style={{...styles.button,borderColor:'rgba(255,0,0,1)',backgroundColor:'rgba(255,0,0,0.2)'}} onPress={()=>{}}>
                                        <Text style={{fontSize:18,textAlign:'center'}}>Urges payment</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={()=>{}}>
                                        <Text style={{fontSize:18,textAlign:'center'}}>Payed</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <LinearGradient
                        pointerEvents="none"
                        colors={['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 1)']}
                        style={styles.fadeBottom}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    page:{
        flex:1,
    },
    saldi:{
        marginTop:10,
        flex:0.9,
        marginHorizontal:20,
    },
    saldo:{
        borderWidth:2,
        borderColor:'rgba(24, 140, 101, 1)',
        borderRadius:10,
        marginHorizontal:10,
        marginVertical:10,
        paddingVertical:15,
        paddingHorizontal:10,
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
    },
    button:{
        borderWidth:2,
        borderColor:'rgba(24, 140, 101, 1)',
        borderRadius:5,
        backgroundColor:'rgba(24, 140, 101, 0.2)',
        paddingVertical:10,
        width:'48%',
    },
    fadeBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100, // regola come vuoi
    },
});
