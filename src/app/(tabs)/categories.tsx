import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CategoryChips, ProductGrid } from "../../components/shop-ui";
import catalog from "../../data/catalog.json";
export default function CategoriesScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const [selected, setSelected] = useState(
    params.category && catalog.categories.some((c) => c.id === params.category)
      ? params.category
      : "all",
  );
  const visibleProducts = useMemo(
    () =>
      selected === "all"
        ? catalog.products
        : selected === "sale"
          ? catalog.products.filter((p) => p.salePrice !== null)
          : catalog.products.filter((p) => p.category === selected),
    [selected],
  );
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator
    >
      <Text style={styles.title}>Shop by category</Text>
      <Text style={styles.subtitle}>Find your next favorite look.</Text>
      <CategoryChips
        categories={catalog.categories}
        selected={selected}
        onSelect={setSelected}
      />
      <View style={styles.resultRow}>
        <Text style={styles.resultTitle}>
          {selected === "all"
            ? "All products"
            : catalog.categories.find((c) => c.id === selected)?.label}
        </Text>
        <Text style={styles.resultCount}>{visibleProducts.length} items</Text>
      </View>
      <ProductGrid products={visibleProducts as any} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, paddingBottom: 28 },
  title: { fontSize: 27, fontWeight: "900", color: "#171717" },
  subtitle: { marginTop: 5, fontSize: 14, color: "#737373" },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  resultTitle: { fontSize: 18, fontWeight: "900", color: "#171717" },
  resultCount: { color: "#8a8a8a", fontSize: 13, fontWeight: "700" },
});
