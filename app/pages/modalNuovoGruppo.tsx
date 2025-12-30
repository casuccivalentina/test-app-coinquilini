// ProfileImageModal.js
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { Animated, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

type Props = {
  visible: boolean;
  fadeAnim: any;
  slideAnim: any;
  onClose: any;
};

const membri = [
    {nome: 'Valentina', cognome: 'Casucci', username: 'valentinacasucci'},
    {nome: 'Davide', cognome: 'Iasella', username: 'davideiasella'},
    {nome: 'Marco', cognome: 'Dalla Valle', username: 'marcodallavalle'},
    {nome: 'Catalin', cognome: 'Groppo', username: 'catalingroppo'},
]

export default function ModalNuovoGruppo({ visible, fadeAnim, slideAnim, onClose }: Props) {

    const crea =()=>{
      //controllo campo nome aggiunto
      console.log('crea');
      onClose();
    }

    return (
      <>
      <Modal transparent visible={visible} animationType="none">
  
        {/* CLIC OUTSIDE PER CHIUDERE */}
        <View style={{ flex: 1 }}>
          
          <TouchableWithoutFeedback onPress={onClose}>
            <Animated.View style={{ ...styles.sfondoChiusura, opacity: fadeAnim }} />
          </TouchableWithoutFeedback>

          {/* CONTENUTO MODALE */}
          <Animated.View style={{ 
            ...styles.visibile, 
            transform: [{ translateY: slideAnim }] 
          }}>
            {/* HEADER */}
                <View style={styles.title}>
                  <Text style={styles.titleText}>Nuovo gruppo</Text>
                  <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <IconSymbol name={'chevron.down'} color={'#000'}></IconSymbol>
                  </TouchableOpacity>
                </View>

                {/* INPUT: Nome gruppo */}
                <View style={styles.campo}>
                  <Text style={styles.titleCampo}>Nome gruppo</Text>
                  <TextInput style={styles.testoCampo} />
                </View>

                {/* INPUT: Aggiungi membri */}
                <View style={styles.campo}>
                  <Text style={styles.titleCampo}>Aggiungi membri</Text>
                  <TextInput style={styles.testoCampo} />
                </View>

                {/* LISTA MEMBRI AGGIUNTI*/}
                <View style={styles.elencoMembri}>
                  <ScrollView style={{ flex: 1 }}>
                    {membri.map((m, i) => (
                      <View key={i} style={styles.membro}>
                        <Text style={styles.membroTesto}>{m.username}</Text>
                        <TouchableOpacity style={styles.membroDelete}><IconSymbol name={'x.circle'} color={'#000'} size={30}></IconSymbol></TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                  <LinearGradient
                    pointerEvents="none"
                    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                    style={styles.fadeBottom}
                  />
                </View>

                {/* BOTTONE CREA */}
                <TouchableOpacity onPress={crea} style={styles.buttonCrea}>
                  <Text style={{ fontSize: 18, color:'rgba(255, 255, 255, 1)' }}>Crea</Text>
                </TouchableOpacity>
          </Animated.View>

        </View>
      </Modal>
</>

    );
}

const styles = StyleSheet.create({
  sfondoChiusura:{
    position:'absolute',
    height:'100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  visibile:{
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top:50,
    marginHorizontal:10,
    backgroundColor:'rgba(255, 255, 255, 1)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  title:{
      paddingTop:30,
      flexDirection:'row',
      justifyContent:'center',
      borderBottomWidth:0.5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
  },
  titleText:{
    color:'rgba(24, 140, 101, 1)',
    fontSize:26,
    fontWeight:500,
    paddingBottom:10,
  },
  closeButton:{
    position:'absolute',
    right:15,
    top:'75%',
    padding:5,
  },
  campo:{
    marginHorizontal:20,
    marginTop:30,
  },
  titleCampo:{
    fontSize:20,
    marginVertical:10,
  },
  testoCampo:{
    backgroundColor:'rgba(237, 237, 237, 1)',
    marginHorizontal:20,
    marginBottom:20,
    paddingVertical:5,
    paddingHorizontal:10,
    fontSize:24,
    borderRadius:5,
  },
  elencoMembri: {
    height: '30%',
    marginBottom: 50,
    marginTop: 20,
    marginHorizontal: 20,
  },
  membro:{
    marginHorizontal:10,
    marginVertical:10,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:10,
    paddingHorizontal:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:'rgba(24, 140, 101, 1)',
  },
  membroTesto:{
    fontSize:18,
    marginVertical:'auto',
  },
  membroDelete:{
    padding:0,
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50, // regola come vuoi
  },
  buttonCrea:{
    backgroundColor:'rgba(24, 140, 101, 1)',
    marginHorizontal:'auto',
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:5,
  },
})
