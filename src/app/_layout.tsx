import '../../global.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product/[id]" options={{ presentation: 'card', headerShown: true, title: 'Product details' }} />
    </Stack>
  );
}
