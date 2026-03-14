import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Copy, Building2, AlertCircle, ArrowLeft } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import WaveBackground from '../../components/svg/WaveBackground';

export default function FundWalletScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const displayUsername = user?.username || user?.name || 'user';
  const customAccountName = `MadioTech/${displayUsername}`;
  const bankAccounts = [];

  if (user?.palmpay) {
    bankAccounts.push({
      id: 1,
      bankName: "Palmpay",
      accountName: customAccountName,
      accountNumber: user.palmpay,
    });
  }

  if (user?.['9psb']) {
    bankAccounts.push({
      id: 2,
      bankName: "9PaymentSB",
      accountName: customAccountName,
      accountNumber: user['9psb'],
    });
  }

  const handleCopy = async (number: string) => {
    await Clipboard.setStringAsync(number);
    Alert.alert("Copied!", `Number ${number} copied to clipboard.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top + 24, 48) }]}>
      <WaveBackground height={280} color1="#7DD3FC" color2="#C4B5FD" />
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <ArrowLeft size={24} color="#0A0A0A" />
      </TouchableOpacity>

      <Text style={styles.title}>Fund Wallet</Text>
      <Text style={styles.subtitle}>Direct bank transfer · fee: ₦50.00</Text>

      <View style={styles.cardsContainer}>
        {bankAccounts.map((account) => (
          <View key={account.id} style={styles.bankCard}>
            <View style={styles.cardHeader}>
              <View style={styles.bankNameContainer}>
                <Building2 size={20} color="#0A0A0A" strokeWidth={1.5} />
                <Text style={styles.bankName}>{account.bankName}</Text>
              </View>
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={() => handleCopy(account.accountNumber)}
              >
                <Copy size={16} color="#0A0A0A" />
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.accountInfoContainer}>
              <Text style={styles.accountNumber}>{account.accountNumber}</Text>
              <Text style={styles.accountName}>{account.accountName}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipContainer}>
        <AlertCircle size={18} color="#0A0A0A" style={styles.tipIcon} strokeWidth={2} />
        <Text style={styles.tipText}>
          Transfer to any of the accounts above. Your wallet will be funded automatically within seconds.
        </Text>
      </View>

      <TouchableOpacity style={styles.resolveButton}>
        <Text style={styles.resolveButtonText}>Having payment issues?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 32,
  },
  backButton: {
    marginBottom: 24,
    marginLeft: -8,
    padding: 8,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0A0A0A',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 32,
  },
  cardsContainer: {
    gap: 16,
  },
  bankCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  bankNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A0A0A',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    gap: 6,
  },
  copyButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0A0A0A',
  },
  accountInfoContainer: {
    gap: 4,
  },
  accountName: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  accountNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0A0A0A',
    letterSpacing: 1,
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    marginTop: 32,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  tipIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  resolveButton: {
    marginTop: 40,
    paddingVertical: 16,
  },
  resolveButtonText: {
    textAlign: 'center',
    color: '#0A0A0A',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
