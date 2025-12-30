import Spesa from '@/components/spesa';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const data = [
  {description: 'Hotel 2 notti', gruppo:'Weekend a Roma', totalAmount: 18, creator: 'Casucci Valentina', splitBetween: ['me','IasellaDavide'], done: false},
  {description: 'Hotel 4 notti', gruppo:'Weekend a Milano', totalAmount: 80.5, creator: 'me', splitBetween: ['me','Iasella Davide'], done: true},
  {description: 'Hotel 1 notte', gruppo:'Weekend a Valencia', totalAmount: 1, creator: 'me', splitBetween: ['me', 'Casucci Valentina'], done: true},
]

export default function History() {

    const [editingField, setEditingField] = useState<null | string>(null);
    const [searched, setSearched] = useState(false);
    const [filter, setFilter] = useState(false);
    const [filterDate, setFilterDate] = useState<null | Date>(null);
    const [filterImport, setFilterImport] = useState<null | [number, number]>(null);
    const [filterOrder, setFilterOrder] = useState<null | string>(null);
    const [filterTag, setFilterTag] = useState<null | [string,string]>(null);
    const searchRef = useRef<TextInput>(null);

    // ---- MODALE ----
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;    // sfondo fade
    const slideAnim = useRef(new Animated.Value(200)).current; // contenuto dal basso


    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.page}>
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={() => {
                    setEditingField(null);
                    Keyboard.dismiss();
                    }}
                />

                <View style={styles.riepilogoSpese}>
                    <View style={{flex:0.5,marginVertical:'auto'}}>
                        <Text style={styles.riepilogoSpeseTitolo}>Total expense</Text>
                        <Text
                            style={[
                            styles.riepilogoSpeseCampo,
                            ]}
                        >
                            {(10).toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'EUR',
                            })}
                        </Text>
                    </View>
                    <View style={{flex:0.5,marginVertical:'auto'}}>
                        <Text style={styles.riepilogoSpeseTitolo}>My expense</Text>
                        <Text
                            style={[
                            styles.riepilogoSpeseCampo,
                            ]}
                        >
                            {(10).toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'EUR',
                            })}
                        </Text>
                    </View>

                </View>

                <View style={styles.list}>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 20 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {data.map((d, i) => (
                            <Spesa
                                key={i}
                                done={d.done}
                                description={d.description}
                                totalAmount={d.totalAmount}
                                splitBetween={d.splitBetween}
                                creator={d.creator}
                                gruppo={d.gruppo}
                                data={(new Date().toLocaleDateString('it-IT'))}
                            />
                        ))}
                    </ScrollView>
                    <LinearGradient
                        pointerEvents="none"
                        colors={['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 1)']}
                        style={styles.fadeBottom}
                    />
                </View>
                <TouchableOpacity style={styles.add}  onPress={() => {}}>
                    <Text style={styles.LinkText}>Add expense</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    page:{
        flex:1,
    },
    riepilogoSpese:{
        flex:0.1,
        flexDirection:'row',
        marginHorizontal:20,
    },
    riepilogoSpeseTitolo:{
        fontSize:16,
        width:150,
        textAlign:'center',
        marginHorizontal:'auto',
    },
    riepilogoSpeseCampo:{
        fontSize:22,
        textAlign:'center',
        marginTop:5,
        fontWeight:600,
    },
    list:{
        flex: 0.7,
    },
    fadeBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100, // regola come vuoi
    },
    add:{
        position:'absolute',
        bottom:80,
        borderWidth:2,
        borderColor:'rgba(24, 140, 101, 1)',
        borderRadius:10,
        backgroundColor:'rgba(24, 140, 101, 0.2)',
        paddingVertical:10,
        paddingHorizontal:20,
        left:'51%',
        transform:[{translateX:'-51%'}]
    },
    LinkText:{
        fontSize:20,
    },
});
