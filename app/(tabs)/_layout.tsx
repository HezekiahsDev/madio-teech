import { Tabs } from 'expo-router';
import { Home, History, User } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#000000',
      tabBarInactiveTintColor: '#A1A1AA',
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        height: Platform.OS === 'ios' ? 88 : 70,
        paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        paddingTop: 12,
        backgroundColor: '#FFFFFF',
        elevation: 0, // Remove shadow on Android
        shadowOpacity: 0, // Remove shadow on iOS
      },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} strokeWidth={2} />,
          tabBarLabelStyle: { fontWeight: '600', fontSize: 11, marginTop: 4 },
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <History size={24} color={color} strokeWidth={2} />,
          tabBarLabelStyle: { fontWeight: '600', fontSize: 11, marginTop: 4 },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} strokeWidth={2} />,
          tabBarLabelStyle: { fontWeight: '600', fontSize: 11, marginTop: 4 },
        }}
      />
    </Tabs>
  );
}
