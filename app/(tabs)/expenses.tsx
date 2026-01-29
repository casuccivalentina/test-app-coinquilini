<<<<<<< HEAD
// expenses.tsx
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ExpensesProps {
  active: boolean; // <--- qui dichiariamo la prop
}

interface User {
  _id: string;
  username: string;
  name?: string;
}

interface Expense {
  _id: string;
  description: string;
  amount: number;
  paidBy: User;
}

export default function ExpensesPage({ active }: ExpensesProps) { // <--- accettiamo la prop
  const [userId, setUserId] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const stored = await AsyncStorage.getItem('userData');

    if (!stored) {
      setUserId(null);
      setExpenses([]);
      setLoading(false);
      return;
    }

    const user = JSON.parse(stored);
    setUserId(user._id);

    try {
      const res = await fetch(`https://time2pay-backend.onrender.com/api/expenses/user/${user._id}`, {
        headers: { 'x-user-id': user._id },
      });
      const data = await res.json();
      setExpenses(data.success ? data.expenses || [] : []);
    } catch {
      setExpenses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 🔹 Effetto che si attiva solo quando la tab è visibile
  useEffect(() => {
    if (active) {
      loadData();
    }
  }, [active]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  if (loading) return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#188C65" />
      <Text>Caricamento spese...</Text>
    </View>
  );

  if (!userId) return (
    <View style={styles.centered}>
      <Text>Devi loggare per vedere le spese</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#188C65']} />
      }
    >
      {expenses.map(e => (
        <View key={e._id} style={styles.expenseCard}>
          <Text style={{ fontWeight: 'bold' }}>{e.description}</Text>
          <Text>{e.amount.toFixed(2)} €</Text>
          <Text>Pagata da: {e.paidBy.name || e.paidBy.username}</Text>
        </View>
      ))}
    </ScrollView>
=======
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
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: { flex: 1, padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  expenseCard: { padding: 12, marginBottom: 8, backgroundColor: '#fff', borderRadius: 12 },
=======
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
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0
});
