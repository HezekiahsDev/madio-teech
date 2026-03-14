import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Shield, LogOut, ChevronRight, HelpCircle, Fingerprint, FileText } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/useAuthStore';
import { useBiometricsStore } from '../../store/biometricsStore';
import { authenticateWithBiometrics } from '../../utils/biometrics';
import BlobBackground from '../../components/svg/BlobBackground';
import DotPattern from '../../components/svg/DotPattern';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { isEnabled, isAvailable, biometricType, checkAvailability, enableBiometrics, disableBiometrics, saveCredentials } = useBiometricsStore();

  useEffect(() => {
    checkAvailability();
  }, []);

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const handleBiometricToggle = async (value: boolean) => {
    const typeLabel = biometricType || 'Biometrics';
    
    if (value) {
      // Turning ON — verify identity first
      const authResult = await authenticateWithBiometrics(`Verify ${typeLabel} to enable`);
      if (authResult.success) {
        enableBiometrics();
        Alert.alert('Enabled', `${typeLabel} login and payment confirmation is now active.`);
      } else {
        // Auth failed — don't enable
        if (authResult.error !== 'user_cancel' && authResult.error !== 'system_cancel') {
          Alert.alert('Failed', `${typeLabel} verification failed. Please try again.`);
        }
      }
    } else {
      // Turning OFF
      Alert.alert(
        `Disable ${typeLabel}?`,
        'You will need to use your password to sign in and payments will proceed without biometric confirmation.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Disable',
            style: 'destructive',
            onPress: async () => {
              await disableBiometrics();
            },
          },
        ]
      );
    }
  };

  const userName = user?.name || user?.username || "Guest";
  const userEmail = user?.email || "No email available";

  return (
    <SafeAreaView style={styles.container}>
      <BlobBackground variant="profile" />
      <DotPattern areaHeight={300} />
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <User size={32} color="#0A0A0A" strokeWidth={1.5} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(features)/account-settings')}>
            <View style={styles.menuIconContainer}>
              <Settings size={20} color="#0A0A0A" strokeWidth={1.5} />
            </View>
            <Text style={styles.menuText}>Account Settings</Text>
            <ChevronRight size={20} color="#D1D5DB" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(features)/security-privacy')}>
            <View style={styles.menuIconContainer}>
              <Shield size={20} color="#0A0A0A" strokeWidth={1.5} />
            </View>
            <Text style={styles.menuText}>Security & Privacy</Text>
            <ChevronRight size={20} color="#D1D5DB" />
          </TouchableOpacity>

          {/* Biometric Login Toggle — only shown if device supports it */}
          {isAvailable && (
            <View style={styles.menuItem}>
              <View style={[styles.menuIconContainer, styles.biometricIconContainer]}>
                <Fingerprint size={20} color="#0A0A0A" strokeWidth={1.5} />
              </View>
              <View style={styles.biometricTextContainer}>
                <Text style={styles.menuText}>{biometricType || 'Biometric'} Login</Text>
                <Text style={styles.biometricSubtext}>
                  {isEnabled ? 'Active for login & payments' : 'Off'}
                </Text>
              </View>
              <Switch
                value={isEnabled}
                onValueChange={handleBiometricToggle}
                trackColor={{ false: '#E5E7EB', true: '#0A0A0A' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E7EB"
              />
            </View>
          )}
          
          <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]} onPress={() => router.push('/(features)/help-support')}>
            <View style={styles.menuIconContainer}>
              <HelpCircle size={20} color="#0A0A0A" strokeWidth={1.5} />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <ChevronRight size={20} color="#D1D5DB" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#DC2626" strokeWidth={1.5} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Legal Links */}
      <View style={styles.legalSection}>
        <TouchableOpacity onPress={() => router.push('/(features)/privacy-policy')}>
          <Text style={styles.legalLink}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.legalDot}>·</Text>
        <TouchableOpacity onPress={() => router.push('/(features)/terms-conditions')}>
          <Text style={styles.legalLink}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.versionText}>MadioTech v1.0.0</Text>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0A0A0A',
    letterSpacing: -0.2,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  biometricIconContainer: {
    backgroundColor: '#F0F9FF',
    borderColor: 'rgba(10,10,10,0.06)',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#0A0A0A',
  },
  biometricTextContainer: {
    flex: 1,
  },
  biometricSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  legalSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    gap: 8,
  },
  legalLink: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  legalDot: {
    fontSize: 13,
    color: '#D1D5DB',
  },
  versionText: {
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
});
