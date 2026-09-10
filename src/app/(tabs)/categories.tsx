import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { CategoryChips, ProductGrid } from "../../components/shop-ui";
import catalog from "../../data/catalog.json";

type CategoryId =
  "all" | "women" | "men" | "kids" | "shoes" | "accessories" | "sale";

function isCategoryId(value: string | undefined): value is CategoryId {
  return (
    value === "all" ||
    value === "women" ||
    value === "men" ||
    value === "kids" ||
    value === "shoes" ||
    value === "accessories" ||
    value === "sale"
  );
}

export default function CategoriesScreen() {
  const params = useLocalSearchParams<{
    category?: string | string[];
  }>();

  const initialCategory =
    typeof params.category === "string" && isCategoryId(params.category)
      ? params.category
      : "all";

  const [selected, setSelected] = useState<CategoryId>(initialCategory);

  const visibleProducts = useMemo(() => {
    if (selected === "all") {
      return catalog.products;
    }

    if (selected === "sale") {
      return catalog.products.filter((product) => product.salePrice !== null);
    }

    return catalog.products.filter((product) => product.category === selected);
  }, [selected]);

  const selectedLabel =
    selected === "all"
      ? "All products"
      : selected === "sale"
        ? "Sale"
        : (catalog.categories.find((category) => category.id === selected)
            ?.label ?? "Products");

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Shop by category</Text>

      <Text style={styles.subtitle}>Find your next favorite look.</Text>

      <CategoryChips
        categories={catalog.categories}
        selected={selected}
        onSelect={(categoryId) => {
          if (isCategoryId(categoryId)) {
            setSelected(categoryId);
          }
        }}
      />

      <View style={styles.resultRow}>
        <Text style={styles.resultTitle}>{selectedLabel}</Text>

        <Text style={styles.resultCount}>{visibleProducts.length} items</Text>
      </View>

      <ProductGrid products={visibleProducts} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FBF8F3",
  },

  content: {
    padding: 16,
    paddingBottom: 36,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#27221E",
  },

  subtitle: {
    marginTop: 6,
    color: "#8A8179",
    fontSize: 14,
  },

  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 14,
  },

  resultTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#27221E",
  },

  resultCount: {
    color: "#8A8179",
    fontSize: 13,
    fontWeight: "700",
  },
});
