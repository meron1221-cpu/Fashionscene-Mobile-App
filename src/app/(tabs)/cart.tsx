import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import catalog from '../../data/catalog.json';
import { formatPrice, promoImages } from '../../components/shop-ui';

export default function CartScreen() {
  const items = catalog.products.slice(0, 3);
  const subtotal = items.reduce((sum, item) => sum + (item.salePrice ?? item.price), 0);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} showsVerticalScrollIndicator>
      <View style={styles.headerRow}><Text style={styles.title}>Your cart</Text><Text style={styles.edit}>Edit</Text></View>
      {items.map((item) => (
        <View key={item.id} style={styles.cartRow}>
          <Image source={promoImages[item.image as keyof typeof promoImages]} style={styles.thumb} />
          <View style={styles.info}><Text style={styles.name}>{item.name}</Text><Text style={styles.meta}>M / {item.colors[0]}</Text><Text style={styles.price}>{formatPrice(item.salePrice ?? item.price)}</Text></View>
          <View style={styles.quantity}><Text style={styles.quantityButton}>−</Text><Text style={styles.quantityText}>1</Text><Text style={styles.quantityButton}>＋</Text></View>
        </View>
      ))}
      <View style={styles.summary}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text><Text style={styles.summaryLabel}>Shipping</Text><Text style={styles.summaryValue}>$5.99</Text><View style={styles.totalRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>{formatPrice(subtotal + 5.99)}</Text></View></View>
      <Pressable style={styles.checkout}><Text style={styles.checkoutText}>Checkout</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, backgroundColor: '#fff' }, content: { padding: 16, paddingBottom: 32 }, headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, title: { fontSize: 27, fontWeight: '900', color: '#171717' }, edit: { color: '#e88f00', fontWeight: '800' }, cartRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: '#eeeeee', borderRadius: 18, marginBottom: 11, backgroundColor: '#fff' }, thumb: { width: 76, height: 82, borderRadius: 12 }, info: { flex: 1, paddingHorizontal: 12 }, name: { fontSize: 14, fontWeight: '800', color: '#171717' }, meta: { marginTop: 5, color: '#8b8b8b', fontSize: 12 }, price: { marginTop: 7, color: '#e88f00', fontWeight: '900' }, quantity: { flexDirection: 'row', alignItems: 'center', gap: 8 }, quantityButton: { color: '#171717', fontSize: 17 }, quantityText: { fontWeight: '800' }, summary: { marginTop: 15, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#eeeeee' }, summaryLabel: { color: '#737373', marginTop: 8 }, summaryValue: { position: 'absolute', right: 0, marginTop: 8, color: '#171717' }, totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#eeeeee' }, totalLabel: { fontSize: 17, fontWeight: '900' }, totalValue: { fontSize: 19, fontWeight: '900' }, checkout: { marginTop: 22, alignItems: 'center', backgroundColor: '#ffa200', paddingVertical: 15, borderRadius: 18 }, checkoutText: { color: '#fff', fontSize: 16, fontWeight: '900' } });
