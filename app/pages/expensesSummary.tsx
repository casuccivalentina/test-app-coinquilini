import Spesa from '@/components/spesa';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import ModalFiltri from './modalFiltri';


const data = [
  {description: 'Hotel 2 notti', gruppo:'Weekend a Roma', totalAmount: 18, creator: 'Casucci Valentina', splitBetween: ['Dalla Valle Marco','IasellaDavide'], tagName: 'Impegni', tagColor: 'rgba(150, 8, 126, 1)', done: false},
  {description: 'Hotel 4 notti', gruppo:'Weekend a Milano', totalAmount: 80.5, creator: 'me', splitBetween: ['me','Iasella Davide'], tagName: 'Viaggi', tagColor: 'rgba(255, 0, 0, 1)', done: true},
  {description: 'Hotel 1 notte', gruppo:'Weekend a Valencia', totalAmount: 1, creator: 'me', splitBetween: ['me', 'Casucci Valentina'], tagName: 'Scuola', tagColor: 'rgba(17, 215, 30, 1)', done: true},
]

export default function Summary() {

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

            <TouchableWithoutFeedback
                onPress={() => {
                    setEditingField(null);
                    Keyboard.dismiss();
                }}
            >
            <View style={styles.page}>
                <View style={{height:'100%',}}>
                    <View style={styles.menu}>
                        {(searched||filter)&&<View style={{flex:0.8,flexDirection:'row',justifyContent:'space-between'}}>
                            {searched&&<View style={styles.searched}>
                                {/*  */}
                                <TextInput 
                                    ref={searchRef}
                                    style={styles.testoCampo}
                                    selectTextOnFocus={true}
                                />
                                <TouchableOpacity onPress={()=>{ setSearched(false)}}>
                                    <IconSymbol name={'x.circle'} color={'rgb(0,0,0)'} size={25} style={{marginVertical:'auto',}}></IconSymbol>
                                </TouchableOpacity>
                            </View>}
                            {filter && (
                                <TouchableOpacity style={{...styles.filters, flex: searched ? 1 : 1 }} onPress={()=>openModal()}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:10}}>
                                        {filterDate&&<Text style={styles.singleFilter}>{filterDate.toLocaleDateString()}</Text>}
                                        {filterImport&&<Text style={styles.singleFilter}>{filterImport[0].toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'EUR',
                                            })} - {filterImport[1].toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'EUR',
                                            })}</Text>}
                                        {filterOrder&&<Text style={styles.singleFilter}>{filterOrder}</Text>}
                                        {filterTag&&<Text style={{...styles.singleFilter,color:filterTag[1]}}>{filterTag[0]}</Text>}
                                    </ScrollView>
                                </TouchableOpacity>
                            )}
                        </View>}
                        <View style={styles.menuButton}>
                            <TouchableOpacity style={styles.buttonSearch} onPress={() => {setEditingField('search');setTimeout(() => searchRef.current?.focus(), 50); setSearched(!searched)}}>
                                <IconSymbol name={'magnifyingglass'} color={'rgba(0,0,0,1)'} size={28}></IconSymbol>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonFilter}  onPress={()=>openModal()}>
                                <IconSymbol name={'slider.horizontal.3'} color={'rgba(0,0,0,1)'} size={28}></IconSymbol>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:20,paddingTop:0}}>
                        {data.map((d, i)=>(<Spesa
                            key={i}
                            done={d.done}
                            description={d.description}
                            totalAmount={d.totalAmount}
                            splitBetween={d.splitBetween}
                            creator={d.creator}
                            gruppo={d.gruppo}
                            data={(new Date().toLocaleDateString('it-IT'))}
                            tagName={d.tagName}
                            colorTag={d.tagColor}
                        />))}
                    </ScrollView>
                    <LinearGradient
                    pointerEvents="none"
                    colors={['rgba(255, 255, 255, 0)','rgba(255, 255, 255, 1)']}
                    style={styles.fadeBottom}
                    />
                </View>
            </View>
            </TouchableWithoutFeedback>
            <ModalFiltri
                visible={modalVisible}
                fadeAnim={fadeAnim}
                slideAnim={slideAnim}
                onClose={closeModal}
                setFilter={(f:boolean)=>setFilter(f)}
                filterDate={(f:Date)=>(setFilterDate(f))}
                filterImport={(f:[number, number])=>(setFilterImport(f))}
                filterOrder={(f:string)=>(setFilterOrder(f))}
                filterTag={(t:any)=>(setFilterTag(t))}
            />
        </>
    );
}

const styles = StyleSheet.create({
    
    page:{
        flex:1,
        paddingBottom:10,
    },
    subtitle:{
        textAlign:'center',
        fontSize:16,
    },
    menu:{
        flexDirection:'row',
        width:'95%',
        marginBottom:10,
        marginHorizontal:'auto',
        justifyContent:'flex-end',
    },
    searched:{
        width:'50%',
        marginVertical:'auto',
        height:35,
        marginLeft:5,
        borderWidth:1,
        borderColor:'rgba(24, 140, 101, 1)',
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:3,
        paddingHorizontal:5
    },
    testoCampo:{
        flex:1,
        fontSize:18,
        width:'50%',
    },
    filters:{
        borderWidth:1,
        borderColor:'rgba(24, 140, 101, 1)',
        borderRadius:10,
        flexDirection:'row',
        marginVertical:'auto',
        height:35,
        paddingHorizontal:10,
        overflowX:'hidden',
        marginLeft:5,
    },
    singleFilter:{
        fontSize:16,
        marginVertical:'auto',
        //textDecorationLine:'underline',
        backgroundColor:'rgba(24, 140, 101, 0.2)',
        //borderWidth:1,
        borderRadius:5,
        padding:3,
    },
    menuButton:{
        flexDirection:'row',
        flex:0.2,
    },
    buttonSearch:{
        marginHorizontal:'auto',
        padding:4,
        borderRadius:'50%'
    },
    buttonFilter:{
        marginHorizontal:'auto',
        padding:4,
        borderRadius:'50%'
    },
    fadeBottom:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
    },
});
