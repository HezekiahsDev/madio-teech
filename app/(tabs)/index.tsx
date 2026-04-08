import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import {
  Wallet,
  History,
  MessageCircle,
  PhoneCall,
  Wifi,
  ArrowRight,
  Zap,
  ArrowRightLeft,
  Star,
  Crown,
  Shield,
  User as UserIcon,
  Medal,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  CheckCircle2,
  Tv,
  GraduationCap,
  Dices,
  LayoutGrid,
  Eye,
  EyeOff,
} from "lucide-react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/useAuthStore";
import { walletApi, Transaction } from "../../lib/api/wallet";
import BlobBackground from "../../components/svg/BlobBackground";
import DotPattern from "../../components/svg/DotPattern";

export default function HomeScreen() {
  const { user, apiKey, updateWalletBalance, showBalance, setShowBalance } =
    useAuthStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    if (!apiKey) return;
    try {
      const [walletData, txnsData] = await Promise.all([
        walletApi.getBalance(apiKey).catch((err) => {
          console.error("Failed to load wallet balance", err);
          return null;
        }),
        walletApi.getTransactions(apiKey).catch((err) => {
          console.error("Failed to load transactions", err);
          return null;
        }),
      ]);

      if (
        walletData &&
        walletData.code === 200 &&
        walletData.wallet_balance !== undefined
      ) {
        updateWalletBalance(walletData.wallet_balance);
      }

      if (txnsData !== null) {
        setTransactions(Array.isArray(txnsData) ? txnsData.slice(0, 4) : []);
      }
    } catch (e) {
      console.error("Dashboard refresh error: ", e);
    }
  }, [apiKey, updateWalletBalance]);

  useEffect(() => {
    let isMounted = true;
    let intervalId: NodeJS.Timeout;

    if (apiKey) {
      setIsLoading(true);
      fetchDashboardData().finally(() => {
        if (isMounted) setIsLoading(false);
      });
      intervalId = setInterval(() => {
        fetchDashboardData();
      }, 60000);
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [apiKey, fetchDashboardData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  }, [fetchDashboardData]);

  const userName = user?.name || user?.username || "Guest";
  const firstName = userName.split(" ")[0];
  const walletBalance = user?.wallet
    ? Number(user.wallet).toLocaleString()
    : "0.00";

  const getLevelDetails = (level?: string) => {
    let type = "new user";
    if (level) {
      const lower = level.toLowerCase();
      if (lower.includes("premium") || level.trim() === "5") type = "premium";
      else if (lower.includes("partner") || level.trim() === "4")
        type = "partner";
      else if (lower.includes("reseller") || level.trim() === "3")
        type = "reseller";
      else if (lower.includes("basic") || level.trim() === "2") type = "basic";
    }

    switch (type) {
      case "premium":
        return {
          name: "Premium",
          icon: Crown,
          isMaxLevel: true,
          upgradeIcon: CheckCircle2,
          upgradeTitle: "You're at the Top! 🎉",
          upgradeSubtitle: "Enjoy the best rates & 0% fees on everything",
        };
      case "partner":
        return {
          name: "Partner",
          icon: Star,
          isMaxLevel: false,
          upgradeIcon: Crown,
          upgradeTitle: "Go Premium",
          upgradeSubtitle: "0% fees on all transfers & priority support",
        };
      case "reseller":
        return {
          name: "Reseller",
          icon: Medal,
          isMaxLevel: false,
          upgradeIcon: Star,
          upgradeTitle: "Become a Partner",
          upgradeSubtitle: "Higher earning caps & exclusive API access",
        };
      case "basic":
        return {
          name: "Basic",
          icon: Shield,
          isMaxLevel: false,
          upgradeIcon: Medal,
          upgradeTitle: "Upgrade to Reseller",
          upgradeSubtitle: "Earn commissions & unlock bulk discounts",
        };
      default:
        return {
          name: "Standard",
          icon: UserIcon,
          isMaxLevel: false,
          upgradeIcon: Shield,
          upgradeTitle: "Upgrade to Basic",
          upgradeSubtitle: "Lower fees & faster transactions",
        };
    }
  };

  const levelDetails = getLevelDetails(user?.user_level);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <BlobBackground variant="dashboard" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#000000"
            colors={["#000000"]}
          />
        }
      >
        {/* Modern Minimalist Header */}
        <View style={styles.header}>
          <View style={styles.greetingHeaderRow}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {firstName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={[styles.levelBadge]}>
              <levelDetails.icon size={12} color="#0A0A0A" />
              <Text style={styles.levelBadgeText}>{levelDetails.name}</Text>
            </View>
          </View>

          <View style={styles.balanceContainer}>
            <View style={styles.balanceLabelRow}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <TouchableOpacity
                onPress={() => setShowBalance(!showBalance)}
                style={styles.eyeBtn}
                accessibilityLabel={
                  showBalance ? "Hide balance" : "Show balance"
                }
              >
                {showBalance ? (
                  <Eye size={18} color="#6B7280" />
                ) : (
                  <EyeOff size={18} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.balanceAmount}>
              <Text style={styles.currencySymbol}>₦</Text>
              {showBalance ? walletBalance : "••••••"}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity
              style={styles.primaryActionBtn}
              onPress={() => router.push("/(features)/fund-wallet")}
            >
              <Plus size={20} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.primaryActionText}>Fund Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryActionBtn}
              onPress={() => router.push("/(tabs)/transactions")}
            >
              <History size={20} color="#0A0A0A" strokeWidth={2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryActionBtn}
              onPress={() => router.push("/(features)/help-support")}
            >
              <MessageCircle size={20} color="#0A0A0A" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic Upgrade Banner */}
        <TouchableOpacity
          style={[
            styles.upgradeBanner,
            levelDetails.isMaxLevel && styles.upgradeBannerMax,
          ]}
          activeOpacity={0.9}
          onPress={() =>
            !levelDetails.isMaxLevel && router.push("/(features)/upgrade")
          }
        >
          <View
            style={[
              styles.upgradeIconBox,
              levelDetails.isMaxLevel && styles.upgradeIconBoxMax,
            ]}
          >
            <levelDetails.upgradeIcon size={20} color="#FFFFFF" />
          </View>
          <View style={styles.upgradeTextContainer}>
            <Text style={styles.upgradeTitle}>{levelDetails.upgradeTitle}</Text>
            <Text style={styles.upgradeSubtitle}>
              {levelDetails.upgradeSubtitle}
            </Text>
          </View>
          {!levelDetails.isMaxLevel && <ArrowRight color="#A1A1AA" size={20} />}
        </TouchableOpacity>

        {/* Services - Grid format but much cleaner */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Essentials</Text>
          </View>
          <View style={styles.servicesGrid}>
            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() => router.push("/(features)/airtime")}
            >
              <View style={styles.serviceIconContainer}>
                <PhoneCall size={24} color="#0A0A0A" strokeWidth={1.5} />
              </View>
              <Text style={styles.serviceText}>Airtime</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() => router.push("/(features)/buy-data")}
            >
              <View style={styles.serviceIconContainer}>
                <Wifi size={24} color="#0A0A0A" strokeWidth={1.5} />
              </View>
              <Text style={styles.serviceText}>Data</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() => router.push("/(features)/power")}
            >
              <View style={styles.serviceIconContainer}>
                <Zap size={24} color="#0A0A0A" strokeWidth={1.5} />
              </View>
              <Text style={styles.serviceText}>Power</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() => router.push("/(features)/cable")}
            >
              <View style={styles.serviceIconContainer}>
                <Tv size={24} color="#0A0A0A" strokeWidth={1.5} />
              </View>
              <Text style={styles.serviceText}>Cable</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.servicesGrid, { marginTop: 20 }]}>
            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() => router.push("/(features)/exam")}
            >
              <View style={styles.serviceIconContainer}>
                <GraduationCap size={24} color="#0A0A0A" strokeWidth={1.5} />
              </View>
              <Text style={styles.serviceText}>Exam</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() => router.push("/(features)/betting")}
            >
              <View style={styles.serviceIconContainer}>
                <Dices size={24} color="#0A0A0A" strokeWidth={1.5} />
              </View>
              <Text style={styles.serviceText}>Betting</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() => router.push("/(features)/more")}
            >
              <View style={styles.serviceIconContainer}>
                <LayoutGrid size={24} color="#0A0A0A" strokeWidth={1.5} />
              </View>
              <Text style={styles.serviceText}>More</Text>
            </TouchableOpacity>

            <View style={styles.serviceCard} />
          </View>
        </View>

        {/* Transactions - Clean List */}
        <View style={[styles.sectionContainer, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/transactions")}
            >
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsContainer}>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color="#0A0A0A"
                style={{ padding: 20 }}
              />
            ) : transactions.length > 0 ? (
              transactions.map((tx, index) => {
                const s = (tx.service || "").toLowerCase();
                const d = (tx.description || "").toLowerCase();
                const isCredit =
                  d.includes("wallet funding") || d.includes("credit");

                let IconComp: any = isCredit ? ArrowDownLeft : ArrowUpRight;
                if (s.includes("airtime")) IconComp = PhoneCall;
                else if (s.includes("data")) IconComp = Wifi;

                return (
                  <View
                    key={index}
                    style={[
                      styles.transactionItem,
                      index === transactions.length - 1 &&
                        styles.transactionItemLast,
                    ]}
                  >
                    <View style={styles.txIconBox}>
                      <IconComp
                        size={18}
                        color={isCredit ? "#10B981" : "#0A0A0A"}
                        strokeWidth={2}
                      />
                    </View>
                    <View style={styles.txDetails}>
                      <Text style={styles.txService} numberOfLines={1}>
                        {tx.description || tx.service || "Transaction"}
                      </Text>
                      <Text style={styles.txDate}>
                        {tx.date?.split(" ")[0] || tx.date}
                      </Text>
                    </View>
                    <Text
                      style={[styles.txAmount, isCredit && styles.txSuccess]}
                    >
                      {isCredit ? "+" : "-"}₦
                      {Number(tx.amount || 0).toLocaleString()}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.emptyText}>No recent activity</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  greetingHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0A0A0A",
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 6,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0A0A0A",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  balanceContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  balanceLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8,
  },
  eyeBtn: {
    padding: 6,
    borderRadius: 8,
  },
  balanceLabel: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  balanceAmount: {
    color: "#0A0A0A",
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: -1.5,
    ...Platform.select({ ios: { fontFamily: "System" } }), // Use system font natively for crispness
  },
  currencySymbol: {
    fontSize: 32,
    color: "#9CA3AF",
    fontWeight: "500",
    marginRight: 4,
  },
  quickActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  primaryActionBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    borderRadius: 24,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    gap: 8,
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryActionBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  upgradeBanner: {
    marginHorizontal: 24,
    marginTop: 8,
    backgroundColor: "#0A0A0A",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  upgradeBannerMax: {
    backgroundColor: "#052E16",
  },
  upgradeIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  upgradeIconBoxMax: {
    backgroundColor: "#10B981",
  },
  upgradeTextContainer: {
    flex: 1,
  },
  upgradeTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  upgradeSubtitle: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 2,
  },
  sectionContainer: {
    marginTop: 36,
    paddingHorizontal: 24,
  },
  lastSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0A0A0A",
    letterSpacing: -0.2,
  },
  seeAllText: {
    color: "#6B7280",
    fontWeight: "500",
    fontSize: 14,
  },
  servicesGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceCard: {
    alignItems: "center",
    width: "23%",
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
  },
  serviceText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#4B5563",
  },
  transactionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
    padding: 32,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  transactionItemLast: {
    borderBottomWidth: 0,
  },
  txIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  txDetails: {
    flex: 1,
  },
  txService: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0A0A0A",
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  txDate: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  txAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0A0A0A",
  },
  txSuccess: {
    color: "#10B981",
  },
});
