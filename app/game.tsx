import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUser } from "@/firebase/controller";

type CellValue = "X" | "O" | null;

export default function GameScreen() {
  const router = useRouter();
  const { userAuth } = useAuth();
  const { playerTwoName } = useLocalSearchParams<{ playerTwoName?: string }>();

  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerTwoDisplayName, setPlayerTwoDisplayName] = useState("Player 2");

  // game state
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | "tie" | null>(null);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [ties, setTies] = useState(0);

  useEffect(() => {
    const fetchName = async () => {
      if (userAuth) {
        const data = await getUser(userAuth.uid);
        if (data?.name) {
          setPlayerOneName(data.name);
        }
      }
    };
    fetchName();
  }, [userAuth]);

  useEffect(() => {
    if (typeof playerTwoName === "string" && playerTwoName.trim().length > 0) {
      setPlayerTwoDisplayName(playerTwoName);
    }
  }, [playerTwoName]);

  const calculateWinner = (b: CellValue[]): "X" | "O" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, c, d] of lines) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        return b[a];
      }
    }
    return null;
  };

  const handleCellPress = (index: number) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      if (win === "X") {
        setScoreX((prev) => prev + 1);
      } else {
        setScoreO((prev) => prev + 1);
      }
      return;
    }

    if (newBoard.every((cell) => cell !== null)) {
      setWinner("tie");
      setTies((prev) => prev + 1);
      return;
    }

    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  // clear board + state (used by both OK and Restart)
  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  // OK button in popup: clear board, keep scores
  const handleModalOk = () => {
    resetBoard();
  };

  // Restart button: clear board AND scores
  const handleRestart = () => {
    resetBoard();
    setScoreX(0);
    setScoreO(0);
    setTies(0);
  };

const renderCell = (index: number) => {
  const value = board[index];

  const colorStyle = {
    color:
      value === "X"
        ? "#2563EB" // blue for Player 1
        : value === "O"
        ? "#EC4899" // pink/red for Player 2
        : "#000",   // empty cell (no text)
  };

  return (
    <TouchableOpacity
      key={index}
      style={styles.cell}
      onPress={() => handleCellPress(index)}
      activeOpacity={0.7}
    >
      <Text style={[styles.cellText, colorStyle]}>{value}</Text>
    </TouchableOpacity>
  );
};

  const currentPlayerName =
    currentPlayer === "X" ? playerOneName : playerTwoDisplayName;

  let statusText = `${currentPlayerName}’s Turn`;
  if (winner === "tie") {
    statusText = "It's a Tie";
  } else if (winner === "X" || winner === "O") {
    statusText = `${
      winner === "X" ? playerOneName : playerTwoDisplayName
    } Wins`;
  }

  const winnerTitle =
    winner === "X"
      ? `${playerOneName} Wins`
      : winner === "O"
      ? `${playerTwoDisplayName} Wins`
      : "It's a Tie";

  return (
    <View style={styles.container}>
      {/* Player Turn */}
      <Text style={styles.turnText}>{statusText}</Text>

      {/* Game Grid */}
      <View style={styles.grid}>
        <View style={styles.row}>
          {renderCell(0)}
          {renderCell(1)}
          {renderCell(2)}
        </View>
        <View style={styles.row}>
          {renderCell(3)}
          {renderCell(4)}
          {renderCell(5)}
        </View>
        <View style={styles.row}>
          {renderCell(6)}
          {renderCell(7)}
          {renderCell(8)}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        {/* HOME BUTTON */}
        <TouchableOpacity
          style={styles.smallBtn}
          onPress={() => router.push("/home-page")}
        >
          <Text style={styles.smallBtnText}>Home</Text>
        </TouchableOpacity>

        {/* RESTART BUTTON */}
        <TouchableOpacity style={styles.smallBtn} onPress={handleRestart}>
          <Text style={styles.smallBtnText}>Restart</Text>
        </TouchableOpacity>
      </View>

      {/* Scoreboard */}
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreTitle}>Scoreboard</Text>

        <Text style={styles.scoreText}>{playerOneName}: {scoreX}</Text>
        <Text style={styles.scoreText}>{playerTwoDisplayName}: {scoreO}</Text>
        <Text style={styles.scoreText}>Ties: {ties}</Text>
      </View>

      {/* WIN / TIE POPUP */}
      {winner && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitle}>{winnerTitle}</Text>
            <Text style={styles.modalSubtitle}>
              {winner === "tie" ? "No winner this time!" : "Great Match!"}
            </Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleModalOk}>
              <Text style={styles.modalButtonText}>ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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

  cellText: {
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 80,
  },

  // popup styles
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },

  modalCard: {
    width: 260,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  modalEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },

  modalSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
    textAlign: "center",
  },

  modalButton: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    width: "100%",
    paddingTop: 10,
    alignItems: "center",
  },

  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
