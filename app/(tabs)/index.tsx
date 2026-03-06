import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Wallet, History, MessageCircle, PhoneCall, Wifi, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const userName = "Hezekiah Sola";
  const walletBalance = "₦ 5,240.00";

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header matching dashboardBG from original app */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{userName}</Text>
          
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Wallet balance</Text>
            <Text style={styles.balanceAmount}>{walletBalance}</Text>
          </View>
        </View>

        {/* Quick Actions Bar */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionCard} onPress={() => router.push('/(features)/fund-wallet')}>
            <View style={[styles.iconBox, { backgroundColor: '#e0f2fe' }]}>
              <Wallet size={24} color="#0284c7" />
            </View>
            <Text style={styles.quickActionText}>Fund Wallet</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard} onPress={() => router.push('/(tabs)/transactions')}>
            <View style={[styles.iconBox, { backgroundColor: '#fef3c7' }]}>
              <History size={24} color="#d97706" />
            </View>
            <Text style={styles.quickActionText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionCard}>
            <View style={[styles.iconBox, { backgroundColor: '#dcfce7' }]}>
              <MessageCircle size={24} color="#16a34a" />
            </View>
            <Text style={styles.quickActionText}>Support</Text>
          </TouchableOpacity>
        </View>

        {/* Upgrade Banner */}
        <TouchableOpacity style={styles.upgradeBanner}>
          <View style={styles.upgradeTextContainer}>
            <Text style={styles.upgradeTitle}>Upgrade Your Account</Text>
            <Text style={styles.upgradeSubtitle}>Unlock more features</Text>
          </View>
          <ArrowRight color="#ffffff" size={20} />
        </TouchableOpacity>

        {/* Services */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesGrid}>
            <TouchableOpacity style={styles.serviceCard} onPress={() => router.push('/(features)/airtime')}>
              <View style={[styles.serviceIconBox, { backgroundColor: '#fdf4ff' }]}>
                <PhoneCall size={32} color="#c026d3" />
              </View>
              <Text style={styles.serviceText}>Airtime{'\n'}Top up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard} onPress={() => router.push('/(features)/buy-data')}>
              <View style={[styles.serviceIconBox, { backgroundColor: '#eff6ff' }]}>
                <Wifi size={32} color="#2563eb" />
              </View>
              <Text style={styles.serviceText}>Buy{'\n'}Data</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/transactions')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsContainer}>
            {/* Empty state for now */}
            <Text style={styles.emptyText}>No recent transactions</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#f8fafc',
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 60,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  greeting: {
    color: '#94a3b8',
    fontSize: 16,
  },
  name: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  balanceContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#cbd5e1',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '800',
    marginTop: 8,
    letterSpacing: 1,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: -30,
  },
  quickActionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  upgradeBanner: {
    marginHorizontal: 24,
    marginTop: 32,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  upgradeTextContainer: {
    flex: 1,
  },
  upgradeTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  upgradeSubtitle: {
    color: '#bfdbfe',
    fontSize: 14,
    marginTop: 4,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 14,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  serviceIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  transactionsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 15,
  },
});
