import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Make Fashion Scene feel like yours.</Text>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>FS</Text>
        </View>
        <View>
          <Text style={styles.profileName}>Fashion Scene guest</Text>
          <Text style={styles.profileMeta}>Sign in to sync your favorites</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preferences</Text>
        <View style={styles.row}>
          <Text style={styles.rowText}>Sale alerts</Text>
          <Switch
            value={true}
            trackColor={{ false: "#ddd", true: "#ffd27a" }}
            thumbColor="#ffa200"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.rowText}>Use light theme</Text>
          <Switch
            value={true}
            trackColor={{ false: "#ddd", true: "#ffd27a" }}
            thumbColor="#ffa200"
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>About</Text>
        <Text style={styles.about}>
          Fashion Scene is a local-data shopping prototype in south africa.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 27, fontWeight: "900", color: "#171717" },
  subtitle: { marginTop: 5, color: "#737373" },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#fff3dc",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#ffa200",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { color: "#fff", fontWeight: "900", fontSize: 18 },
  profileName: { fontWeight: "900", fontSize: 15 },
  profileMeta: { marginTop: 4, color: "#8b6a39", fontSize: 12 },
  card: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  cardTitle: { fontSize: 16, fontWeight: "900", marginBottom: 6 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  rowText: { fontSize: 14, fontWeight: "700" },
  about: { color: "#737373", lineHeight: 20, marginTop: 8 },
});
