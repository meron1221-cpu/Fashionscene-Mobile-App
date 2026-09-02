import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Mobile App</Text>
      <Text style={styles.subtitle}>
        My first React Native screen is working.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 16,
    color: "#6b7280",
  },
});
