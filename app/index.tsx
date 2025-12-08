import Button from "@/components/NavigationButton";
import { userSignIn } from "@/firebase/AuthHelpers";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
interface InputFields {
  email: string;
  password: string;
}

export default function Index() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const schemaValidation = Yup.object().shape({
    email: Yup.string().required("Email can't be empty"),
    password: Yup.string()
      .required("Password can't be empty")
      .min(5, "Password must be at least 5 characters long"),
  });

  const formValues = async (values: InputFields) => {
    const { error } = await userSignIn(values.email, values.password);

    if (error) {
      setError(error);
      return;
    }
    router.replace("/home-page");
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
        {({
          handleBlur,
          values,
          touched,
          handleChange,
          handleSubmit,
          errors,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Email</Text>
              <TextInput
                placeholder="Your Email"
                placeholderTextColor="#9CA3AF"
                style={styles.inputField}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              {errors.email && touched.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#9CA3AF"
                style={styles.inputField}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry={true}
              />
              {errors.password && touched.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text={"Sign In"}
                buttonColor="black"
                buttonFunction={handleSubmit}
              />
              <Button
                text={"Sign Up"}
                buttonColor="white"
                buttonFunction={() => router.push("/sign-up")}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </>
        )}
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
    marginBottom: 50,
  },
  inputTitle: {
    fontSize: 18,
  },
  inputField: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 50,
    color: "black",
    fontSize: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  errorText: {
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "70%",
    gap: 10,
  },
  inputContainer: {
    width: "80%",
  },
});
