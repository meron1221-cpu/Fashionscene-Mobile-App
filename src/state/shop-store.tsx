import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "../data/types";

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};
export type DemoUser = { fullName: string; email: string; phone: string };

type ShopContextValue = {
  favorites: string[];
  cart: CartItem[];
  saleAlerts: boolean;
  lightTheme: boolean;
  user: DemoUser | null;
  toggleFavorite: (productId: string) => void;
  addToCart: (product: Product, size: string, color: string) => void;
  changeQuantity: (productId: string, size: string, amount: number) => void;
  setSaleAlerts: (value: boolean) => void;
  setLightTheme: (value: boolean) => void;
  loginDemo: () => void;
  logout: () => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);
const demoUser: DemoUser = {
  fullName: "Thando Mokoena",
  email: "thando@example.com",
  phone: "+27 71 234 5678",
};

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [saleAlerts, setSaleAlerts] = useState(true);
  const [lightTheme, setLightTheme] = useState(true);
  const [user, setUser] = useState<DemoUser | null>(demoUser);

  useEffect(() => {
    AsyncStorage.multiGet([
      "fashion-favorites",
      "fashion-cart",
      "fashion-sale-alerts",
      "fashion-light-theme",
      "fashion-user",
    ]).then((entries) => {
      const values = Object.fromEntries(entries);
      if (values["fashion-favorites"])
        setFavorites(JSON.parse(values["fashion-favorites"]));
      if (values["fashion-cart"]) setCart(JSON.parse(values["fashion-cart"]));
      if (values["fashion-sale-alerts"])
        setSaleAlerts(values["fashion-sale-alerts"] === "true");
      if (values["fashion-light-theme"])
        setLightTheme(values["fashion-light-theme"] === "true");
      if (values["fashion-user"]) setUser(JSON.parse(values["fashion-user"]));
    });
  }, []);

  useEffect(() => {
    void AsyncStorage.setItem("fashion-favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    void AsyncStorage.setItem("fashion-cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    void AsyncStorage.setItem("fashion-sale-alerts", String(saleAlerts));
  }, [saleAlerts]);
  useEffect(() => {
    void AsyncStorage.setItem("fashion-light-theme", String(lightTheme));
  }, [lightTheme]);
  useEffect(() => {
    void AsyncStorage.setItem("fashion-user", JSON.stringify(user));
  }, [user]);

  const value = useMemo<ShopContextValue>(
    () => ({
      favorites,
      cart,
      saleAlerts,
      lightTheme,
      user,
      toggleFavorite: (productId) =>
        setFavorites((current) =>
          current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        ),
      addToCart: (product, size, color) =>
        setCart((current) => {
          const existing = current.find(
            (item) =>
              item.product.id === product.id &&
              item.size === size &&
              item.color === color,
          );
          if (existing)
            return current.map((item) =>
              item === existing
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          return [...current, { product, size, color, quantity: 1 }];
        }),
      changeQuantity: (productId, size, amount) =>
        setCart((current) =>
          current
            .map((item) =>
              item.product.id === productId && item.size === size
                ? { ...item, quantity: Math.max(0, item.quantity + amount) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        ),
      setSaleAlerts,
      setLightTheme,
      loginDemo: () => setUser(demoUser),
      logout: () => setUser(null),
    }),
    [favorites, cart, saleAlerts, lightTheme, user],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside ShopProvider");
  return context;
}
