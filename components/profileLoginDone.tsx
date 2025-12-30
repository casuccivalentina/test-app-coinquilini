import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import ProfileImageModal from "./ProfileImageModal";
import { IconSymbol } from './ui/icon-symbol';

export default function ProfileLoginDone () {

    const router = useRouter();
    const [foto, setFoto] = useState(require('../assets/images/profile.png'));
    const [editingField, setEditingField] = useState<null | string>(null);
    const emailRef = useRef<TextInput>(null);
    const usernameRef = useRef<TextInput>(null);
    const nameRef = useRef<TextInput>(null);
    const surnameRef = useRef<TextInput>(null);

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
                toValue: 200,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => setModalVisible(false));
    };

    // ---- AZIONI FOTO ----
    const pickFromGallery = async () => {
        closeModal();

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
            setFoto({ uri: result.assets[0].uri });
        }
    };

    const takePhoto = async () => {
        closeModal();

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
            setFoto({ uri: result.assets[0].uri });
        }
    };

    const deletePhoto =()=>{
        closeModal();
        setFoto(require('../assets/images/profile.png'));
    }

    return (
        <>

        <TouchableWithoutFeedback
            onPress={() => {
                setEditingField(null);
                Keyboard.dismiss();
            }}
        >
            <View style={styles.Page}>
                
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
                <ScrollView style={{ flex:1 }}>

                    <TouchableOpacity style={styles.Image} onPress={openModal}>
                        <Image source={foto} style={styles.profileImage} />
                    </TouchableOpacity>

                    <View style={styles.titoloTesto}>
                        <Text style={styles.testo}>E-mail</Text>
                        <View style={styles.campo}>
                            <TextInput 
                                ref={emailRef}
                                style={styles.testoCampo} 
                                value='valentinacasucci@gmail.com' 
                                editable={editingField === 'email'}
                                selectTextOnFocus={true}
                            />
                            <TouchableOpacity onPress={() => {setEditingField('email');setTimeout(() => emailRef.current?.focus(), 50);}}>
                                <IconSymbol name={'pencil'} color={'rgb(0,0,0)'} size={20} style={{marginVertical:'auto', marginRight:0 }}></IconSymbol>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.titoloTesto}>
                        <Text style={styles.testo}>Username</Text>
                        <View style={styles.campo}>
                            <TextInput 
                                ref={usernameRef}
                                style={styles.testoCampo} 
                                value='valentinacasucci' 
                                editable={editingField === 'username'}
                                selectTextOnFocus={true}
                            />
                            <TouchableOpacity onPress={() => {setEditingField('username');setTimeout(() => usernameRef.current?.focus(), 50);}}>
                                <IconSymbol name={'pencil'} color={'rgb(0,0,0)'} size={20} style={{marginVertical:'auto', marginRight:0,}}></IconSymbol>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.titoloTesto}>
                        <Text style={styles.testo}>Nome</Text>
                        <View style={styles.campo}>
                            <TextInput
                                ref={nameRef}
                                style={styles.testoCampo} 
                                value='Valentina' 
                                editable={editingField === 'name'}
                                selectTextOnFocus={true}
                            />
                            <TouchableOpacity onPress={() => {setEditingField('name');setTimeout(() => nameRef.current?.focus(), 50);}}>
                                <IconSymbol name={'pencil'} color={'rgb(0,0,0)'} size={20} style={{marginVertical:'auto', marginRight:0,}}></IconSymbol>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.titoloTesto}>
                        <Text style={styles.testo}>Cognome</Text>
                        <View style={styles.campo}>
                            <TextInput
                                ref={surnameRef}
                                style={styles.testoCampo}
                                value='Casucci' 
                                editable={editingField === 'surname'}
                                selectTextOnFocus={true}
                            />
                            <TouchableOpacity onPress={() => {setEditingField('surname');setTimeout(() => surnameRef.current?.focus(), 50);}}>
                                <IconSymbol name={'pencil'} color={'rgb(0,0,0)'} size={20} style={{marginVertical:'auto', marginRight:0,}}></IconSymbol>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
        </>
    );
}

const styles = StyleSheet.create({
    Page:{
        flex:1,
        position:'relative',
        backgroundColor:'rgba(255, 255, 255, 1)',
    },
    Image:{
        marginHorizontal:'auto',
        marginTop:30,
        marginBottom:30,
    },
    profileImage:{
        borderWidth:1,
        height:200,
        aspectRatio:1,
        borderRadius:'50%',
    },
    username:{
        paddingBottom:20,
        borderBottomWidth:1,
        marginHorizontal:30,
    },
    /* testo:{
        fontSize:20,
        marginBottom:30,
    },
    testoCampo:{
        textAlign:'center',
        fontSize:24,
        fontWeight:600,
    }, */
    dettagli:{
        borderWidth:1,
        flexDirection:'row',
        justifyContent:'space-around',
        paddingVertical:20,
        marginHorizontal:50,
        borderRadius:10,
    },
    LinkText:{
        marginVertical:'auto',
        fontSize:22,
    },


    
    titoloTesto:{
        marginBottom:30,
        marginHorizontal:40,
    },
    campo:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    testo:{
        fontSize:16,
        marginVertical:'auto',
        color:'rgba(24, 140, 101, 1)',
    },
    testoCampo:{
        fontSize:20,
        fontWeight:500,
        marginVertical:'auto',
        paddingVertical:5,
        width:'90%',
        borderBottomWidth:0.5,
    },
});