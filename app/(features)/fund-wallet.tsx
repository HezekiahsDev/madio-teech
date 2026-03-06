import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Copy, Building2, AlertCircle } from 'lucide-react-native';

export default function FundWalletScreen() {
  const bankAccounts = [
    {
      id: 1,
      bankName: "Palmpay",
      accountName: "OLUSHOLA HEZEKIAH W",
      accountNumber: "0210837651",
      iconColor: "#C77710"
    },
    {
      id: 2,
      bankName: "9PaymentSB",
      accountName: "OLUSHOLA HEZEKIAH W",
      accountNumber: "0210837651",
      iconColor: "#10b981"
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.subtitle}>Instant Deposit · fee: NGN 50.00</Text>

      <View style={styles.cardsContainer}>
        {bankAccounts.map((account) => (
          <View key={account.id} style={styles.bankCard}>
            <View style={styles.cardHeader}>
              <View style={styles.bankNameContainer}>
                <Building2 size={24} color={account.iconColor} />
                <Text style={styles.bankName}>{account.bankName}</Text>
              </View>
              <TouchableOpacity style={styles.copyButton}>
                <Copy size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
            <Text style={styles.accountName}>{account.accountName}</Text>
            <Text style={styles.accountNumber}>{account.accountNumber}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipContainer}>
        <AlertCircle size={20} color="#64748b" style={styles.tipIcon} />
        <Text style={styles.tipText}>
          Tip: Use the account number as the transfer account. Add your mobile number as narration.
        </Text>
      </View>

      <TouchableOpacity style={styles.resolveButton}>
        <Text style={styles.resolveButtonText}>Resolve payment issues</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
  },
  cardsContainer: {
    gap: 16,
  },
  bankCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bankName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  copyButton: {
    padding: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  accountName: {
    fontSize: 13,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  accountNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 8,
    letterSpacing: 2,
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    padding: 16,
    borderRadius: 12,
    marginTop: 32,
    alignItems: 'flex-start',
  },
  tipIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  resolveButton: {
    marginTop: 40,
    paddingVertical: 16,
  },
  resolveButtonText: {
    textAlign: 'center',
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '700',
  },
});
