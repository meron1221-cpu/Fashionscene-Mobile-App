import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { formatPrice, promoImages } from "../../components/shop-ui";
import { useShop } from "../../state/shop-store";
export default function CartScreen() {
  const { cart, changeQuantity } = useShop();
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.product.salePrice ?? item.product.price) * item.quantity,
    0,
  );
  const shipping = cart.length ? 5.99 : 0;
  const checkout = () =>
    Alert.alert(
      "Demo checkout",
      `Order total: ${formatPrice(subtotal + shipping)}\n\nThis is a client demonstration. No payment was processed.`,
    );
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator
    >
      <View style={styles.headerRow}>
        <Text style={styles.title}>Your cart</Text>
        <Text style={styles.edit}>
          {cart.length} item{cart.length === 1 ? "" : "s"}
        </Text>
      </View>
      {cart.length ? (
        cart.map((item) => (
          <View
            key={`${item.product.id}-${item.size}-${item.color}`}
            style={styles.cartRow}
          >
            <Image
              source={
                promoImages[item.product.image as keyof typeof promoImages]
              }
              style={styles.thumb}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.product.name}</Text>
              <Text style={styles.meta}>
                {item.size} / {item.color}
              </Text>
              <Text style={styles.price}>
                {formatPrice(item.product.salePrice ?? item.product.price)}
              </Text>
            </View>
            <View style={styles.quantity}>
              <Pressable
                onPress={() => changeQuantity(item.product.id, item.size, -1)}
              >
                <Text style={styles.quantityButton}>−</Text>
              </Pressable>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <Pressable
                onPress={() => changeQuantity(item.product.id, item.size, 1)}
              >
                <Text style={styles.quantityButton}>＋</Text>
              </Pressable>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>
          Your cart is empty. Add a product to see the checkout flow.
        </Text>
      )}
      <View style={styles.summary}>
        <View style={styles.line}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>{formatPrice(shipping)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            {formatPrice(subtotal + shipping)}
          </Text>
        </View>
      </View>
      <Pressable
        disabled={!cart.length}
        style={[styles.checkout, !cart.length && styles.disabled]}
        onPress={checkout}
      >
        <Text style={styles.checkoutText}>Checkout demo</Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, paddingBottom: 32 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 27, fontWeight: "900", color: "#171717" },
  edit: { color: "#e88f00", fontWeight: "800" },
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#eeeeee",
    borderRadius: 18,
    marginBottom: 11,
    backgroundColor: "#fff",
  },
  thumb: { width: 76, height: 82, borderRadius: 12 },
  info: { flex: 1, paddingHorizontal: 12 },
  name: { fontSize: 14, fontWeight: "800", color: "#171717" },
  meta: { marginTop: 5, color: "#8b8b8b", fontSize: 12 },
  price: { marginTop: 7, color: "#e88f00", fontWeight: "900" },
  quantity: { flexDirection: "row", alignItems: "center", gap: 8 },
  quantityButton: { color: "#171717", fontSize: 20 },
  quantityText: { fontWeight: "800" },
  empty: {
    marginTop: 32,
    textAlign: "center",
    color: "#737373",
    lineHeight: 22,
  },
  summary: {
    marginTop: 15,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
  },
  line: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  summaryLabel: { color: "#737373" },
  summaryValue: { color: "#171717" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
  },
  totalLabel: { fontSize: 17, fontWeight: "900" },
  totalValue: { fontSize: 19, fontWeight: "900" },
  checkout: {
    marginTop: 22,
    alignItems: "center",
    backgroundColor: "#ffa200",
    paddingVertical: 15,
    borderRadius: 18,
  },
  disabled: { opacity: 0.45 },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "900" },
});
