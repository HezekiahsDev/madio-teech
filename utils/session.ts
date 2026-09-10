import AsyncStorage from "@react-native-async-storage/async-storage";

export const LAST_INACTIVE_AT_KEY = "last_inactive_at";

export async function recordLastInactiveAt(): Promise<void> {
  await AsyncStorage.setItem(LAST_INACTIVE_AT_KEY, String(Date.now()));
}

export async function getLastInactiveAt(): Promise<number | null> {
  const inactiveAtStr = await AsyncStorage.getItem(LAST_INACTIVE_AT_KEY);
  if (!inactiveAtStr) {
    return null;
  }

  const inactiveAt = Number(inactiveAtStr);
  return Number.isFinite(inactiveAt) ? inactiveAt : null;
}

export async function clearLastInactiveAt(): Promise<void> {
  await AsyncStorage.removeItem(LAST_INACTIVE_AT_KEY);
}
