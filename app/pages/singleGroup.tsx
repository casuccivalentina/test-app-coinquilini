/* import { IconSymbol } from '@/components/ui/icon-symbol';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react'; */
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Balance from './groupBalance';
import Details from './groupDetails';
import History from './groupHistory';


export default function SingleGroup() {
  const {
    name,
    foto,
    createdAt,
    createdBy,
    members,
    totalExp,
  } = useLocalSearchParams();
  const membersArray = JSON.parse(members as string) || [];
  const totalAmountGroup = Number(totalExp);

  const [page,setPage] = useState('history');
  const [menuGruppo, setMenuGruppo] = useState(false);
    const slideAnim = useRef(
        new Animated.Value(Dimensions.get('window').width)
    ).current;
        useEffect(() => {
        Animated.timing(slideAnim, {
        toValue: menuGruppo ? 0 : Dimensions.get('window').width,
        duration: 200,
        useNativeDriver: true,
        }).start();
    }, [menuGruppo])

  return (
    <>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={{flex:1,}}>
            {/* HEADER */}
            <View style={styles.title}>
                <Text style={styles.titleText}>{name}</Text>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push('..')}
                >
                    <IconSymbol name="chevron.left" color="black" />
                </TouchableOpacity>

                {createdBy === 'marcodallavalle' && (
                    <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => setMenuGruppo(!menuGruppo)}
                    >
                    <IconSymbol name="ellipsis" color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.page}>
                <View style={styles.buttons}>
                  <TouchableOpacity style={{...styles.singleButton,borderWidth:2,backgroundColor:page==='history'?'rgba(24, 140, 101, 0.3)':''}} onPress={() => setPage('history')}>
                    <Text style={styles.LinkText}>History</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{...styles.singleButton,borderWidth:2,backgroundColor:page==='details'?'rgba(24, 140, 101, 0.3)':''}} onPress={() => setPage('details')}>
                    <Text style={styles.LinkText}>Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{...styles.singleButton,borderWidth:2,backgroundColor:page==='balance'?'rgba(24, 140, 101, 0.3)':''}} onPress={() => setPage('balance')}>
                    <Text style={styles.LinkText}>Balances</Text>
                  </TouchableOpacity>
                </View>
                {page==='history'&&<History/>}
                {page==='details'&&<Details
                    nome={name?.toString() ?? ''}
                    foto={foto?.toString() ?? ''}
                    createdAt={createdAt?.toString() ?? ''}
                    createdBy={createdBy?.toString() ?? 'marcodallavalle'}
                    members={membersArray? membersArray : []}
                    totalExp={totalAmountGroup? totalAmountGroup : 0}
                />}
                {page==='balance'&&<Balance/>}

                 
            </View>
            {/* OVERLAY + MENU SOLO QUANDO APERTO */}
            {menuGruppo && (
                <>
                {/* OVERLAY (chiude il menu) */}
                <TouchableWithoutFeedback onPress={() => setMenuGruppo(false)}>
                    <View
                    style={[
                        StyleSheet.absoluteFill,
                    ]}
                    />
                </TouchableWithoutFeedback>
                </>
            )}
        
            {/* MENU (NON chiude) */}
            <Animated.View
                style={[
                styles.menuGruppo,
                { transform: [{ translateX: slideAnim }] },
                ]}
                pointerEvents="auto"
            >
                <TouchableOpacity style={styles.menuOption}>
                    <Text style={{fontSize:18,textAlign:'center',}}>Modify</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuOption}>
                    <Text style={{ color: 'red',fontSize:18,textAlign:'center', }}>Delete</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
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
    optionButton:{
        zIndex:2,
        marginTop:70,
        position:'absolute',
        top:-5,
        right:10,
        padding:10,
    },
    titleText:{
        fontSize:26,
        fontWeight:500,
        paddingBottom:10,
        color:'rgba(24, 140, 101, 1)',
    },
    page:{
        flex:1,
        backgroundColor:'rgba(255, 255, 255, 1)',
    },
    
    buttons:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginHorizontal:20,
    },
    singleButton:{
      borderColor:'rgba(24, 140, 101, 1)',
      paddingVertical:5,
      width:'30%',
      marginVertical:20,
      borderRadius:5,
    },
    LinkText:{
      fontSize:18,
      textAlign:'center',
    },

    riepilogoSpese:{
        flexDirection:'row',
        /* justifyContent:'space-between', */
        marginTop:20,
        marginHorizontal:20,
    },
    riepilogoSpeseTitolo:{
        fontSize:18,
        width:150,
        textAlign:'center',
        marginHorizontal:'auto',
    },
    riepilogoSpeseCampo:{
        fontSize:20,
        textAlign:'center',
        marginTop:10,
        fontWeight:600,
    },
    groupTitle:{
        fontSize:20,
        marginVertical:'auto',
    },
    membersGroup:{
        marginVertical:20,
        borderWidth:1,
        height:200,
    },
    creationTitle:{
        fontSize:18,
        marginVertical:'auto',
    },
    members:{
        marginHorizontal:30,
        marginTop:20,
        paddingHorizontal:30,
        gap:5,
    },
    singleMember:{
        textAlign:'center',
        fontSize:18,
        borderWidth:2,
        borderColor:'rgba(24, 140, 101, 1)',
        borderRadius:10,
        paddingVertical:5,
    },
    menuGruppo:{
        zIndex:10,
        backgroundColor:'rgba(255, 255, 255, 1)',
        borderWidth:1,
        borderRadius:10,
        position:'absolute',
        top:130,
        right:20,
    },
    menuOption:{
        padding:15,
        width:150,
    },
    fadeBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100, // regola come vuoi
    },
});
