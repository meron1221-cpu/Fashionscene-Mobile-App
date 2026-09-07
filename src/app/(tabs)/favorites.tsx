import { ScrollView, StyleSheet, Text, View } from 'react-native';
import catalog from '../../data/catalog.json';
import { ProductGrid } from '../../components/shop-ui';

export default function FavoritesScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>Your saved pieces, ready when you are.</Text>
      <ProductGrid products={catalog.products.slice(1, 5)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#fff' }, content: { padding: 16, paddingBottom: 28 }, title: { fontSize: 27, fontWeight: '900', color: '#171717' }, subtitle: { marginTop: 5, marginBottom: 18, color: '#737373', fontSize: 14 } });
