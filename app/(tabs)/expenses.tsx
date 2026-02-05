import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const API_URL = 'https://time2pay-backend.onrender.com';

/* =======================
   TYPES
======================= */

type User = {
  _id: string;
  name?: string;
  surname?: string;
  username?: string;
  profileImage?: string;
};

type Expense = {
  _id: string;
  description: string;
  amount: number;
  amountPerPerson: number;
  paidBy: User;
  splitBetween: User[];
  groupId: string;
  groupName?: string;
  createdAt: string;
  paidDebts?: Array<{ from: string; to: string }>;
};

/* =======================
   COMPONENT
======================= */

export default function AllExpensesScreen() {
  const router = useRouter();

  /* =======================
     STATE
  ======================= */

  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters,setShowFilters] = useState(false)

  const [searchText, setSearchText] = useState('');
  const [filterPaidByMe, setFilterPaidByMe] = useState(false);
  const [filterIOwe, setFilterIOwe] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const userCache = new Map<string, User>();
  const getParticipantId = (user?: User) => user?._id ?? '';

  /* =======================
     EFFECTS
  ======================= */

  useEffect(() => {
    if (userId) {
      loadAllExpenses();
    }
  }, [userId]);

  useEffect(() => {
    applyFilters();
  }, [searchText, filterPaidByMe, filterIOwe, allExpenses]);

  /* =======================
     DATA
  ======================= */

  useEffect(() => {
  const loadUserId = async () => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        setUserId(user._id);

        // Salva l'utente corrente nella cache
        const currentUser: User = {
          _id: user._id,
          username: user.username || '',
          name: user.name || 'Tu',
          surname: user.surname || '',
        };
        userCache.set(user._id, currentUser);
      }
    } catch (error) {
      console.error('Errore caricamento userId:', error);
    }
  };

  loadUserId();
}, []);

  const loadAllExpenses = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/expenses/user/${userId}`, {
        headers: { 'x-user-id': userId! },
      });

      const data = await res.json();

      if (data.success) {
        setAllExpenses(data.expenses);
        setFilteredExpenses(data.expenses);
      }
    } catch (err) {
      console.error('Errore caricamento spese:', err);
    } finally {
      setLoading(false);
    }
  };

    // Funzione per verificare se una spesa è completamente pagata
    const isExpenseFullyPaid = (expense: Expense): boolean => {
      if (!expense.paidDebts || !expense.splitBetween) return false;
      
      // Per ogni partecipante che non è il pagatore
      const debtors = expense.splitBetween.filter(member => 
        member._id !== expense.paidBy._id
      );
      
      // Conta quanti debiti verso il pagatore sono stati pagati
      const paidDebtsCount = expense.paidDebts.filter(debt => 
        debt.to === expense.paidBy._id
      ).length;
      
      // La spesa è completamente pagata se tutti i debitori hanno pagato
      return paidDebtsCount === debtors.length;
    };

  /* =======================
     HELPERS
  ======================= */

  const getUserName = (u?: User) =>
    (u?.name + ' ' + u?.surname) || u?.username || 'Utente';

  const getInitial = (u?: User) =>
    getUserName(u).charAt(0).toUpperCase();

  const renderAvatar = (u?: User, val?:number) => {
    console.log(u);
    console.log(u?.profileImage);
    if (u?.profileImage) {
      return (
        <Image
          source={{ uri: u.profileImage }}
          style={{ width: val||30, height: val||30, borderRadius: (val ?? 30) / 2, }}
        />
      );
    }

    return (
      <View
        style={{
          width: val||30, height: val||30,
          borderRadius: 16,
          backgroundColor: '#ddd',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{fontSize:(val?val/1.5:16)}}>{getInitial(u)}</Text>
      </View>
    );
  };

  // Funzione per verificare se un debito specifico è stato pagato
  const isDebtPaid = (expense: Expense, fromUserId: string, toUserId: string): boolean => {
    return expense.paidDebts?.some(debt => 
      debt.from === fromUserId && debt.to === toUserId
    ) || false;
  };

  const formatRelativeDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Oggi';
      if (diffDays === 1) return 'Ieri';
      if (diffDays < 7) return `${diffDays} giorni fa`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} settimane fa`;
      
      return date.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  /* =======================
     FILTERS
  ======================= */

  const applyFilters = () => {
    let result = [...allExpenses];

    // 🔍 Search
    if (searchText.trim()) {
      const q = searchText.toLowerCase();

      result = result.filter(exp =>
        exp.description.toLowerCase().includes(q) ||
        getUserName(exp.paidBy).toLowerCase().includes(q) ||
        exp.splitBetween.some(u =>
          getUserName(u).toLowerCase().includes(q)
        )
      );
    }

    // 👤 Pagate da me
    if (filterPaidByMe) {
      result = result.filter(
        exp => exp.paidBy?._id === userId
      );
    }

    // 💸 Io devo
    if (filterIOwe) {
      result = result.filter(exp =>
        exp.splitBetween.some(u => u._id === userId) &&
        exp.paidBy?._id !== userId
      );
    }

    setFilteredExpenses(result);
  };

  
  // Funzione per applicare i filtri
  const applyFilter = (filterType: string) => {
    setActiveFilter(filterType);
    setIsSearching(false);
    
    let filtered = allExpenses;
    
    switch (filterType) {
      case 'unpaid':
        filtered = allExpenses.filter(expense => {
          const debtors = expense.splitBetween?.filter(participant => {
            const participantId = getParticipantId(participant);
            return participantId !== expense.paidBy._id;
          }) || [];
          
          const paidDebtsCount = expense.paidDebts?.filter(debt => 
            debt.to === expense.paidBy._id
          ).length || 0;
          
          return paidDebtsCount < debtors.length;
        });
        break;
        
      case 'paid':
        filtered = allExpenses.filter(expense => isExpenseFullyPaid(expense));
        break;
        
      case 'mine':
        filtered = allExpenses.filter(expense => 
          expense.paidBy._id === userId
        );
        break;
        
      case 'owed':
        filtered = allExpenses.filter(expense => {
          if (expense.paidBy._id === userId) return false;
          
          const isParticipant = expense.splitBetween?.some(participant => {
            const participantId = getParticipantId(participant);
            return participantId === userId;
          });
          if (!isParticipant) return false;
          
          const hasPaid = expense.paidDebts?.some(debt => 
            debt.from === userId && debt.to === expense.paidBy._id
          );
          
          return !hasPaid;
        });
        break;

      case 'alreadyPaid':
        filtered = allExpenses.filter(expense => {
          if (expense.paidBy._id === userId) return false;
          
          const isParticipant = expense.splitBetween?.some(participant => {
            const participantId = getParticipantId(participant);
            return participantId === userId;
          });
          if (!isParticipant) return false;
          
          const hasPaid = expense.paidDebts?.some(debt => 
            debt.from === userId && debt.to === expense.paidBy._id
          );
          
          return hasPaid;
        });
        break;
        
      case 'all':
      default:
        break;
    }
    
    if (searchQuery.trim() !== '') {
      filtered = filterBySearch(filtered, searchQuery);
    }
    
    setFilteredExpenses(filtered);
  };

  // Funzione per filtrare per ricerca
  const filterBySearch = (expenses: Expense[], query: string): Expense[] => {
    if (!query.trim()) return expenses;

    const searchTerm = query.toLowerCase().trim();

    return expenses.filter(expense => {
      // Controlla descrizione
      if (expense.description?.toLowerCase().includes(searchTerm)) {
        return true;
      }

      // Controlla chi ha pagato
      const paidByName = `${expense.paidBy?.name || ''} ${expense.paidBy?.surname || ''}`.toLowerCase();
      const paidByUsername = expense.paidBy?.username?.toLowerCase() || '';
      if (paidByName.includes(searchTerm) || paidByUsername.includes(searchTerm)) {
        return true;
      }

      // Controlla importo
      if (expense.amount.toString().includes(searchTerm)) {
        return true;
      }

      // Controlla partecipanti
      if (expense.splitBetween?.some(participant => {
        const participantName = `${participant.name || ''} ${participant.surname || ''}`.toLowerCase();
        const participantUsername = participant.username?.toLowerCase() || '';
        return participantName.includes(searchTerm) || participantUsername.includes(searchTerm);
      })) {
        return true;
      }

      return false;
    });
  };


  const resetFilters = () => {
    setSearchText('');
    setFilterPaidByMe(false);
    setFilterIOwe(false);
  };

  

  // Pulisci la ricerca
  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    applyFilter(activeFilter);
  };

  /* =======================
     RENDER ITEM
  ======================= */

  const renderExpense = ({ item }: { item: Expense }) => {
    const isPaidByMe = item.paidBy?._id === userId;

    console.log('\nItem:\n'+JSON.stringify(item)+'\n\n\n');
    return (
      <>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/pages/singleExpense',
            params: {
              from:'Spese',
              expenseId: item._id,
              groupId: item.groupId,
              description: item.description,
            },
          })
        }
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderAvatar(item.paidBy)}

          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontWeight: '600' }}>
              {item.description}
            </Text>

            <Text style={{ color: '#666', fontSize: 12 }}>
              Pagato da {getUserName(item.paidBy)}
            </Text>

            {item.groupName && (
              <Text style={{ fontSize: 11, color: '#999' }}>
                {item.groupName}
              </Text>
            )}
          </View>

          <Text style={{ fontWeight: '600' }}>
            € {item.amount.toFixed(2)}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {item.splitBetween.map(u => (
            <View key={u._id} style={{ marginRight: 6 }}>
              <Text>{u.name} {u.surname}</Text>
              {renderAvatar(u)}
            </View>
          ))}
        </View>

        <Text style={{ fontSize: 12, marginTop: 6 }}>
          {isPaidByMe
            ? 'Hai pagato tu'
            : `Quota: € ${item.amountPerPerson.toFixed(2)}`}
        </Text>
      </TouchableOpacity>
      
      
      </>
    );
  };

  /* =======================
     UI
  ======================= */

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tutte le Spese',
          headerShown: false,
        }}
      />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 60,
          }}
        >
          <ThemedText
            style={{
              fontSize: 28,
              lineHeight: 34,
              fontWeight: '500',
            }}
          >
            Tutte le spese
          </ThemedText>
        </View>



        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
        {/* 🔍 SEARCH */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <IconSymbol name="magnifyingglass" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cerca spese o utenti"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
        
        <TouchableOpacity style={{marginVertical:'auto',marginHorizontal:10,paddingHorizontal:5}} onPress={()=>{setShowFilters(!showFilters)}}>
          <Ionicons name='filter' size={24} color="black" />
        </TouchableOpacity>

        </View>

        {/* Filtri */}
        {showFilters&&<View style={styles.filtersSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.filtersList}
            contentContainerStyle={styles.filtersContent}
          >
            {[
              { key: 'all', label: 'Tutte', icon: null },
              { key: 'unpaid', label: 'Non Saldate', icon: 'clock' },
              { key: 'paid', label: 'Saldate', icon: 'checkmark.circle' },
              { key: 'mine', label: 'Mie', icon: 'star.fill' },
              { key: 'owed', label: 'Da Saldare', icon: 'exclamationmark.circle' },
            ].map((filter) => (
              <TouchableOpacity 
                key={filter.key}
                style={[
                  styles.filterButton,
                  activeFilter === filter.key && styles.filterActive
                ]}
                onPress={() => applyFilter(filter.key)}
              >
                {filter.icon && (
                  <IconSymbol 
                    name={filter.icon} 
                    size={16} 
                    color={activeFilter === filter.key ? '#FFFFFF' : 
                      filter.key === 'paid' || filter.key === 'alreadyPaid' ? '#188C65' :
                      filter.key === 'mine' ? '#FF9500' :
                      filter.key === 'owed' ? '#FF3B30' : '#666'} 
                  />
                )}
                <Text style={[
                  styles.filterButtonText,
                  activeFilter === filter.key && styles.filterActiveText,
                  filter.key === 'all' && !activeFilter && styles.filterAllText
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>}

      {/* LIST */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          data={filteredExpenses}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            const isFullyPaid = isExpenseFullyPaid(item);
            const isMyExpense = item.paidBy._id === userId;
            const userIsParticipant = item.splitBetween?.some(p => p._id === userId);
            const userHasPaid = isDebtPaid(item, userId || '', item.paidBy._id);

            return (
              <TouchableOpacity
                style={[
                  styles.expenseCard,
                  isFullyPaid && styles.fullyPaidCard,
                  index === filteredExpenses.length - 1 && styles.lastCard
                ]}
                onPress={() =>
                  router.push({
                    pathname: '/pages/singleExpense',
                    params: {
                      expenseId: item._id,
                      groupId: item.groupId,
                      description: item.description,
                    },
                  })
                }
              >
                {/* HEADER */}
                <View style={styles.expenseHeader}>
                  <View style={{flexDirection:'row'}}>
                    <View style={[
                      styles.expenseAvatar,
                      isFullyPaid && styles.fullyPaidAvatar,
                      isMyExpense && styles.myExpenseAvatar
                    ]}>
                      <IconSymbol 
                        name={
                          isFullyPaid ? "checkmark.circle.fill" :
                          isMyExpense ? "clock" :
                          "clock"
                        } 
                        size={24} 
                        color={
                          isFullyPaid ? "#188C65" :
                          isMyExpense ? "#FF9500" :
                          "#666"
                        } 
                      />
                    </View>
                    <View style={{flexDirection:'column',gap:5}}>
                      <View style={{flexDirection:'row',gap:50}}>
                        <Text style={styles.expenseDescription}>{item.description}</Text>
                      </View>
                      <View style={{flexDirection:'row',gap:5}}>
                        {renderAvatar(item.paidBy,15)}
                        <Text style={{marginVertical:'auto',fontSize:14,color:'rgb(119, 119, 119)'}}>{item.paidBy?.name || item.paidBy?.username}</Text>
                      </View>
                      <Text style={styles.expenseDate}>
                        {formatRelativeDate(item.createdAt)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={{flexDirection:'column'}}>
                    <Text style={styles.expenseAmount}>
                      {item.amount.toFixed(2)} €
                    </Text>
                    {isFullyPaid ? (
                      <View style={styles.paidBadge}>
                        <IconSymbol name="checkmark.circle.fill" size={14} color="#188C65" />
                        <Text style={styles.paidText}>
                          {isMyExpense ? 'Tutti pagati' : 'Tutto saldato'}
                        </Text>
                      </View>
                    ) : isMyExpense ? (
                      <View style={styles.myBadge}>
                        <IconSymbol name="star" size={14} color="#FF9500" />
                        <Text style={styles.myText}>Pagata da te</Text>
                      </View>
                    ) : userIsParticipant ? (
                      userHasPaid ? (
                        <View style={styles.userPaidBadge}>
                          <IconSymbol name="checkmark.circle" size={14} color="#188C65" />
                          <Text style={styles.userPaidText}>Hai pagato</Text>
                        </View>
                      ) : (
                        <View style={styles.userOwesBadge}>
                          <IconSymbol name="exclamationmark.circle" size={14} color="#FF3B30" />
                          <Text style={styles.userOwesText}>Devi pagare</Text>
                        </View>
                      )
                    ) : null}
                  </View>
                </View>


                {/* Dettagli originali */}
                <View style={styles.expenseDetails}>
                  {item.amountPerPerson && (
                    <View style={styles.detailItem}>
                      <IconSymbol name="person.2" size={14} color="#666" />
                      <Text style={styles.detailText}>
                        {item.amountPerPerson.toFixed(2)} € a testa
                      </Text>
                    </View>
                  )}
                  
                  {item.splitBetween && (
                    <View style={styles.detailItem}>
                      <IconSymbol name="person.3" size={14} color="#666" />
                      <Text style={styles.detailText}>
                        {item.splitBetween.length} partecipanti
                      </Text>
                    </View>
                  )}
                  
                  <View style={styles.detailItem}>
                    <IconSymbol name="calendar" size={14} color="#666" />
                    <Text style={styles.detailText}>
                      {formatDate(item.createdAt)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View style={{ padding: 40, alignItems: 'center' }}>
              <Text>Nessuna spesa trovata</Text>
            </View>
          }
        />


        </>
        
      )}
    </>
  );
}

const styles = StyleSheet.create({
  
  filtersSection: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  filtersTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  filtersList: {
    flexDirection: 'row',
  },
  filtersContent: {
    paddingRight: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 65,
  },
  filterActive: {
    backgroundColor: '#188C65',
    borderColor: '#188C65',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginLeft: 4,
  },
  filterAllText: {
    marginLeft: 0,
  },
  filterActiveText: {
    color: '#FFFFFF',
  },
  searchSection: {
    paddingLeft: 16,
    paddingTop: 16,
    marginBottom:10,
    flex:1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  expenseHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  expenseAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexDirection:'row',
  },
  fullyPaidAvatar: {
    backgroundColor: '#D1E7DD',
  },
  myExpenseAvatar: {
    backgroundColor: '#FFE8CC',
  },
  expenseDescription:{
    fontSize:18,
    fontWeight:500,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft:'auto',
    marginBottom: 4,
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1E7DD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  paidText: {
    fontSize: 11,
    color: '#188C65',
    fontWeight: '600',
    marginLeft: 4,
  },
  myBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8CC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  myText: {
    fontSize: 11,
    color: '#FF9500',
    fontWeight: '600',
    marginLeft: 4,
  },
  userPaidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1E7DD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  userPaidText: {
    fontSize: 11,
    color: '#188C65',
    fontWeight: '600',
    marginLeft: 4,
  },
  userOwesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffd1d1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  userOwesText: {
    fontSize: 11,
    color: '#FF3B30',
    fontWeight: '600',
    marginLeft: 4,
  },
  expenseDate: {
    fontSize: 12,
    color: '#999',
    marginVertical:'auto',
  },
  expenseCard:{
    borderWidth:1,
    backgroundColor:'white',
    padding:10,
    margin:10,
    borderRadius:10,
  },
  fullyPaidCard:{
    backgroundColor: '#F0F9F6',
    borderColor: '#97cab3',
    borderWidth: 1,
  },
  lastCard: {
    marginBottom: 0,
  },
  expenseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});
