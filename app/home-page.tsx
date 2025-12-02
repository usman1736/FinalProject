import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/firebase/AuthContext"; 
import { getUser } from "@/firebase/controller";
import { userSignOut } from "@/firebase/AuthHelpers";

export default function Home() {
  const router = useRouter();
  const { userAuth, loading } = useAuth();
  const [userName, setUserName] = useState("");

  // If not logged in → send to login
  useEffect(() => {
    if (!loading && !userAuth) {
      router.replace("/");
    }
  }, [loading, userAuth]);

  // Fetch user name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      if (userAuth) {
        const userData = await getUser(userAuth.uid);
        if (userData?.name) setUserName(userData.name);
      }
    };
    fetchUserName();
  }, [userAuth]);

  // Black loading screen (required)
  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  const handleLogout = async () => {
    await userSignOut();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* Logout button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* User greeting */}
      <Text style={styles.title}>Hello, {userName}!</Text>
      <Text style={styles.subtitle}>Ready to play?</Text>

      {/* Navigate to Player 2 */}
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
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
  },
  logoutBtn: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "600",
  },
  playBtn: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  playText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});

