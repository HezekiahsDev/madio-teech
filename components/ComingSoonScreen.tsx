import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Linking,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Check,
  Clock,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react-native";
import { router } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import ComingSoonBackground from "./svg/ComingSoonBackground";

interface FeatureItem {
  label: string;
}

interface ComingSoonScreenProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: FeatureItem[];
  showContactInfo?: boolean;
  timeline?: string;
}

const CONTACT = {
  email: "madiotech.ng@gmail.com",
  phone: "+234903535818",
  phoneDisplay: "+234 800 MADIO",
  whatsapp: "+234903535818",
  website: "www.madiotech.com.ng",
};

export default function ComingSoonScreen({
  title,
  description,
  icon: Icon,
  features = [],
  showContactInfo = false,
  timeline = "Coming Soon",
}: ComingSoonScreenProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const badgeScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Pulse animation for icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Fade in content
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 6,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleEmail = () => {
    Linking.openURL(`mailto:${CONTACT.email}`);
  };

  const handlePhone = () => {
    Linking.openURL(`tel:${CONTACT.phone}`);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello MadioTech, I need help with ${title}.`,
    );
    Linking.openURL(`https://wa.me/${CONTACT.whatsapp}?text=${message}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ComingSoonBackground />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={22} color="#0A0A0A" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon Hero */}
        <View style={styles.heroSection}>
          <Animated.View
            style={[
              styles.iconCircleOuter,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            <View style={styles.iconCircleMiddle}>
              <View style={styles.iconCircleInner}>
                <Icon size={36} color="#0A0A0A" strokeWidth={1.5} />
              </View>
            </View>
          </Animated.View>

          {/* Badge */}
          <Animated.View
            style={[styles.badge, { transform: [{ scale: badgeScale }] }]}
          >
            <Clock size={14} color="#6B7280" strokeWidth={2} />
            <Text style={styles.badgeText}>{timeline}</Text>
          </Animated.View>
        </View>

        {/* Content */}
        <Animated.View
          style={[
            styles.contentSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>We're Building Something Great</Text>
          <Text style={styles.description}>{description}</Text>

          {/* Features Preview */}
          {features.length > 0 && (
            <View style={styles.featuresCard}>
              <Text style={styles.featuresTitle}>What's Coming</Text>
              {features.map((feature, i) => (
                <View key={i} style={styles.featureRow}>
                  <View style={styles.checkContainer}>
                    <Check size={14} color="#10B981" strokeWidth={3} />
                  </View>
                  <Text style={styles.featureText}>{feature.label}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Contact Info */}
          {showContactInfo && (
            <View style={styles.contactCard}>
              <Text style={styles.contactTitle}>Need Help Now?</Text>
              <Text style={styles.contactSubtitle}>
                Reach out to us directly
              </Text>

              <TouchableOpacity style={styles.contactRow} onPress={handleEmail}>
                <View style={styles.contactIconBox}>
                  <Mail size={18} color="#0A0A0A" strokeWidth={1.5} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Email Us</Text>
                  <Text style={styles.contactValue}>{CONTACT.email}</Text>
                </View>
                <ExternalLink size={16} color="#D1D5DB" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactRow} onPress={handlePhone}>
                <View style={styles.contactIconBox}>
                  <Phone size={18} color="#0A0A0A" strokeWidth={1.5} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Call Us</Text>
                  <Text style={styles.contactValue}>
                    {CONTACT.phoneDisplay}
                  </Text>
                </View>
                <ExternalLink size={16} color="#D1D5DB" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.whatsappButton]}
                onPress={handleWhatsApp}
              >
                <Text style={styles.whatsappButtonText}>Chat on WhatsApp</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Bottom Note */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              We're working hard to bring you the best experience. Stay tuned
              for updates!
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0A0A0A",
    letterSpacing: -0.2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 32,
  },
  iconCircleOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
  },
  iconCircleMiddle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  iconCircleInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 6,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    letterSpacing: 0.3,
  },
  contentSection: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0A0A0A",
    textAlign: "center",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  featuresCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0A0A0A",
    marginBottom: 18,
    letterSpacing: -0.2,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  checkContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  featureText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
    flex: 1,
  },
  contactCard: {
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  contactIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  whatsappButton: {
    marginTop: 18,
    backgroundColor: "#25D366",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  whatsappButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  noteContainer: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  noteText: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 20,
  },
});
