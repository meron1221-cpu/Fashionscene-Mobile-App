import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ProductGrid } from "../../components/shop-ui";
import catalog from "../../data/catalog.json";
import { useShop } from "../../state/shop-store";

export default function FavoritesScreen() {
  const { favorites } = useShop();

  const favoriteProducts = catalog.products.filter((product) =>
    favorites.includes(product.id),
  );

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Favorites</Text>

      <Text style={styles.subtitle}>
        Your saved pieces, ready when you are.
      </Text>

      {favoriteProducts.length > 0 ? (
        <ProductGrid products={favoriteProducts} />
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>♡</Text>

          <Text style={styles.emptyTitle}>No favorites yet</Text>

          <Text style={styles.emptyText}>
            Tap the heart on any product to save it here.
          </Text>
        </View>
      )}
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
    marginBottom: 20,
    color: "#8A8179",
    fontSize: 14,
  },

  emptyCard: {
    marginTop: 28,
    alignItems: "center",
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 36,
    backgroundColor: "#FFFDFC",
    borderWidth: 1,
    borderColor: "#E8DED4",
  },

  emptyIcon: {
    color: "#D95F18",
    fontSize: 48,
    lineHeight: 54,
  },

  emptyTitle: {
    marginTop: 12,
    color: "#27221E",
    fontSize: 19,
    fontWeight: "900",
  },

  emptyText: {
    marginTop: 8,
    color: "#8A8179",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
});
