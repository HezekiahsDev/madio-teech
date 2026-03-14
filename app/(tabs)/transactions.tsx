import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { History, Wallet, Phone, Wifi, Zap, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { walletApi, Transaction } from '../../lib/api/wallet';
import EmptyStateIllustration from '../../components/svg/EmptyStateIllustration';
import DotPattern from '../../components/svg/DotPattern';

export default function TransactionsScreen() {
  const { apiKey } = useAuthStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    if (!apiKey) return;
    try {
      const data = await walletApi.getTransactions(apiKey);
      setTransactions(Array.isArray(data) ? data : []);
    } catch(err) {
      console.error("Failed to load transactions", err);
    }
  }, [apiKey]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchData().finally(() => {
      if (isMounted) setIsLoading(false);
    });
    return () => { isMounted = false; };
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const renderItem = ({ item }: { item: Transaction }) => {
    const s = (item.service || '').toLowerCase();
    const d = (item.description || '').toLowerCase();
    const isCredit = d.includes('wallet funding') || d.includes('credit');
    
    let IconComp: any = isCredit ? ArrowDownLeft : ArrowUpRight;
    if (s.includes('airtime')) IconComp = Phone;
    else if (s.includes('data')) IconComp = Wifi;

    return (
      <View style={styles.transactionItem}>
        <View style={styles.txIconBox}>
          <IconComp size={18} color={isCredit ? '#10B981' : '#0A0A0A'} strokeWidth={2} />
        </View>
        <View style={styles.txDetails}>
          <Text style={styles.txService} numberOfLines={1}>{item.description || item.service || 'Transaction'}</Text>
          <Text style={styles.txDate}>{item.date?.split(' ')[0] || item.date} · Ref# {item.transaction_id || 'N/A'}</Text>
        </View>
        <Text style={[styles.txAmount, isCredit && styles.txSuccess]}>
          {isCredit ? '+' : '-'}₦{Number(item.amount || 0).toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DotPattern areaHeight={200} />
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
      </View>
      
      {isLoading && !refreshing ? (
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#0A0A0A" />
        </View>
      ) : transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => item.transaction_id || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#000000" colors={["#000000"]} />
          }
        />
      ) : (
        <View style={styles.content}>
          <EmptyStateIllustration size={160} />
          <Text style={styles.emptyTitle}>No Transactions</Text>
          <Text style={styles.emptySubtitle}>You haven't made any transactions yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#0A0A0A',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  txIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  txDetails: {
    flex: 1,
  },
  txService: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A0A0A',
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  txDate: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A0A0A',
  },
  txSuccess: {
    color: '#10B981',
  },
});
