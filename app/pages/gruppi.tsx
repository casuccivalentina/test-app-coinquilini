import ModalNuovoGruppo from '@/app/pages/modalNuovoGruppo';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const data = [
    {
        nome: 'Weekend a Roma',  
        foto: '../../assets/images/favicon.png', 
        createdBy: 'Casucci Valentina',  
        createdAt: new Date(),
        members: ['Casucci Valentina','Iasella Davide'],
        totalExp: 100,
    },{
        nome: 'Weekend a Milan',
        foto: '../../assets/images/favicon.png', 
        createdBy: 'me',                 
        createdAt: new Date(),
        members: ['Casucci Valentina','Iasella Davide','Casucci Valentina','Iasella Davide','Casucci Valentina','Iasella Davide'],
        totalExp: 100,
    },{
        nome: 'Weekend a Roma',  
        foto: '../../assets/images/favicon.png', 
        createdBy: 'Casucci Valentina',  
        createdAt: new Date(),
        members: ['Casucci Valentina','Iasella Davide'],
        totalExp: 100,
    },{
        nome: 'Weekend a Milano',
        foto: '../../assets/images/favicon.png', 
        createdBy: 'me',                 
        createdAt: new Date(),
        members: ['Casucci Valentina','Iasella Davide'],
        totalExp: 100,
    },{
        nome: 'Weekend a Roma',  
        foto: '../../assets/images/favicon.png', 
        createdBy: 'Casucci Valentina',  
        createdAt: new Date(),
        members: ['Casucci Valentina','Iasella Davide'],
        totalExp: 100,
    },
]

export default function Gruppi() {
    // ---- MODALE ----
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;    // sfondo fade
    const slideAnim = useRef(new Animated.Value(200)).current; // contenuto dal basso

    const openModal = () => {
        setModalVisible(true);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                bounciness: 5,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeModal = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 800,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => setModalVisible(false));
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.title}>
                <Text style={styles.titleText}>Gruppi</Text>
                <TouchableOpacity style={styles.backButton} onPress={()=>router.push('..')}>
                    <IconSymbol name={'chevron.left'} color={'rgb(0,0,0)'}></IconSymbol>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={()=>openModal()}>
                    <IconSymbol name={'plus'} color={'rgb(0,0,0)'}></IconSymbol>
                </TouchableOpacity>
            </View>
            <View style={styles.page}>
                <View style={{height:'100%'}}>
                    <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:0}}>
                        {data.map((d, i)=>(
                            <TouchableOpacity key={i} style={styles.gruppo} onPress={() =>router.push({
                                pathname: '/pages/singleGroup',
                                params: {
                                    nome: d.nome,
                                    foto: d.foto,
                                    createdBy: d.createdBy,
                                    createdAt: d.createdAt.toLocaleDateString('it-IT'),
                                    members: JSON.stringify(d.members),
                                    totalExp: d.totalExp,
                                },
                            })}>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={require('../../assets/images/favicon.png')} style={styles.photo}/>
                                    <View>
                                        <Text style={styles.nomeGruppo}>{d.nome}</Text>
                                        <Text style={styles.createdByGruppo}>By {d.createdBy}</Text>
                                    </View>
                                </View>
                                <IconSymbol name={'chevron.right'} color={'rgb(0,0,0)'} style={{marginVertical:'auto'}}></IconSymbol>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <LinearGradient
                    pointerEvents="none"
                    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                    style={styles.fadeBottom}
                    />
                </View>
            </View>
            <ModalNuovoGruppo
                visible={modalVisible}
                fadeAnim={fadeAnim}
                slideAnim={slideAnim}
                onClose={closeModal}
            />
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
        position:'relative',
    },
    backButton:{
        zIndex:2,
        marginTop:70,
        position:'absolute',
        top:-5,
        left:5,
        padding:10,
    },
    addButton:{
        zIndex:2,
        marginTop:70,
        position:'absolute',
        top:-5,
        right:5,
        padding:10,
    },
    titleText:{
        color:'rgba(24, 140, 101, 1)',
        fontSize:26,
        fontWeight:500,
        paddingBottom:10,
    },
    page:{
        flex:1,
        paddingTop:30,
        paddingBottom:80,
        backgroundColor:'rgba(255, 255, 255, 1)',
    },
    gruppo:{
        marginHorizontal:30,
        marginVertical:15,
        borderRadius:10,
        borderWidth:2,
        borderColor:'rgba(24, 140, 101, 1)',
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    photo:{
        borderWidth:0.5,
        borderRadius:10,
        marginRight:10,
    },
    fadeBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100, // regola come vuoi
    },
    nomeGruppo:{
        fontSize:22,
        fontWeight:600,
        marginBottom:5,
    },
    createdByGruppo:{
        fontSize:14,
    },
});
