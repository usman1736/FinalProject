import { addUserValues } from "@/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const addUser = async (name: string, email: string, uid: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      name: name,
      email: email,
    });
  } catch (error) {
    console.error(`Error creating a new doc for the user: ${uid}`, error);
  }
};

export const getUser = async (uid: string): Promise<addUserValues | null> => {
  try {
    const userInfo = await getDoc(doc(db, "users", uid));
    return userInfo.data() as addUserValues;
  } catch (error) {
    console.error("Error getting user", error);
    return null;
  }
};
