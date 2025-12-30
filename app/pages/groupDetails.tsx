import ProfileImageModal from '@/components/ProfileImageModal';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import '../../assets/images/profile.png';


type Props = {
    foto: string;
    nome: string;
    createdAt: string;
    createdBy: string;
    members: string[];
    totalExp: number;
};

export default function Details({ foto, nome, createdAt, createdBy, members, totalExp }:Props) {

    const [editingField, setEditingField] = useState<null | string>(null);

    const imageSource = foto && foto.trim() !== '' ? { uri: foto } : require('../../assets/images/profile.png');

    // ---- MODALE ----
    const [fotoProfilo, setFotoProfilo] = useState(imageSource);
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
                toValue: 200,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => setModalVisible(false));
    };

    // ---- AZIONI FOTO ----
    const pickFromGallery = async () => {

        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Permesso necessario per accedere alla galleria.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setFotoProfilo({ uri: result.assets[0].uri });
        }
        closeModal();
    };

    const takePhoto = async () => {

        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            alert("Permesso necessario per usare la fotocamera.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setFotoProfilo({ uri: result.assets[0].uri });
        }
        closeModal();
    };

    const deletePhoto =()=>{
        setFotoProfilo(require('../../assets/images/profile.png'));
        closeModal();
    }


    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            

            <View style={styles.page}>
                {/* overlay trasparente */}
                {!modalVisible && (
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setEditingField(null);
                            Keyboard.dismiss();
                        }}
                    >
                        <View style={StyleSheet.absoluteFill} />
                    </TouchableWithoutFeedback>
                )}
                
                {/* MODALE CAMBIO FOTO */}
                <ProfileImageModal
                    visible={modalVisible}
                    fadeAnim={fadeAnim}
                    slideAnim={slideAnim}
                    onClose={closeModal}
                    onTakePhoto={takePhoto}
                    onPickFromGallery={pickFromGallery}
                    onDeletePhoto={deletePhoto}
                />

                <View style={styles.header}>
                    <TouchableOpacity style={{marginHorizontal:'auto',marginVertical:'auto',}} onPress={openModal}>
                        <Image source={fotoProfilo} style={{width:100,height:100,borderRadius:5,}}/>
                    </TouchableOpacity>
                    <View style={{marginHorizontal:'auto',marginVertical:'auto'}}>
                        <View style={{flexDirection:'row',marginHorizontal:'auto'}}>
                            <Text style={styles.creationGruppo}>by  </Text>
                            <Text style={{...styles.creationGruppo,fontWeight:600}}>{createdBy}</Text>
                            <Text style={styles.creationGruppo}>,</Text>
                        </View>
                        <Text style={styles.creationGruppo}>{createdAt}</Text>
                    </View>
                </View>
                <View style={styles.membri}>
                    <Text style={{fontSize:18,marginVertical:10,}}>Members:</Text>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 20 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {members.map((m,i) => (
                            <View key={i} style={styles.membro}>
                                <Text style={{fontSize:20,}}>{m}</Text>
                                <Text style={{fontSize:18,fontWeight:600,marginVertical:'auto',color:i>0?'rgba(24,140,101,1)' : 'rgba(237,29,29,1)'}}>{(10).toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}</Text>
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
    header:{
        flex:0.2,
        flexDirection:'row',
        marginHorizontal:50,
        color:'rgba(24, 140, 101, 1)',
    },
    nomeGruppo:{
        fontSize:20,
        marginLeft:30,
        marginBottom:5,
        fontWeight:600,
    },
    creationGruppo:{
        //textAlign:'center',
        fontSize:16,
    },
    membri:{
        flex:0.7,
        marginHorizontal:40,
    },
    membro:{
        borderWidth:2,
        borderColor:'rgba(24, 140, 101, 1)',
        borderRadius:10,
        marginHorizontal:10,
        marginVertical:10,
        paddingVertical:15,
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    fadeBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100, // regola come vuoi
    },
});
