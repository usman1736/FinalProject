import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function GameScreen() {
  return (
    <View style={styles.container}>
      {/* Player Turn */}
      <Text style={styles.turnText}>User’s Turn</Text>

      {/* Game Grid */}
      <View style={styles.grid}>
        <View style={styles.row}>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
          <View style={styles.cell}></View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.smallBtn}>
          <Text style={styles.smallBtnText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallBtn}>
          <Text style={styles.smallBtnText}>Restart</Text>
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
    alignItems: "center",
    paddingTop: 80,
  },

  turnText: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 40,
  },

  grid: {
    width: 260,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  row: {
    flexDirection: "row",
  },

  cell: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "#000",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
  },

  smallBtn: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
  },

  smallBtnText: {
    fontSize: 18,
    fontWeight: "600",
  },

  scoreBoard: {
    marginTop: 40,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
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
