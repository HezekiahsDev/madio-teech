import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

const LAST_UPDATED = 'March 6, 2026';

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={22} color="#0A0A0A" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBadge}>
          <Text style={styles.topBadgeText}>Last updated: {LAST_UPDATED}</Text>
        </View>

        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Your Privacy Matters</Text>
          <Text style={styles.introText}>
            At MadioTech, we are committed to protecting your personal information
            and your right to privacy. This policy describes how we collect, use,
            and protect your data when you use our mobile application and services.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>01</Text>
          <Text style={styles.sectionTitle}>Information We Collect</Text>
          <Text style={styles.sectionText}>
            We collect information that you provide directly to us, including:{'\n\n'}
            • <Text style={styles.bold}>Account Information:</Text> Name, email address, phone number, and password when you create an account.{'\n\n'}
            • <Text style={styles.bold}>Transaction Data:</Text> Details of airtime, data, and other service purchases made through the app.{'\n\n'}
            • <Text style={styles.bold}>Payment Information:</Text> Wallet funding details, bank transfer information, and transaction history.{'\n\n'}
            • <Text style={styles.bold}>Device Information:</Text> Device type, operating system, unique device identifiers, and mobile network information.{'\n\n'}
            • <Text style={styles.bold}>Usage Data:</Text> How you interact with our app, including pages viewed and features used.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>02</Text>
          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          <Text style={styles.sectionText}>
            We use the information we collect to:{'\n\n'}
            • Process your transactions and provide our services{'\n'}
            • Maintain and improve the app experience{'\n'}
            • Send you transaction confirmations and service updates{'\n'}
            • Protect against fraudulent or unauthorized activity{'\n'}
            • Comply with legal obligations and regulatory requirements{'\n'}
            • Provide customer support and respond to inquiries
          </Text>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>03</Text>
          <Text style={styles.sectionTitle}>Information Sharing</Text>
          <Text style={styles.sectionText}>
            We do not sell your personal information. We may share your data with:{'\n\n'}
            • <Text style={styles.bold}>Service Providers:</Text> Third-party companies that help us operate our services (e.g., payment processors, network providers).{'\n\n'}
            • <Text style={styles.bold}>Legal Requirements:</Text> When required by law, regulation, or legal process.{'\n\n'}
            • <Text style={styles.bold}>Business Transfers:</Text> In connection with a merger, acquisition, or sale of assets.
          </Text>
        </View>

        {/* Section 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>04</Text>
          <Text style={styles.sectionTitle}>Data Security</Text>
          <Text style={styles.sectionText}>
            We implement industry-standard security measures to protect your personal information, including encryption of data in transit and at rest, secure server infrastructure, and regular security audits. However, no method of transmission over the internet is 100% secure.
          </Text>
        </View>

        {/* Section 5 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>05</Text>
          <Text style={styles.sectionTitle}>Data Retention</Text>
          <Text style={styles.sectionText}>
            We retain your personal data for as long as your account is active or as needed to provide you services. We may also retain and use your information to comply with legal obligations, resolve disputes, and enforce our agreements.
          </Text>
        </View>

        {/* Section 6 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>06</Text>
          <Text style={styles.sectionTitle}>Your Rights</Text>
          <Text style={styles.sectionText}>
            You have the right to:{'\n\n'}
            • Access the personal data we hold about you{'\n'}
            • Request correction of inaccurate data{'\n'}
            • Request deletion of your data{'\n'}
            • Withdraw consent at any time{'\n'}
            • Object to processing of your data{'\n'}
            • Data portability
          </Text>
        </View>

        {/* Section 7 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>07</Text>
          <Text style={styles.sectionTitle}>Children's Privacy</Text>
          <Text style={styles.sectionText}>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child, we will take steps to delete such information.
          </Text>
        </View>

        {/* Section 8 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>08</Text>
          <Text style={styles.sectionTitle}>Changes to This Policy</Text>
          <Text style={styles.sectionText}>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy in the app and updating the "Last Updated" date. Your continued use of the app after changes constitutes acceptance of the updated policy.
          </Text>
        </View>

        {/* Contact */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Questions?</Text>
          <Text style={styles.contactText}>
            If you have any questions about this Privacy Policy, please contact us:
          </Text>
          <Text style={styles.contactDetail}>📧  support@madiotech.com</Text>
          <Text style={styles.contactDetail}>📞  +234 800 MADIO</Text>
          <Text style={styles.contactDetail}>🌐  www.madiotech.com</Text>
        </View>

        <Text style={styles.footer}>
          © {new Date().getFullYear()} MadioTech. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0A0A0A',
    letterSpacing: -0.2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  topBadge: {
    alignSelf: 'center',
    marginTop: 24,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  topBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  introCard: {
    marginTop: 24,
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  introText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 22,
  },
  section: {
    marginBottom: 28,
  },
  sectionNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D1D5DB',
    marginBottom: 6,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A0A0A',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  sectionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  bold: {
    fontWeight: '600',
    color: '#0A0A0A',
  },
  contactCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A0A0A',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  contactDetail: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 8,
  },
  footer: {
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 16,
  },
});
