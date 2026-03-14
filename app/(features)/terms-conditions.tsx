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

export default function TermsConditionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={22} color="#0A0A0A" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
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
          <Text style={styles.introTitle}>Terms of Service</Text>
          <Text style={styles.introText}>
            Please read these Terms and Conditions carefully before using the MadioTech
            mobile application. By accessing or using our service, you agree to be
            bound by these terms.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>01</Text>
          <Text style={styles.sectionTitle}>Acceptance of Terms</Text>
          <Text style={styles.sectionText}>
            By downloading, installing, or using the MadioTech application, you agree to
            be bound by these Terms and Conditions. If you do not agree with any part
            of these terms, you must not use our application. We reserve the right to
            update these terms at any time, and your continued use constitutes acceptance
            of any modifications.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>02</Text>
          <Text style={styles.sectionTitle}>Service Description</Text>
          <Text style={styles.sectionText}>
            MadioTech provides a mobile platform for:{'\n\n'}
            • Purchasing airtime and data bundles{'\n'}
            • Wallet funding and management{'\n'}
            • Bill payment services{'\n'}
            • Other digital value-added services{'\n\n'}
            Service availability may vary by region and is subject to network provider
            capabilities. We strive to maintain continuous service but do not guarantee
            uninterrupted access.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>03</Text>
          <Text style={styles.sectionTitle}>User Accounts</Text>
          <Text style={styles.sectionText}>
            To use our services, you must:{'\n\n'}
            • Be at least 18 years of age{'\n'}
            • Provide accurate and complete registration information{'\n'}
            • Maintain the security of your account credentials{'\n'}
            • Notify us immediately of any unauthorized account access{'\n\n'}
            You are responsible for all activities that occur under your account. MadioTech
            reserves the right to suspend or terminate accounts that violate these terms.
          </Text>
        </View>

        {/* Section 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>04</Text>
          <Text style={styles.sectionTitle}>Payments & Transactions</Text>
          <Text style={styles.sectionText}>
            • All transactions are processed in Nigerian Naira (₦).{'\n'}
            • Wallet balances must be funded before making purchases.{'\n'}
            • Transaction fees may apply based on your account level.{'\n'}
            • Completed transactions are final and non-refundable unless an error is identified on our end.{'\n'}
            • MadioTech is not liable for failed transactions due to incorrect information provided by the user.{'\n'}
            • Refund requests must be submitted within 24 hours of the transaction.
          </Text>
        </View>

        {/* Section 5 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>05</Text>
          <Text style={styles.sectionTitle}>User Conduct</Text>
          <Text style={styles.sectionText}>
            You agree not to:{'\n\n'}
            • Use the service for any unlawful purpose{'\n'}
            • Attempt to gain unauthorized access to our systems{'\n'}
            • Engage in any activity that disrupts the service{'\n'}
            • Use automated systems or bots to access the service without permission{'\n'}
            • Impersonate any person or entity{'\n'}
            • Transmit malware or malicious code
          </Text>
        </View>

        {/* Section 6 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>06</Text>
          <Text style={styles.sectionTitle}>Intellectual Property</Text>
          <Text style={styles.sectionText}>
            All content, features, and functionality of the MadioTech application — including
            but not limited to text, graphics, logos, icons, and software — are the
            exclusive property of MadioTech and are protected by intellectual property laws.
            You may not reproduce, distribute, or create derivative works without our express
            written permission.
          </Text>
        </View>

        {/* Section 7 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>07</Text>
          <Text style={styles.sectionTitle}>Limitation of Liability</Text>
          <Text style={styles.sectionText}>
            To the maximum extent permitted by law, MadioTech shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages arising out
            of your use of or inability to use the service. Our total liability shall not
            exceed the amount paid by you to MadioTech in the twelve (12) months preceding
            the claim.
          </Text>
        </View>

        {/* Section 8 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>08</Text>
          <Text style={styles.sectionTitle}>Termination</Text>
          <Text style={styles.sectionText}>
            We may suspend or terminate your access to the service at any time, with or
            without cause, and with or without notice. Upon termination, your right to
            use the service ceases immediately. Any outstanding wallet balance at the time
            of termination will be handled in accordance with applicable regulations.
          </Text>
        </View>

        {/* Section 9 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>09</Text>
          <Text style={styles.sectionTitle}>Governing Law</Text>
          <Text style={styles.sectionText}>
            These Terms shall be governed by and construed in accordance with the laws of
            the Federal Republic of Nigeria, without regard to its conflict of law provisions.
            Any disputes arising under these terms shall be subject to the exclusive jurisdiction
            of the courts in Nigeria.
          </Text>
        </View>

        {/* Section 10 */}
        <View style={styles.section}>
          <Text style={styles.sectionNumber}>10</Text>
          <Text style={styles.sectionTitle}>Dispute Resolution</Text>
          <Text style={styles.sectionText}>
            In the event of any dispute arising from or relating to these terms, the parties
            agree to first attempt to resolve the dispute through good-faith negotiation.
            If the dispute cannot be resolved through negotiation within thirty (30) days,
            either party may seek resolution through binding arbitration or the courts.
          </Text>
        </View>

        {/* Contact */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Questions?</Text>
          <Text style={styles.contactText}>
            If you have any questions about these Terms & Conditions, please contact us:
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
