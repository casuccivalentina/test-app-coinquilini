/* import { IconSymbol } from '@/components/ui/icon-symbol';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react'; */
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';




export default function SingleExpense() {
  const {
    description,
    totalAmount,
    gruppo,
    creator,
    splitBetween,
    data,
    done,
    tagName,
    colorTag,
  } = useLocalSearchParams();

  const total = Number(totalAmount);
  const splitArray = splitBetween ? JSON.parse(splitBetween as string) : [];
  const isDone = done === 'true';
  const tagColor : string = String(colorTag)||'rgba(0,0,0,1)';
  function makeTransparent(color: string, alpha: number) {
    // gestisce rgba(r,g,b,a) e rgb(r,g,b)
    const rgba = color.match(/\d+/g); // prende tutti i numeri nella stringa
    if (!rgba || rgba.length < 3) return color; // fallback se non è rgb(a)
    const [r, g, b] = rgba;
    return `rgba(${r},${g},${b},${alpha})`;
    }

    const [menuSpesa, setMenuSpesa] = useState(false);

    const slideAnim = useRef(
        new Animated.Value(Dimensions.get('window').width)
    ).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
        toValue: menuSpesa ? 0 : Dimensions.get('window').width,
        duration: 200,
        useNativeDriver: true,
        }).start();
    }, [menuSpesa]);

    const group = [
        {name: gruppo, createdBy: 'marcodallavalle', members: [ 'marcodallavalle', 'valentinacasucci' ], createdAt: new Date(), totalAmountGroup: 190,  },
    ]
    console.log(group[0].totalAmountGroup);
  
    return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

            
      
            <View style={{flex:1,}}>
                

                {/* HEADER */}
                <View style={styles.title}>
                    <Text style={styles.titleText}>{description}</Text>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.push('..')}
                    >
                        <IconSymbol name="chevron.left" color="black" />
                    </TouchableOpacity>

                    {creator === 'me' && (
                        <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => setMenuSpesa(!menuSpesa)}
                        >
                        <IconSymbol name="ellipsis" color="black" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* COMPLETED */}
                {isDone && (
                <View style={styles.completed}>
                    <Text style={styles.completedText}>Expense completed</Text>
                </View>
                )}

                <View style={styles.page}>
                    {/* CONTENT */}
                    <ScrollView contentContainerStyle={{paddingBottom:60}}>
                        {/* RIEPILOGO */}
                        <View style={styles.riepilogoSpese}>
                            <View style={{flex:0.5,}}>
                                <Text style={styles.riepilogoSpeseTitolo}>Total expense</Text>
                                <Text
                                    style={[
                                    styles.riepilogoSpeseCampo,
                                    { color: isDone ? 'rgba(24,140,101,1)' : 'rgba(237,29,29,1)' },
                                    ]}
                                >
                                    {total.toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                    })}
                                </Text>
                            </View>

                            <View style={{flex:0.5,}}>
                                <Text style={styles.riepilogoSpeseTitolo}>My expense</Text>
                                <Text
                                    style={[
                                    styles.riepilogoSpeseCampo,
                                    { color: isDone ? 'rgba(24,140,101,1)' : 'rgba(237,29,29,1)' },
                                    ]}
                                >
                                    {(total / splitArray.length).toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'EUR',
                                    })}
                                </Text>
                            </View>
                        </View>

                        {/* GROUP */}
                        <View style={styles.group}>
                            <Text style={styles.groupTitle}>Group</Text>
                            <TouchableOpacity style={styles.groupButton} onPress={() => router.push({
                                pathname: '/pages/singleGroup',
                                params:{
                                    name: group[0].name,
                                    members:  JSON.stringify(group[0].members),
                                    createdAt: group[0].createdAt.toLocaleDateString('it-IT'),
                                    createdBy: group[0].createdBy,
                                    total: group[0].totalAmountGroup,
                                }
                            })}>
                                <Text style={styles.groupCampo}>{gruppo}</Text>
                                <IconSymbol name="chevron.right" size={20} color={'#000'} />
                            </TouchableOpacity>
                        </View>

                        {/* USERS */}
                        <View style={styles.utenti}>
                            <View style={styles.creation}>
                            <Text style={styles.creationTitle}>Created</Text>
                            <View style={styles.creationCampo}>
                                <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.creationBy}>by</Text>
                                <Text style={styles.creationCampoCreator}>{creator}</Text>
                                </View>
                                <Text style={styles.creationCampoDate}>{data}</Text>
                            </View>
                            </View>

                            <View>
                            <Text style={styles.creationTitle}>Expense members</Text>
                            <View style={styles.members}>
                                {splitArray.map((p: string, i: number) => (
                                <Text key={i} style={styles.singleMember}>
                                    {p}
                                </Text>
                                ))}
                            </View>
                            </View>
                        </View>
                    </ScrollView>
                    <LinearGradient
                        pointerEvents="none"
                        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                        style={styles.fadeBottom}
                    />
                </View>

                {/* OVERLAY + MENU SOLO QUANDO APERTO */}
                {menuSpesa && (
                    <>
                    {/* OVERLAY (chiude il menu) */}
                    <TouchableWithoutFeedback onPress={() => setMenuSpesa(false)}>
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
                    styles.menuSpesa,
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
        {/* </TouchableWithoutFeedback> */}
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
    menuSpesa:{
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
    titleText:{
        fontSize:26,
        fontWeight:500,
        paddingBottom:10,
        color:'rgba(24, 140, 101, 1)',
    },
    completed:{
        backgroundColor:'rgba(24, 140, 101, 0.3)',
        paddingVertical:10,
    },
    completedText:{
        fontSize:20,
        color:'rgba(18, 104, 75, 1)',
        fontWeight:700,
        textAlign:'center',
    },
    page:{
        flex:1,
        backgroundColor:'rgba(255, 255, 255, 1)',
        paddingBottom:60,
    },
    riepilogoSpese:{
        flexDirection:'row',
        /* justifyContent:'space-between', */
        marginVertical:60,
        marginHorizontal:20,
    },
    riepilogoSpeseTitolo:{
        fontSize:20,
        width:150,
        textAlign:'center',
        marginHorizontal:'auto',
    },
    riepilogoSpeseCampo:{
        fontSize:24,
        textAlign:'center',
        marginTop:10,
        fontWeight:500,
    },
    group:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:30,
        marginBottom:60,
    },
    groupTitle:{
        fontSize:20,
        marginVertical:'auto',
    },
    groupButton:{
        borderColor:'rgba(24, 140, 101, 1)',
        borderWidth:2,
        borderRadius:10,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    groupCampo:{
        fontSize:16,
        marginVertical:'auto',
    },
    TagName:{
        fontSize:20,
        borderWidth:2,
        borderRadius:10,
        padding:10,
        width:200,
        textAlign:'center',
    },
    utenti:{
        marginHorizontal:30,
    },
    creation:{
        marginBottom:60,
    },
    creationTitle:{
        fontSize:20,
        marginVertical:'auto',
    },
    creationCampo:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
    },
    creationBy:{
        fontSize:18,
        marginRight:10,
        marginVertical:'auto',
    },
    creationCampoCreator:{
        fontSize:22,
        marginVertical:'auto',
        color:'rgba(24, 140, 101, 1)',
        fontWeight:500,
    },
    creationCampoDate:{
        marginVertical:'auto',
        fontSize:18,
        fontWeight:500,
        textDecorationLine:'underline',
    },
    members:{
        marginHorizontal:30,
        marginTop:30,
        paddingHorizontal:30,
        gap:15,
    },
    singleMember:{
        textAlign:'center',
        fontSize:20,
        borderWidth:2,
        borderColor:'rgba(24, 140, 101, 1)',
        borderRadius:10,
        paddingVertical:10,
    },
    fadeBottom: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        height: 100, // regola come vuoi
    },
});
