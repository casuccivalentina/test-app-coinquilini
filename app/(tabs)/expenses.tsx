import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';
import Balance from '../pages/expensesBalance';
import Summary from '../pages/expensesSummary';

export default function Expenses() {

  const [page,setPage] = useState('summary');

  return (
    <>
      <View style={styles.title}>
          <Text style={styles.titleText}>Expenses</Text>
      </View>
      <View style={styles.page}>
        <View style={styles.buttons}>
          {/* <TouchableOpacity style={{...styles.singleButton,borderWidth:2,backgroundColor:page==='history'?'rgba(24, 140, 101, 0.3)':''}} onPress={() => setPage('history')}>
            <Text style={styles.LinkText}>History</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={{...styles.singleButton,borderWidth:2,backgroundColor:page==='summary'?'rgba(24, 140, 101, 0.3)':''}} onPress={() => setPage('summary')}>
            <Text style={styles.LinkText}>Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.singleButton,borderWidth:2,backgroundColor:page==='balance'?'rgba(24, 140, 101, 0.3)':''}} onPress={() => setPage('balance')}>
            <Text style={styles.LinkText}>Balance</Text>
          </TouchableOpacity>
        </View>
        {/* {page==='history'&&<History/>} */}
        {page==='summary'&&<Summary/>}
        {page==='balance'&&<Balance/>}
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
    },
    titleText:{
      fontSize:26,
      fontWeight:500,
      color:'rgba(24, 140, 101, 1)',
    },
    page:{
      backgroundColor:'rgba(255, 255, 255, 1)',
      flex: 1,
    },
    buttons:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginHorizontal:20,
    },
    singleButton:{
      borderColor:'rgba(24, 140, 101, 1)',
      paddingVertical:10,
      width:'40%',
      marginVertical:20,
      borderRadius:5,
    },
    LinkText:{
      fontSize:18,
      textAlign:'center',
    },
});
