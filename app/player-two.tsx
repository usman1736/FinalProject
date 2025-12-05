import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function PlayerTwo() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>

      {/* Back arrow → go to HOME */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/home")}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Enter{"\n"}Player Two’s{"\n"}Name</Text>
      <Text style={styles.subtitle}>This name will appear{"\n"}during the game.</Text>

      {/* Input field (UI only) */}
      <TextInput
        style={styles.input}
        placeholder="Player 2 Name..."
        placeholderTextColor="#9CA3AF"
      />

      {/* Continue → go to GAME */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/game")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
  },

  backArrow: {
    fontSize: 28,
    fontWeight: "600",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 40,
    color: "#6B7280",
  },

  input: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 30,
  },

  button: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  }
});
