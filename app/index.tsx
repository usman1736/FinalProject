import { Formik } from "formik";
import { Platform, StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

interface InputFields {
  email: string;
  password: string;
}

export default function Index() {
  const schemaValidation = Yup.object().shape({
    email: Yup.string().required("Email can't be empty"),
    password: Yup.string()
      .required("Password can't be empty")
      .min(5, "Password must be at least 5 characters long"),
  });

  const formValues = (values: InputFields) => {
    console.log(values);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Formik<InputFields>
        validationSchema={schemaValidation}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={formValues}
      >
        <>{}</>
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
});
