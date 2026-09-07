import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import catalog from '../../data/catalog.json';
import { formatPrice, promoImages } from '../../components/shop-ui';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = useMemo(() => catalog.products.find((item) => item.id === id) ?? catalog.products[0], [id]);
  const [size, setSize] = useState(product.sizes[0]);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Image source={promoImages[product.image as keyof typeof promoImages]} style={styles.heroImage} resizeMode="cover" />
      <Text style={styles.category}>{product.category.toUpperCase()} · {product.stock} IN STOCK</Text>
      <Text style={styles.title}>{product.name}</Text>
      <View style={styles.rating}><Text style={styles.stars}>★★★★★</Text><Text style={styles.ratingText}>{product.rating} ({product.reviews} reviews)</Text></View>
      <View style={styles.priceRow}><Text style={styles.price}>{formatPrice(product.salePrice ?? product.price)}</Text>{product.salePrice && <Text style={styles.oldPrice}>{formatPrice(product.price)}</Text>}</View>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.label}>Size</Text>
      <View style={styles.options}>{product.sizes.map((item) => <Pressable key={item} onPress={() => setSize(item)} style={[styles.option, item === size && styles.optionActive]}><Text style={[styles.optionText, item === size && styles.optionTextActive]}>{item}</Text></Pressable>)}</View>
      <Text style={styles.label}>Color</Text>
      <View style={styles.options}>{product.colors.map((item, index) => <View key={item} style={[styles.color, { backgroundColor: index === 0 ? '#ffa200' : index === 1 ? '#1f2937' : '#e7d2b1' }]} />)}</View>
      <Pressable style={styles.addButton} onPress={() => router.push('/(tabs)/cart' as any)}><Text style={styles.addText}>Add to cart · {size}</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#fff' }, content: { paddingBottom: 30 }, heroImage: { width: '100%', height: 330, backgroundColor: '#f6f6f6' }, category: { marginTop: 18, paddingHorizontal: 18, color: '#e88f00', fontSize: 11, fontWeight: '900', letterSpacing: 1.2 }, title: { marginTop: 7, paddingHorizontal: 18, fontSize: 27, fontWeight: '900', color: '#171717' }, rating: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10, paddingHorizontal: 18 }, stars: { color: '#ffa200', fontSize: 17 }, ratingText: { color: '#737373', fontSize: 13 }, priceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12, paddingHorizontal: 18 }, price: { color: '#e88f00', fontSize: 25, fontWeight: '900' }, oldPrice: { color: '#999', textDecorationLine: 'line-through' }, description: { paddingHorizontal: 18, marginTop: 13, color: '#737373', lineHeight: 21, fontSize: 14 }, label: { paddingHorizontal: 18, marginTop: 22, fontWeight: '900', color: '#171717' }, options: { flexDirection: 'row', gap: 9, paddingHorizontal: 18, marginTop: 10 }, option: { minWidth: 44, alignItems: 'center', borderWidth: 1, borderColor: '#e2e2e2', paddingVertical: 11, paddingHorizontal: 13, borderRadius: 12 }, optionActive: { borderColor: '#ffa200', backgroundColor: '#fff3dc' }, optionText: { color: '#4d4d4d', fontWeight: '700' }, optionTextActive: { color: '#b96c00' }, color: { width: 32, height: 32, borderRadius: 16, borderWidth: 3, borderColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 }, addButton: { marginHorizontal: 18, marginTop: 28, backgroundColor: '#ffa200', paddingVertical: 16, alignItems: 'center', borderRadius: 18 }, addText: { color: '#fff', fontWeight: '900', fontSize: 16 } });
