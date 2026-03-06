import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Phone, ChevronDown, CheckCircle2 } from 'lucide-react-native';

export default function AirtimeScreen() {
  const [network, setNetwork] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');

  // A basic dropdown mock since typical React Native doesn't have a native unstyled spinner
  // We'll mimic the UI by showing input-like touchable surfaces.
  
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Network Provider</Text>
          <TouchableOpacity style={styles.selectBox}>
            <Text style={styles.selectText}>{network || "Select Network Provider"}</Text>
            <ChevronDown size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Airtime Type</Text>
          <TouchableOpacity style={styles.selectBox}>
            <Text style={styles.selectText}>{type || "Select Airtime Type"}</Text>
            <ChevronDown size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount (Min: ₦50.00)</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>₦</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#94a3b8"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputContainer}>
            <Phone size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="0800 000 0000"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.purchaseButton}>
          <Text style={styles.purchaseButtonText}>Purchase Airtime</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resolveButton}>
          <Text style={styles.resolveButtonText}>Resolve issues</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  selectText: {
    fontSize: 16,
    color: '#0f172a',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginRight: 8,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#0f172a',
  },
  purchaseButton: {
    backgroundColor: '#3b82f6',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  purchaseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  resolveButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  resolveButtonText: {
    color: '#64748b',
    fontSize: 15,
    fontWeight: '600',
  },
});
