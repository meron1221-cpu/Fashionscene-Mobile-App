import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import catalog from '../../data/catalog.json';
import { CategoryChips, ProductGrid } from '../../components/shop-ui';

export default function CategoriesScreen() {
  const [selected, setSelected] = useState('all');
  const visibleProducts = useMemo(() => {
    if (selected === 'all') return catalog.products;
    if (selected === 'sale') return catalog.products.filter((product) => product.salePrice !== null);
    return catalog.products.filter((product) => product.category === selected);
  }, [selected]);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator>
      <Text style={styles.title}>Shop by category</Text>
      <Text style={styles.subtitle}>Find your next favorite look.</Text>
      <CategoryChips categories={catalog.categories} selected={selected} onSelect={setSelected} />
      <View style={styles.resultRow}>
        <Text style={styles.resultTitle}>{selected === 'all' ? 'All products' : catalog.categories.find((category) => category.id === selected)?.label}</Text>
        <Text style={styles.resultCount}>{visibleProducts.length} items</Text>
      </View>
      <ProductGrid products={visibleProducts} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 28 },
  title: { fontSize: 27, fontWeight: '900', color: '#171717' },
  subtitle: { marginTop: 5, fontSize: 14, color: '#737373' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  resultTitle: { fontSize: 18, fontWeight: '900', color: '#171717' },
  resultCount: { color: '#8a8a8a', fontSize: 13, fontWeight: '700' },
});
