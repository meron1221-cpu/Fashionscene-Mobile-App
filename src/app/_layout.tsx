import { Stack } from "expo-router";
import "../../global.css";
import { ShopProvider } from "../state/shop-store";

export default function RootLayout() {
  return (
    <ShopProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[id]"
          options={{ title: "Product details" }}
        />
      </Stack>
    </ShopProvider>
  );
}
