import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
<<<<<<< HEAD
import { useRef, useState } from 'react';
=======
import React, { useRef, useState } from 'react';
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PagerView from 'react-native-pager-view';

import ExpensesPage from './expenses';
import IndexPage from './index';
import ProfilePage from './profile';

<<<<<<< HEAD
export default function TabLayout() {
  const pagerRef = useRef<PagerView>(null);
  const [activeIndex, setActiveIndex] = useState(1); // 1 = Home iniziale
  const colorScheme = useColorScheme();

  const pages = [
    { component: <ExpensesPage active={activeIndex === 0} />, title: 'Expenses', icon: ['dollarsign.circle','dollarsign.circle.fill'] },

    { component: <IndexPage active={activeIndex === 1} />, title:'Home', icon: ['house','house.fill'] },

=======

export default function TabLayout() {
  const pagerRef = useRef<PagerView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const colorScheme = useColorScheme();

  const pages = [
    { component: <ExpensesPage/>, title: 'Expenses', icon: ['dollarsign.circle','dollarsign.circle.fill'] },
    { component: <IndexPage />, title:'Home', icon: ['house','house.fill'] },
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0
    { component: <ProfilePage />, title:'Profile' , icon: ['person','person.fill'] },
  ];

  return (
    <View style={{ flex: 1 }}>
<<<<<<< HEAD
      <PagerView
        style={{ flex: 1 }}
=======
      {/* Pager per lo swipe */}
      <PagerView
        style={{ flex: 1}}
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0
        initialPage={1}
        ref={pagerRef}
        onPageSelected={e => setActiveIndex(e.nativeEvent.position)}
      >
        {pages.map((p, i) => (
          <View key={i} style={{ flex: 1 }}>
            {p.component}
          </View>
        ))}
      </PagerView>

<<<<<<< HEAD
=======
      {/* Bottom tab bar custom */}
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0
      <View style={styles.tabBar}>
        {pages.map((p, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setActiveIndex(i);
              pagerRef.current?.setPage(i);
            }}
<<<<<<< HEAD
            style={{ padding:10, justifyContent:'center', aspectRatio:1, marginHorizontal:0 }}
=======
            style={{padding:10,justifyContent:'center',aspectRatio:1,marginHorizontal:'auto'}}
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0
          >
            <IconSymbol
              style={styles.icon}
              name={activeIndex === i ? p.icon[1] as any : p.icon[0] as any}
              size={30}
              color={activeIndex === i ? 'rgba(24, 140, 102, 1)' : 'gray'}
            />
<<<<<<< HEAD
=======
            {/* <Text style={{color:activeIndex === i ? 'rgba(24, 140, 102, 1)' : 'gray', fontSize:12,margin:'auto'}}>{p.title}</Text> */}
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
<<<<<<< HEAD
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#000000ff',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  icon: {
    alignSelf: 'center',
=======
    paddingBottom:20,
    paddingHorizontal:20,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#000000ff',
    backgroundColor:'rgba(255, 255, 255, 1)',
  },
  icon:{
    margin:'auto',
>>>>>>> 137181cea2a387b4605ac75e121fd8a257baf8e0
  },
});
