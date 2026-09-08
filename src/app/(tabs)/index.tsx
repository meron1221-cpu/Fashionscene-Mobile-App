import { Link } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  BrandHeader,
  CategoryChips,
  ProductGrid,
  promoImages,
} from "../../components/shop-ui";
import catalog from "../../data/catalog.json";

const width = Dimensions.get("window").width;
export default function HomeScreen() {
  const [slide, setSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const carouselRef = useRef<ScrollView>(null);
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (slide + 1) % catalog.promos.length;
      setSlide(next);
      carouselRef.current?.scrollTo({
        x: next * Math.max(width - 32, 280),
        animated: true,
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [slide]);
  const visibleProducts = useMemo(() => {
    if (selectedCategory === "all") return catalog.products.slice(0, 6);
    if (selectedCategory === "sale")
      return catalog.products.filter((p) => p.salePrice !== null);
    return catalog.products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator
    >
      <BrandHeader />
      <ScrollView
        ref={carouselRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {catalog.promos.map((promo) => (
          <View
            key={promo.id}
            style={[styles.hero, { width: Math.max(width - 32, 280) }]}
          >
            <Image
              source={promoImages[promo.image as keyof typeof promoImages]}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroShade} />
            <View style={styles.heroCopy}>
              <Text style={styles.heroEyebrow}>{promo.eyebrow}</Text>
              <Text style={styles.heroTitle}>{promo.title}</Text>
              <Text style={styles.heroDescription}>{promo.description}</Text>
              <Link
                href={
                  {
                    pathname: "/categories",
                    params: {
                      category: promo.id === "summer-sale" ? "sale" : "all",
                    },
                  } as any
                }
                asChild
              >
                <Pressable style={styles.heroButton}>
                  <Text style={styles.heroButtonText}>{promo.cta}</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {catalog.promos.map((promo, index) => (
          <View
            key={promo.id}
            style={[styles.dot, slide === index && styles.dotActive]}
          />
        ))}
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Shop by category</Text>
        <Link href="/categories" asChild>
          <Pressable>
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        </Link>
      </View>
      <CategoryChips
        categories={catalog.categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === "all"
            ? "Featured · OTA Test"
            : `${catalog.categories.find((c) => c.id === selectedCategory)?.label} picks`}
        </Text>
        <Text style={styles.resultCount}>{visibleProducts.length} items</Text>
      </View>
      <ProductGrid products={visibleProducts as any} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  carousel: { gap: 12 },
  hero: {
    height: 220,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#f5e4ce",
  },
  heroImage: { width: "100%", height: "100%" },
  heroShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.13)",
  },
  heroCopy: { position: "absolute", left: 20, top: 24, width: "54%" },
  heroEyebrow: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  heroTitle: {
    marginTop: 9,
    color: "#fff",
    fontSize: 31,
    lineHeight: 34,
    fontWeight: "900",
  },
  heroDescription: {
    marginTop: 7,
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  heroButton: {
    marginTop: 15,
    alignSelf: "flex-start",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffa200",
  },
  heroButtonText: { color: "#fff", fontSize: 13, fontWeight: "800" },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 9,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#d4d4d4" },
  dotActive: { width: 18, backgroundColor: "#ffa200" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  sectionTitle: { color: "#171717", fontSize: 19, fontWeight: "900" },
  viewAll: { color: "#e88f00", fontWeight: "800", fontSize: 13 },
  resultCount: { color: "#8a8a8a", fontSize: 13, fontWeight: "700" },
});
