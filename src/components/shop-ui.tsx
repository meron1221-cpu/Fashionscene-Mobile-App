import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export const promoImages = {
  'promo-summer-sale': require('../../assets/images/promo-summer-sale.jpg'),
  'promo-new-arrivals': require('../../assets/images/promo-new-arrivals.jpg'),
  'promo-accessories': require('../../assets/images/promo-accessories.jpg'),
} as const;

export const logoImage = require('../../assets/images/fashion-scene-logo.png');

export type Product = {
  id: string;
  name: string;
  category: string;
  sizes: string[];
  colors: string[];
  price: number;
  salePrice: number | null;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  description: string;
};

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export function BrandHeader({ compact = false }: { compact?: boolean }) {
  return (
    <View style={[styles.brandHeader, compact && styles.brandHeaderCompact]}>
      <Image source={logoImage} style={compact ? styles.logoSmall : styles.logo} resizeMode="contain" />
      {!compact && <Text style={styles.brandWordmark}>FASHION SCENE</Text>}
    </View>
  );
}

export function CategoryChips({
  categories,
  selected,
  onSelect,
}: {
  categories: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
      {categories.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => onSelect(category.id)}
          style={[styles.chip, selected === category.id && styles.chipActive]}
        >
          <Text style={[styles.chipText, selected === category.id && styles.chipTextActive]}>
            {category.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={{ pathname: '/product/[id]', params: { id: product.id } } as any} asChild>
      <Pressable style={styles.productCard}>
        <View style={styles.productImageWrap}>
          <Image source={promoImages[product.image as keyof typeof promoImages]} style={styles.productImage} resizeMode="cover" />
          <Text style={styles.favoriteDot}>♡</Text>
          {product.salePrice && <Text style={styles.salePill}>SALE</Text>}
        </View>
        <Text numberOfLines={1} style={styles.productName}>{product.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.salePrice}>{formatPrice(product.salePrice ?? product.price)}</Text>
          {product.salePrice && <Text style={styles.oldPrice}>{formatPrice(product.price)}</Text>}
        </View>
      </Pressable>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <View style={styles.grid}>
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </View>
  );
}

export const styles = StyleSheet.create({
  brandHeader: { alignItems: 'center', paddingTop: 12, paddingBottom: 14 },
  brandHeaderCompact: { paddingTop: 4, paddingBottom: 4 },
  logo: { width: 86, height: 62 },
  logoSmall: { width: 48, height: 38 },
  brandWordmark: { marginTop: -2, fontSize: 11, letterSpacing: 3.2, fontWeight: '700', color: '#171717' },
  chipsRow: { gap: 8, paddingVertical: 12 },
  chip: { borderRadius: 24, borderWidth: 1, borderColor: '#e7e7e7', paddingHorizontal: 16, paddingVertical: 9, backgroundColor: '#fff' },
  chipActive: { backgroundColor: '#ffa200', borderColor: '#ffa200' },
  chipText: { color: '#6b6b6b', fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  productCard: { width: '48.2%', marginBottom: 12 },
  productImageWrap: { height: 184, borderRadius: 18, overflow: 'hidden', backgroundColor: '#f4f4f4', position: 'relative' },
  productImage: { width: '100%', height: '100%' },
  favoriteDot: { position: 'absolute', right: 10, top: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.92)', textAlign: 'center', lineHeight: 29, fontSize: 20, color: '#292929' },
  salePill: { position: 'absolute', left: 9, bottom: 9, backgroundColor: '#ffa200', color: '#fff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 7, fontSize: 10, fontWeight: '800' },
  productName: { marginTop: 9, color: '#171717', fontSize: 14, fontWeight: '700' },
  priceRow: { flexDirection: 'row', gap: 7, alignItems: 'center', marginTop: 4 },
  salePrice: { color: '#e88f00', fontSize: 14, fontWeight: '800' },
  oldPrice: { color: '#a0a0a0', textDecorationLine: 'line-through', fontSize: 12 },
});
