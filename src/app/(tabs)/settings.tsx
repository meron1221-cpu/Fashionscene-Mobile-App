import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useShop } from "../../state/shop-store";
export default function SettingsScreen() {
  const {
    saleAlerts,
    lightTheme,
    setSaleAlerts,
    setLightTheme,
    user,
    loginDemo,
    logout,
  } = useShop();
  const background = lightTheme ? "#fff" : "#171717";
  const card = lightTheme ? "#fff" : "#242424";
  const foreground = lightTheme ? "#171717" : "#fff";
  const muted = lightTheme ? "#737373" : "#b7b7b7";
  return (
    <ScrollView
      style={[styles.page, { backgroundColor: background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: foreground }]}>Settings</Text>
      <Text style={[styles.subtitle, { color: muted }]}>
        Make Fashion Scene feel like yours.
      </Text>
      <View
        style={[
          styles.profile,
          { backgroundColor: lightTheme ? "#fff3dc" : "#322a1f" },
        ]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user
              ? user.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
              : "GS"}
          </Text>
        </View>
        {user ? (
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: foreground }]}>
              {user.fullName}
            </Text>
            <Text style={[styles.profileMeta, { color: muted }]}>
              {user.email}
            </Text>
            <Text style={[styles.profileMeta, { color: muted }]}>
              {user.phone}
            </Text>
          </View>
        ) : (
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: foreground }]}>
              Guest shopper
            </Text>
            <Text style={[styles.profileMeta, { color: muted }]}>
              Demo login is ready for the client preview
            </Text>
          </View>
        )}
      </View>
      <View
        style={[
          styles.card,
          {
            backgroundColor: card,
            borderColor: lightTheme ? "#eeeeee" : "#3a3a3a",
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: foreground }]}>
          Preferences
        </Text>
        <View
          style={[
            styles.row,
            { borderTopColor: lightTheme ? "#f0f0f0" : "#3a3a3a" },
          ]}
        >
          <Text style={[styles.rowText, { color: foreground }]}>
            Sale alerts
          </Text>
          <Switch
            value={saleAlerts}
            onValueChange={setSaleAlerts}
            trackColor={{ false: "#777", true: "#ffd27a" }}
            thumbColor="#ffa200"
          />
        </View>
        <View
          style={[
            styles.row,
            { borderTopColor: lightTheme ? "#f0f0f0" : "#3a3a3a" },
          ]}
        >
          <Text style={[styles.rowText, { color: foreground }]}>
            Use light theme
          </Text>
          <Switch
            value={lightTheme}
            onValueChange={setLightTheme}
            trackColor={{ false: "#777", true: "#ffd27a" }}
            thumbColor="#ffa200"
          />
        </View>
      </View>
      <View
        style={[
          styles.card,
          {
            backgroundColor: card,
            borderColor: lightTheme ? "#eeeeee" : "#3a3a3a",
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: foreground }]}>About</Text>
        <Text style={[styles.about, { color: muted }]}>
          Fashion Scene is a local-data shopping prototype in South Africa.
        </Text>
      </View>
      <Pressable style={styles.logout} onPress={user ? logout : loginDemo}>
        <Text style={styles.logoutText}>
          {user ? "Log out" : "Log in demo account"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 27, fontWeight: "900" },
  subtitle: { marginTop: 5 },
  profile: {
    alignItems: "center",
    marginTop: 24,
    padding: 20,
    borderRadius: 18,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#ffa200",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontWeight: "900", fontSize: 24 },
  profileInfo: { alignItems: "center", marginTop: 12 },
  profileName: { fontWeight: "900", fontSize: 16 },
  profileMeta: { marginTop: 4, fontSize: 12 },
  card: { marginTop: 18, padding: 16, borderRadius: 18, borderWidth: 1 },
  cardTitle: { fontSize: 16, fontWeight: "900", marginBottom: 6 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  rowText: { fontSize: 14, fontWeight: "700" },
  about: { lineHeight: 20, marginTop: 8 },
  logout: {
    marginTop: 22,
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#171717",
  },
  logoutText: { color: "#fff", fontWeight: "900", fontSize: 15 },
});
