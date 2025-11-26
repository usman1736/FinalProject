import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  text: string;
  buttonFunction: () => void | ((arg: any) => Promise<void>);
  buttonColor: string;
}

const Button = ({ text, buttonColor, buttonFunction }: Props) => {
  const [color, setColor] = useState("");

  const styles = buttonStyles(buttonColor);

  useEffect(() => {
    setColor(buttonColor);
  }, []);
  return (
    <TouchableOpacity style={styles.button} onPress={buttonFunction}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const buttonStyles = (color: string) => {
  if (color === "black") {
    return StyleSheet.create({
      button: {
        backgroundColor: "#0F172A",
        paddingVertical: 14,
        paddingHorizontal: 26,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
      },
    });
  } else if (color === "white") {
    return StyleSheet.create({
      button: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingVertical: 14,
        paddingHorizontal: 26,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
      buttonText: {
        color: "#0F172A",
        fontSize: 16,
        fontWeight: "bold",
      },
    });
  } else
    return StyleSheet.create({
      button: {
        backgroundColor: "#F3F4F6",
        paddingVertical: 14,
        paddingHorizontal: 26,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
      buttonText: {
        color: "#0F172A",
        fontSize: 16,
        fontWeight: "bold",
      },
    });
};
