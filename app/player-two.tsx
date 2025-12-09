import { Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

interface InputFields {
  playerTwoName: string;
}

export default function PlayerTwo() {
  const router = useRouter();

  const schemaValidation = Yup.object().shape({
    playerTwoName: Yup.string().required("Name can't be empty"),
  });

  const formValues = (values: InputFields) => {
    router.push({
      pathname: "/game",
      params: { playerTwoName: values.playerTwoName },
    });
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Back arrow to go home*/}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/home-page")}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Enter{"\n"}Player Two’s{"\n"}Name</Text>
      <Text style={styles.subtitle}>This name will appear{"\n"}during the game.</Text>

      <Formik<InputFields>
        validationSchema={schemaValidation}
        initialValues={{ playerTwoName: "" }}
        onSubmit={formValues}
      >
        {({
          handleBlur,
          values,
          touched,
          handleChange,
          handleSubmit,
          errors,
        }) => (
          <>
            {/* Input field */}
            <TextInput
              style={styles.input}
              placeholder="Player 2 Name..."
              placeholderTextColor="#9CA3AF"
              value={values.playerTwoName}
              onChangeText={handleChange("playerTwoName")}
              onBlur={handleBlur("playerTwoName")}
            />
            {errors.playerTwoName && touched.playerTwoName ? (
              <Text style={styles.errorText}>{errors.playerTwoName}</Text>
            ) : null}

            {/* Go to game */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
  },

  errorText: {
    color: "red"
  }
});
