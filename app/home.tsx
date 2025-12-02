import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/firebase/useAuth";
import { getUser } from "@/firebase/controller";
import { userSignOut } from "@/firebase/AuthHelpers";

export default function Home() {
  const router = useRouter();
  const user = useAuth();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // STEP 1: Check if user is logged in
  useEffect(() => {
    // still loading auth state
    if (user === undefined) return;

    // if user NOT logged in → send to login
    if (!user) {
      router.replace("/");
      return;
    }

    // Fetch user name from Firestore
    getUser(user.uid).then((data) => {
      setUserName(data?.name || "");
      setLoading(false);
    });
  }, [user]);

  // If loading → show black screen
  if (loading) {
    return <View style={{ flex: 1, backgroundColor: "black" }} />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
      }}
    >
      {/* Logout button in top-right */}
      <TouchableOpacity
        style={{ position: "absolute", top: 20, right: 20 }}
        onPress={async () => {
          await userSignOut();
          router.replace("/");
        }}
      >
        <Text style={{ fontSize: 18 }}>↩</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 50, marginBottom: 10 }}>XO</Text>
      <Text style={{ fontSize: 28, fontWeight: "600", marginBottom: 10 }}>
        Hello, {userName}!
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 40 }}>
        Ready To Play Tic Tac Toe?
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "black",
          paddingHorizontal: 40,
          paddingVertical: 15,
          borderRadius: 12,
        }}
        onPress={() => router.push("/player-two")}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Let's Play</Text>
      </TouchableOpacity>
    </View>
  );
}

