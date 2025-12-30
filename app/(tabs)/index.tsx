import Spesa from '@/components/spesa';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const data = [
  {description: 'Hotel 2 notti', gruppo:'Weekend a Roma', totalAmount: 18, creator: 'Casucci Valentina', splitBetween: ['me','IasellaDavide'], done: false},
  {description: 'Hotel 4 notti', gruppo:'Weekend a Milano', totalAmount: 80.5, creator: 'marcodallavalle', splitBetween: ['me','Iasella Davide'], done: true},
  {description: 'Hotel 1 notte', gruppo:'Weekend a Valencia', totalAmount: 1, creator: 'me', splitBetween: ['me', 'Casucci Valentina'], done: true},
]

export default function HomeScreen() {
  return (
    <>
    <View style={styles.title}>
        <Image source={require('@/assets/images/logo-app.png')} style={styles.titleImage}></Image>
    </View>
    <ScrollView style={styles.page} contentContainerStyle={{justifyContent:'space-between',flex:1}}>
      <View style={styles.expenses}>
        <Text style={styles.titlePage}>Last Expenses</Text>
        <View>
          {data.map((d, i) => (
            <Spesa
              key={i}
              done={d.done}
              description={d.description}
              totalAmount={d.totalAmount}
              splitBetween={d.splitBetween}
              creator={d.creator}
              gruppo={d.gruppo} 
              data={(new Date().toLocaleDateString('it-IT'))}
            />
          ))}
        </View>
      </View>
      <View style={styles.groups}>
        <Text style={styles.titlePage}>Groups</Text>
        <View style={{flexDirection:'column', gap:30}}>
          <TouchableOpacity style={styles.dettagli} onPress={() => router.push('/pages/gruppi')}>
            <Text style={styles.LinkText}>View all groups</Text>
            <IconSymbol size={20} name="chevron.right" color={'black'} style={{marginVertical:'auto'}} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title:{
      paddingTop:50,
      /* paddingBottom:10, */
      height:120,
      flexDirection:'row',
      justifyContent:'center',
      borderBottomWidth:0.5,
  },
  titleImage:{
    width:150,
    aspectRatio:2.5,
  },
  page:{
    //flex:1,
    //justifyContent:'space-between',
    backgroundColor:'white',
  },
  expenses:{
    //flex:0.75,
  },
  titlePage:{
    marginVertical:20,
    marginHorizontal:20,
    fontSize:20,
    color:'rgba(24, 140, 101, 1)',
    fontWeight:500,
  },
  exp:{
    flex:1,
    borderWidth:2,
    borderColor:'rgba(24, 140, 101, 1)',
    borderRadius:10,
    marginVertical:10,
    marginHorizontal:20,
    padding:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  expTesto:{
    fontSize:18,
    marginVertical:'auto',
  },
  expCreator:{
    color:'rgba(93, 93, 93, 1)',
  },
  expTot:{
    fontSize:18,
    fontWeight:600,
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100, // regola come vuoi
  },
  groups:{
    marginVertical:'auto',
  },
  dettagli:{
    borderWidth:2,
    borderColor:'rgba(24, 140, 101, 1)',
    flexDirection:'row',
    justifyContent:'space-around',
    paddingVertical:15,
    marginHorizontal:50,
    borderRadius:10,
  },
  LinkText:{
      marginVertical:'auto',
      fontSize:22,
  },
});
