import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: true,
      tabBarActiveTintColor: '#ffa200',
      tabBarInactiveTintColor: '#8d8d8d',
      tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      tabBarStyle: { height: 76, paddingBottom: 14, paddingTop: 8, borderTopColor: '#eeeeee', backgroundColor: '#ffffff' },
      headerTitleStyle: { fontWeight: '800', color: '#171717' },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarLabel: 'Home', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⌂</Text> }} />
      <Tabs.Screen name="categories" options={{ title: 'Categories', tabBarLabel: 'Categories', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>▦</Text> }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites', tabBarLabel: 'Favorites', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 21 }}>♡</Text> }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart', tabBarLabel: 'Cart', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🛍</Text> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarLabel: 'Settings', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 19 }}>⚙</Text> }} />
    </Tabs>
  );
}
