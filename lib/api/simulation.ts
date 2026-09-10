export const USE_SIMULATED_API =
  __DEV__ && process.env.EXPO_PUBLIC_USE_SIMULATED_API !== "0";

export const simulateDelay = async (ms: number = 450): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
