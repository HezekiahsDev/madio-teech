import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { Phone, ChevronDown, ArrowLeft, Wallet, AlertCircle, BadgePercent } from 'lucide-react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { servicesApi } from '../../lib/api/services';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchableDropdown from '../../components/SearchableDropdown';
import { useBiometricsStore } from '../../store/biometricsStore';
import { authenticateWithBiometrics } from '../../utils/biometrics';
import WaveBackground from '../../components/svg/WaveBackground';

const DISCOUNT_PERCENT = 2; // All networks have 2% discount

const NETWORKS = [
  { id: 'MTN', name: 'MTN', discount: 2 },
  { id: 'GLO', name: 'GLO', discount: 2 },
  { id: 'AIRTEL', name: 'Airtel', discount: 2 },
  { id: '9MOBILE', name: '9Mobile', discount: 2 }
];

export default function AirtimeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { apiKey, user } = useAuthStore();
  const { isEnabled: biometricsEnabled, biometricType } = useBiometricsStore();
  const [network, setNetwork] = useState('');
  const [showNetworkOptions, setShowNetworkOptions] = useState(false);
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Wallet balance
  const walletBalance = parseFloat(user?.wallet || '0');

  // Discount calculation
  const parsedAmount = parseFloat(amount) || 0;
  const selectedNetwork = NETWORKS.find(n => n.id === network);
  const discount = selectedNetwork ? selectedNetwork.discount : DISCOUNT_PERCENT;
  const discountAmount = parsedAmount * (discount / 100);
  const chargedAmount = parsedAmount - discountAmount;

  // Validation
  const isAmountTooLow = parsedAmount > 0 && parsedAmount < 50;
  const isInsufficientBalance = chargedAmount > 0 && chargedAmount > walletBalance;
  const isFormValid = network && parsedAmount >= 50 && phone.length >= 11 && !isInsufficientBalance;

  const handlePurchase = async () => {
    if (!isFormValid) return;
    if (!apiKey) return;

    // Biometric confirmation if enabled
    if (biometricsEnabled) {
      const typeLabel = biometricType || 'Biometrics';
      const authResult = await authenticateWithBiometrics(`Confirm purchase with ${typeLabel}`);
      if (!authResult.success) {
        if (authResult.error !== 'user_cancel' && authResult.error !== 'system_cancel') {
          alert('Authentication failed. Purchase cancelled.');
        }
        return;
      }
    }

    setIsLoading(true);
    try {
      const res = await servicesApi.buyAirtime(apiKey, amount, phone, network);
      if (res?.success === 'true' || res?.status === 'Successful') {
        alert("Purchase Successful: " + (res.message || "Airtime delivered."));
        router.back();
      } else {
        alert("Purchase failed: " + (res?.message || "Please check your balance and try again."));
      }
    } catch (e: any) {
      alert("Purchase failed: " + (e.response?.data?.message || e.message));
    } finally {
      setIsLoading(false);
    }
  };

  const networkOptions = NETWORKS.map(n => ({ id: n.id, label: n.name, subLabel: `${n.discount}% discount` }));
  const selectedNetworkLabel = selectedNetwork?.name || "Select Network";

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <WaveBackground height={280} color1="#FBBF24" color2="#F87171" />
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top + 24, 48) }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color="#0A0A0A" />
        </TouchableOpacity>

        <Text style={styles.title}>Buy Airtime</Text>

        {/* Wallet Balance Banner */}
        <View style={styles.balanceBanner}>
          <View style={styles.balanceLeft}>
            <Wallet size={18} color="#4B5563" />
            <Text style={styles.balanceLabel}>Wallet Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>₦{walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Network Provider</Text>
          <TouchableOpacity 
            style={[styles.selectBox, showNetworkOptions && styles.selectBoxActive]} 
            onPress={() => setShowNetworkOptions(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.selectText, !network && styles.placeholderText]}>
              {selectedNetworkLabel}
            </Text>
            <ChevronDown size={20} color="#0A0A0A" />
          </TouchableOpacity>
          
          <SearchableDropdown
            visible={showNetworkOptions}
            onClose={() => setShowNetworkOptions(false)}
            options={networkOptions}
            value={network}
            onSelect={setNetwork}
            title="Select Network"
            placeholder="Search networks..."
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount (Min: ₦50.00)</Text>
          <View style={[styles.inputContainer, isAmountTooLow && styles.inputContainerError]}>
            <Text style={styles.currencySymbol}>₦</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
          {isAmountTooLow && (
            <Text style={styles.errorText}>Minimum amount is ₦50.00</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputContainer}>
            <Phone size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="0800 000 0000"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={11}
            />
          </View>
        </View>

        {/* Discount & Pricing Summary */}
        {parsedAmount >= 50 && network ? (
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Airtime Value</Text>
              <Text style={styles.summaryValue}>₦{parsedAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.discountBadge}>
                <BadgePercent size={14} color="#059669" />
                <Text style={styles.discountText}>{discount}% Discount</Text>
              </View>
              <Text style={styles.discountValue}>-₦{discountAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>You Pay</Text>
              <Text style={styles.totalValue}>₦{chargedAmount.toFixed(2)}</Text>
            </View>
          </View>
        ) : null}

        {/* Insufficient Balance Warning */}
        {isInsufficientBalance && (
          <View style={styles.warningBanner}>
            <AlertCircle size={18} color="#DC2626" />
            <Text style={styles.warningText}>
              Insufficient balance. You need ₦{(chargedAmount - walletBalance).toFixed(2)} more. Please fund your wallet first.
            </Text>
          </View>
        )}

        <TouchableOpacity 
          style={[styles.purchaseButton, (!isFormValid || isLoading) && styles.purchaseButtonDisabled]} 
          onPress={handlePurchase}
          disabled={!isFormValid || isLoading}
          activeOpacity={0.9}
        >
          {isLoading ? (
             <ActivityIndicator color="#FFFFFF" />
          ) : (
             <Text style={styles.purchaseButtonText}>
               {parsedAmount >= 50 && network ? `Pay ₦${chargedAmount.toFixed(2)}` : 'Pay ₦0.00'}
             </Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 24,
  },
  // Wallet Balance Banner
  balanceBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  balanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A0A0A',
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 10,
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 16,
    height: 60,
    paddingHorizontal: 16,
  },
  selectBoxActive: {
    borderColor: '#0A0A0A',
  },
  selectText: {
    fontSize: 16,
    color: '#0A0A0A',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 16,
    height: 60,
    paddingHorizontal: 16,
  },
  inputContainerError: {
    borderColor: '#DC2626',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A0A0A',
    marginRight: 8,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#0A0A0A',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 13,
    color: '#DC2626',
    marginTop: 6,
    marginLeft: 4,
  },
  // Summary Card
  summaryCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  discountText: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '600',
  },
  discountValue: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginVertical: 6,
  },
  totalLabel: {
    fontSize: 16,
    color: '#0A0A0A',
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 18,
    color: '#0A0A0A',
    fontWeight: '700',
  },
  // Warning Banner
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: '#DC2626',
    fontWeight: '500',
    lineHeight: 18,
  },
  purchaseButton: {
    backgroundColor: '#0A0A0A',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  purchaseButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
