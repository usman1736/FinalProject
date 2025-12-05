import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ResultScreen() {
  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>User Wins</Text>
      <Text style={styles.subtitle}>Great Match!</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Return Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Rematch</Text>
        </TouchableOpacity>
      </View>

      {/* Scoreboard */}
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreTitle}>Scoreboard</Text>

        <Text style={styles.scoreText}>Player 1: 0</Text>
        <Text style={styles.scoreText}>Player 2: 0</Text>
        <Text style={styles.scoreText}>Ties: 0</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 22,
    marginBottom: 40,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 40,
  },

  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  scoreBoard: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 180,
    alignItems: "center",
  },

  scoreTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  scoreText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
