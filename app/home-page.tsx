import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { getUser } from "@/firebase/controller";
import { userSignOut } from "@/firebase/AuthHelpers";

export default function Home() {
  const router = useRouter();
  const { userAuth, loading } = useAuth();
  const [userName, setUserName] = useState("");

  // Redirect to login if no user
  useEffect(() => {
    if (!loading && !userAuth) {
      router.replace("/");
    }
  }, [loading, userAuth]);

  // Fetch username
  useEffect(() => {
    const fetchName = async () => {
      if (userAuth) {
        const data = await getUser(userAuth.uid);
        if (data?.name) setUserName(data.name);
      }
    };
    fetchName();
  }, [userAuth]);

  // Black loading screen
  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  // Logout
  const handleLogout = async () => {
    await userSignOut();
    router.replace("/player-two");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Hello, {userName}!</Text>
      <Text style={styles.subtitle}>Ready to play Tic Tac Toe?</Text>

      <TouchableOpacity
        style={styles.playBtn}
        onPress={() => router.push("/player-two")}
      >
        <Text style={styles.playText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 40 },
  logoutBtn: { position: "absolute", top: 50, right: 20, padding: 10 },
  logoutText: { fontSize: 18, fontWeight: "700" },
  playBtn: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  playText: { color: "white", fontSize: 20, fontWeight: "700" },
});
