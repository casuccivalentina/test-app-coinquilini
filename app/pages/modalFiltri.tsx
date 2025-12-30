// ProfileImageModal.js
import { IconSymbol } from '@/components/ui/icon-symbol';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  visible: boolean;
  fadeAnim: any;
  slideAnim: any;
  onClose: any;
  setFilter: any;
  filterDate: any;
  filterImport: any;
  filterOrder: any;
  filterTag: any;
};


export default function ModalFiltri({ visible, fadeAnim, slideAnim, onClose, setFilter, filterDate, filterImport, filterOrder, filterTag }: Props) {

  
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [ordineSelezionato, setOrdineSelezionato] = useState('Seleziona');
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [tagSelezionato, setTagSelezionato] = useState(['Tutti','rgba(0,0,0,1)']);
  const [visibleTags, setVisibleTags] = React.useState(false);
  const [importoRange, setImportoRange] = useState<null | [number, number]>(null);
  const [showImport, setShowImport] = useState(false);

  const options = ['Seleziona', 'Data (dal più recente)', 'Data (dal meno recente)', 'Importo (dal più alto)', 'Importo (dal più basso)', 'Gruppo (A-Z)', 'Gruppo (Z-A)'];
  const tags = [
    {name: 'Tutti', color: 'rgba(0,0,0,1)'},
    {name: 'Impegni', color: 'rgba(150, 8, 126, 1)'},
    {name: 'Viaggi', color: 'rgba(255, 0, 0, 1)'},
    {name: 'Scuola', color: 'rgba(17, 215, 30, 1)'},
  ];

    const crea =()=>{
      console.log('crea');
      filterDate(date||null);
      filterImport(importoRange||null);
      filterOrder(ordineSelezionato!='Seleziona'?ordineSelezionato:null);
      filterTag((tagSelezionato[0]!='Tutti'&&tagSelezionato[1]!='rgba(0,0,0,1)')?tagSelezionato:null),
      setFilter((date||importoRange||ordineSelezionato!='Seleziona'||(tagSelezionato[0]!='Tutti'&&tagSelezionato[1]!='rgba(0,0,0,1)')));
      onClose();
    }
    const clear =()=>{
      //pulisce i filtri
      console.log('clear');
      setFilter(false);
      setDate(null);
      setTagSelezionato(['Tutti','rgba(0,0,0,1)']),
      setOrdineSelezionato('Seleziona');
      setShowImport(false);
      setImportoRange(null);
     /*  onClose(); */
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
                  <Text style={styles.titleText}>Filtri</Text>
                  <TouchableOpacity style={styles.closeButton} onPress={()=>{
                    onClose();
                  }}>
                    <IconSymbol name={'chevron.down'} color={'#000'}></IconSymbol>
                  </TouchableOpacity>
                </View>

                <View style={styles.date}>
                  <TouchableOpacity  style={styles.dateButton} onPress={() => setShowPicker(true)}>
                    <View style={{flexDirection:'row',padding:15,}}>
                      <Text style={styles.textDateButton}>Data</Text>
                      <IconSymbol name={'calendar'} color={'rgb(0,0,0)'} style={{marginVertical:'auto'}}></IconSymbol>
                    </View>
                    {date && (
                      <View style={styles.selectedDate}>
                        <Text style={styles.selectedDateText}>
                          {date.toLocaleDateString('it-IT')}
                        </Text>

                        <TouchableOpacity onPress={() => setDate(null)}>
                          <IconSymbol name={'x.circle'} color={'rgb(0,0,0)'} style={{marginLeft:10}}/>
                        </TouchableOpacity>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                {showPicker && (<>
                  <DateTimePickerModal
                    isVisible={showPicker}
                    mode="date"
                    onConfirm={(d) => {
                      setDate(d);
                      setShowPicker(false);
                    }}
                    onCancel={() => setShowPicker(false)}
                  />
                </>)}

                <View style={styles.tag}>
                    <Text style={styles.textTag}>Tag</Text>
                    <TouchableOpacity style={styles.buttonTag} onPress={()=>setVisibleTags(!visibleTags)}>
                      <Text style={{color:tagSelezionato[1]}}>{tagSelezionato[0]}</Text>
                    </TouchableOpacity>
                    {visibleTags&&<View style={styles.menuTag}>
                      {tags.map((t,i)=>(
                        <TouchableOpacity key={i} style={styles.menuOrdinateOption} onPress={()=>{setTagSelezionato([t.name,t.color]);setVisibleTags(!visibleTags)}}>
                          <Text style={{textAlign:'center',color:t.color}}>{t.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>}
                </View>

                <View style={{...styles.import, marginBottom:showImport?20:50,}}>
                  <TouchableOpacity style={styles.detailImport} onPress={()=>{setImportoRange(showImport?null:[0, 500]);setShowImport(!showImport);}}>
                    <Text style={styles.textImport}>Importo</Text>
                    {showImport&&importoRange&&<Text style={styles.selectedImport}>{importoRange[0]}€ - {importoRange[1]}€</Text>}
                  </TouchableOpacity>
                  {showImport&&<MultiSlider
                    trackStyle={{}}
                    values={importoRange||undefined}
                    min={0}
                    max={500}
                    step={10}
                    sliderLength={250}
                    onValuesChange={values => setImportoRange([values[0], values[1]])}
                    selectedStyle={{ backgroundColor: 'rgba(24,140,101,1)', }}
                    unselectedStyle={{ backgroundColor: '#ccc' }}
                    markerStyle={styles.markerStyle}
                    containerStyle={{height:30,marginHorizontal:'auto'}}
                  />}
                </View>

                <View style={styles.ordinate}>
                    <Text style={styles.textOrdinate}>Ordina per</Text>
                    <TouchableOpacity style={styles.buttonOrdinate} onPress={()=>setVisibleMenu(!visibleMenu)}>
                      <Text>{ordineSelezionato}</Text>
                    </TouchableOpacity>
                    {visibleMenu&&<View style={styles.menuOrdinate}>
                      {options.map((o,i)=>(
                        <TouchableOpacity key={i} style={styles.menuOrdinateOption} onPress={()=>{setOrdineSelezionato(o);setVisibleMenu(!visibleMenu)}}>
                          <Text style={{textAlign:'center',}}>{o}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>}
                </View>

                <View style={styles.buttons}>
                  {/* BOTTONE PULISCI */}
                  <TouchableOpacity onPress={clear} style={styles.buttonClear}>
                    <Text style={{ fontSize: 20, textAlign:'center', }}>Clear all</Text>
                  </TouchableOpacity>
                  {/* BOTTONE CREA */}
                  <TouchableOpacity onPress={crea} style={styles.buttonCrea}>
                    <Text style={{ fontSize: 20, textAlign:'center', }}>Search</Text>
                  </TouchableOpacity>
                </View>
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
  date:{
    marginHorizontal:20,
    marginTop:50,
    marginBottom:50,
    padding:5,
    borderWidth:0.5,
    //borderColor:'rgba(24, 140, 101, 1)',
    borderColor:'rgb(0,0,0)',
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  dateButton:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
  },
  textDateButton:{
    fontSize:18,
    marginVertical:'auto',
  },
  selectedDate:{
    borderWidth:2,
    borderColor:'rgba(24, 140, 101, 1)',
    backgroundColor:'rgba(24, 140, 101, 0.3)',
    marginVertical:'auto',
    marginRight:5,
    flexDirection:'row',
    justifyContent:'center',
    borderRadius:10,
    padding:10,
  },
  selectedDateText:{
    fontSize:20,
  },
  tag:{
    marginHorizontal:20,
    marginBottom:50,
    borderWidth:0.5,
    borderColor:'rgb(0,0,0)',
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  textTag:{
    padding:20,
    fontSize:18,
    marginVertical:'auto',
  },
  buttonTag:{
    width:180,
    borderWidth:2,
    borderColor:'rgba(24, 140, 101, 1)',
    marginVertical:'auto',
    marginRight:10,
    flexDirection:'row',
    justifyContent:'center',
    borderRadius:10,
    padding:10,
  },
  menuTag:{
    zIndex:1,
    position:'absolute',
    width:180,
    top:50,
    right:10,
    borderWidth:1,
    backgroundColor:'rgba(255, 255, 255, 1)',
    borderRadius:10,
  },
  menuTagOption:{
    padding:10,
  },
  import:{
    marginHorizontal:20,
    padding:5,
    borderWidth:0.5,
    borderColor:'rgb(0,0,0)',
    borderRadius:10,
  },
  detailImport:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:15,
  },
  textImport:{
    fontSize:18,
    marginVertical:'auto',
  },
  selectedImport:{
    marginVertical:'auto',
    fontSize:18,
    fontWeight:600,
    //color:'rgba(24, 140, 101, 1)',
  },
  markerStyle:{
    backgroundColor: 'rgba(24,140,101,1)',
    height:20,
    aspectRatio:1,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  ordinate:{
    marginHorizontal:20,
    borderWidth:0.5,
    borderColor:'rgb(0,0,0)',
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  textOrdinate:{
    padding:20,
    fontSize:18,
    marginVertical:'auto',
  },
  buttonOrdinate:{
    width:180,
    borderWidth:2,
    borderColor:'rgba(24, 140, 101, 1)',
    marginVertical:'auto',
    marginRight:10,
    flexDirection:'row',
    justifyContent:'center',
    borderRadius:10,
    padding:10,
  },
  menuOrdinate:{
    zIndex:1,
    position:'absolute',
    width:180,
    top:50,
    right:10,
    borderWidth:1,
    backgroundColor:'rgba(255, 255, 255, 1)',
    borderRadius:10,
  },
  menuOrdinateOption:{
    padding:10,
  },
  buttons:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical:'auto'
  },
  buttonClear:{
    width:120,
    borderWidth:2,
    borderColor:'rgba(24, 140, 101, 1)',
    backgroundColor:'rgba(24, 140, 101, 0.3)',
    marginHorizontal:'auto',
    paddingVertical:15,
    paddingHorizontal:20,
    borderRadius:5,
  },
  buttonCrea:{
    width:120,
    borderWidth:2,
    borderColor:'rgba(24, 140, 101, 1)',
    backgroundColor:'rgba(24, 140, 101, 0.3)',
    marginHorizontal:'auto',
    paddingVertical:15,
    paddingHorizontal:20,
    borderRadius:5,
  },
})
