import { ScrollView, StyleSheet, Text } from "react-native";
import { ProductGrid } from "../../components/shop-ui";
import catalog from "../../data/catalog.json";
import { useShop } from "../../state/shop-store";
export default function FavoritesScreen() {
  const { favorites } = useShop();
  const products = catalog.products.filter((product) =>
    favorites.includes(product.id),
  );
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator
    >
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>
        Your saved pieces, ready when you are.
      </Text>
      {products.length ? (
        <ProductGrid products={products as any} />
      ) : (
        <Text style={styles.empty}>
          Tap the heart on any product to save it here.
        </Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, paddingBottom: 28 },
  title: { fontSize: 27, fontWeight: "900", color: "#171717" },
  subtitle: { marginTop: 5, marginBottom: 18, color: "#737373", fontSize: 14 },
  empty: {
    marginTop: 30,
    color: "#737373",
    textAlign: "center",
    lineHeight: 22,
  },
});
